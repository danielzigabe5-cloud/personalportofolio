import { createError, defineEventHandler, getCookie, getRouterParam } from 'h3'
import { getServices, saveServices } from '../../utils/services'

export default defineEventHandler(async (event) => {
  if (!getCookie(event, 'auth_token')) {
    throw createError({ statusCode: 401, statusMessage: 'Authentication required.' })
  }

  const id = getRouterParam(event, 'id')
  const services = await getServices()
  const remainingServices = services.filter(service => service.id !== id)

  if (remainingServices.length === services.length) {
    throw createError({ statusCode: 404, statusMessage: 'Service not found.' })
  }

  await saveServices(remainingServices)
  return { success: true }
})
