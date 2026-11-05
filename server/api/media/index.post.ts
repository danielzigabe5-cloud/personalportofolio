import { createError, defineEventHandler, getCookie, readMultipartFormData } from 'h3'
import { getMediaFormat, hasValidMediaSignature, saveMediaFile, type MediaFile } from '../../utils/media'

const maxFileSize = 10 * 1024 * 1024
const maxFileCount = 20
const maxTotalSize = 100 * 1024 * 1024

export default defineEventHandler(async (event) => {
  if (!getCookie(event, 'auth_token')) {
    throw createError({ statusCode: 401, statusMessage: 'Please sign in to upload media.' })
  }

  const contentLength = Number(event.node.req.headers['content-length'] || 0)
  if (contentLength > maxTotalSize + 1024 * 1024) {
    throw createError({ statusCode: 413, statusMessage: 'Each file can be up to 10 MB, with a 100 MB total per upload.' })
  }

  const parts = await readMultipartFormData(event)
  const files = parts?.filter(part => part.name === 'files' && part.filename) ?? []
  if (files.length === 0 || files.length > maxFileCount) {
    throw createError({ statusCode: 400, statusMessage: `Choose between 1 and ${maxFileCount} files per upload.` })
  }

  let totalSize = 0
  const validatedFiles = files.map((part) => {
    const originalName = part.filename || ''
    const safeName = originalName.replace(/[\\/\u0000-\u001f\u007f]/g, '_').trim().slice(0, 255)
    const format = getMediaFormat(safeName)
    if (!safeName || !format) {
      throw createError({ statusCode: 415, statusMessage: 'Supported files: PDF, PPT, PPTX, JPG, PNG, GIF, and WEBP.' })
    }
    if (part.type && part.type !== format.mimeType && part.type !== 'application/octet-stream') {
      throw createError({ statusCode: 415, statusMessage: `The uploaded file type does not match ${safeName}.` })
    }
    if (part.data.byteLength > maxFileSize) {
      throw createError({ statusCode: 413, statusMessage: `${safeName} is larger than 10 MB.` })
    }
    totalSize += part.data.byteLength
    if (!hasValidMediaSignature(format.extension, part.data)) {
      throw createError({ statusCode: 415, statusMessage: `${safeName} does not have a valid ${format.extension.toUpperCase()} file signature.` })
    }

    return { name: safeName, data: part.data }
  })

  if (totalSize > maxTotalSize) {
    throw createError({ statusCode: 413, statusMessage: 'The combined upload size cannot exceed 100 MB.' })
  }

  const uploaded: MediaFile[] = []
  for (const file of validatedFiles) {
    uploaded.push(await saveMediaFile(file.name, file.data))
  }
  return uploaded
})
