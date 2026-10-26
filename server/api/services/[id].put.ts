import { createError, defineEventHandler, getCookie, getRouterParam, readBody } from 'h3'
import { getServices, saveServices } from '../../utils/services'
import type { Service } from '~~/shared/utils/services'

export default defineEventHandler(async (event) => {
  if (!getCookie(event, 'auth_token')) {
    throw createError({ statusCode: 401, statusMessage: 'Authentication required.' })
  }

  const id = getRouterParam(event, 'id')
  const body = await readBody<Partial<Service>>(event)
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const description = typeof body.description === 'string' ? body.description.trim() : ''
  const image = typeof body.image === 'string' ? body.image.trim() : ''

  if (!title || !description || !image) {
    throw createError({ statusCode: 400, statusMessage: 'Title, description, and image are required.' })
  }

  const services = await getServices()
  const index = services.findIndex(service => service.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Service not found.' })
  }

  const service: Service = {
    id: services[index]!.id,
    title,
    description,
    image,
    to: typeof body.to === 'string' && body.to.trim() ? body.to.trim() : '/contact',
    icon: typeof body.icon === 'string' ? body.icon.trim() : ''
  }

  services[index] = service
  await saveServices(services)
  return service
})
