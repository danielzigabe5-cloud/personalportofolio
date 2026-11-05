import { createError, defineEventHandler, getCookie, getRouterParam } from 'h3'
import { deleteMediaFile } from '../../utils/media'

export default defineEventHandler(async (event) => {
  if (!getCookie(event, 'auth_token')) {
    throw createError({ statusCode: 401, statusMessage: 'Please sign in to delete uploaded media.' })
  }

  const deleted = await deleteMediaFile(getRouterParam(event, 'id') || '')
  if (!deleted) {
    throw createError({ statusCode: 404, statusMessage: 'Media file not found.' })
  }

  return { success: true }
})
