import { del } from '@vercel/blob'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { createError, defineEventHandler, getCookie, readBody } from 'h3'
import { getMediaFormat, hasValidMediaSignature } from '../../utils/media'

const maxFileSize = 10 * 1024 * 1024
const mediaPathPattern = /^portfolio-media\/([\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12})\/([^/]+)$/i

export default defineEventHandler(async (event) => {
  const body = await readBody<HandleUploadBody>(event)
  if (!body || typeof body !== 'object' || !('type' in body)) {
    throw createError({ statusCode: 400, statusMessage: 'A valid upload request is required.' })
  }
  if (body.type === 'blob.generate-client-token' && !getCookie(event, 'auth_token')) {
    throw createError({ statusCode: 401, statusMessage: 'Please sign in to upload media.' })
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    throw createError({ statusCode: 503, statusMessage: 'Persistent uploads are not configured. Connect a Vercel Blob store to this deployment.' })
  }

  return await handleUpload({
    token,
    request: event.node.req,
    body,
    onBeforeGenerateToken: async (pathname) => {
      const match = mediaPathPattern.exec(pathname)
      if (!match) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid media upload path.' })
      }

      let filename: string
      try {
        filename = decodeURIComponent(match[2] || '')
      } catch {
        throw createError({ statusCode: 400, statusMessage: 'Invalid media filename.' })
      }

      const format = getMediaFormat(filename)
      if (!format) {
        throw createError({ statusCode: 415, statusMessage: 'Unsupported media file format.' })
      }

      return {
        allowedContentTypes: [format.mimeType],
        maximumSizeInBytes: maxFileSize,
        addRandomSuffix: false
      }
    },
    onUploadCompleted: async ({ blob }) => {
      const match = mediaPathPattern.exec(blob.pathname)
      let filename = ''
      try {
        filename = match?.[2] ? decodeURIComponent(match[2]) : ''
      } catch {
        await del(blob.url, { token })
        throw new Error('The uploaded filename is invalid.')
      }
      const format = getMediaFormat(filename)
      if (!format || blob.size > maxFileSize) {
        await del(blob.url, { token })
        throw new Error('The uploaded file has an invalid format or size.')
      }

      const response = await fetch(blob.url)
      if (!response.ok) {
        throw new Error(`Could not verify the uploaded file (${response.status}).`)
      }
      const data = Buffer.from(await response.arrayBuffer())
      if (!hasValidMediaSignature(format.extension, data)) {
        await del(blob.url, { token })
        throw new Error(`The uploaded file is not a valid ${format.extension.toUpperCase()} file.`)
      }
    }
  })
})
