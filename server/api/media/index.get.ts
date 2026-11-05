import { createError, defineEventHandler, getCookie } from 'h3'
import { listMediaFiles, usesBlobMediaStorage } from '../../utils/media'

export default defineEventHandler(async (event) => {
  if (!getCookie(event, 'auth_token')) {
    throw createError({ statusCode: 401, statusMessage: 'Please sign in to view uploaded media.' })
  }
  if (usesBlobMediaStorage() && !process.env.BLOB_READ_WRITE_TOKEN) {
    throw createError({ statusCode: 503, statusMessage: 'Persistent uploads are not configured. Connect a Vercel Blob store to this deployment.' })
  }

  return {
    files: await listMediaFiles(),
    directUpload: usesBlobMediaStorage()
  }
})
