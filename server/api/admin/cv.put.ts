import { createError, defineEventHandler, readMultipartFormData } from 'h3'
import { hasValidMediaSignature } from '../../utils/media'
import { saveCV } from '../../utils/cv'

const maxFileSize = 10 * 1024 * 1024

export default defineEventHandler(async (event) => {
  const contentLength = Number(event.node.req.headers['content-length'] || 0)
  if (contentLength > maxFileSize + 1024 * 1024) {
    throw createError({ statusCode: 413, statusMessage: 'The CV must be smaller than 10 MB.' })
  }

  const parts = await readMultipartFormData(event)
  const file = parts?.find(part => part.name === 'cv' && part.filename)
  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'Choose a PDF file to upload.' })
  }
  if (!file.filename?.toLowerCase().endsWith('.pdf') || (file.type && !['application/pdf', 'application/octet-stream'].includes(file.type))) {
    throw createError({ statusCode: 415, statusMessage: 'The CV must be a PDF file.' })
  }
  if (file.data.byteLength > maxFileSize || !hasValidMediaSignature('pdf', file.data)) {
    throw createError({ statusCode: 415, statusMessage: 'The uploaded file is not a valid PDF or exceeds 10 MB.' })
  }

  return await saveCV(file.data)
})
