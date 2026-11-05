import { createError, defineEventHandler, getRouterParam, setHeader, send } from 'h3'
import { getMediaFile } from '../../utils/media'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  const file = await getMediaFile(id)

  if (!file) {
    throw createError({ statusCode: 404, statusMessage: 'Media file not found.' })
  }

  setHeader(event, 'Content-Type', file.metadata.mimeType)
  setHeader(event, 'Content-Disposition', `inline; filename="${file.metadata.name.replace(/["\\\r\n]/g, '_')}"`)
  setHeader(event, 'Content-Length', file.data.byteLength)
  return await send(event, file.data)
})
