import { createError, defineEventHandler, getCookie } from 'h3'
import { listMediaFiles } from '../../utils/media'

export default defineEventHandler(async (event) => {
  if (!getCookie(event, 'auth_token')) {
    throw createError({ statusCode: 401, statusMessage: 'Please sign in to view uploaded media.' })
  }

  return await listMediaFiles()
})
