import { createError, defineEventHandler, getCookie, readBody } from 'h3'
import { getServices, saveServices } from '../../utils/services'
import type { Service } from '~~/shared/utils/services'

export default defineEventHandler(async (event) => {
  if (!getCookie(event, 'auth_token')) {
    throw createError({ statusCode: 401, statusMessage: 'Authentication required.' })
  }

  const body = await readBody<Partial<Service>>(event)
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const description = typeof body.description === 'string' ? body.description.trim() : ''
  const image = typeof body.image === 'string' ? body.image.trim() : ''

  if (!title || !description || !image) {
    throw createError({ statusCode: 400, statusMessage: 'Title, description, and image are required.' })
  }

  const services = await getServices()
  const id = typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : `service-${Date.now()}`

  if (services.some(service => service.id === id)) {
    throw createError({ statusCode: 409, statusMessage: 'A service with this ID already exists.' })
  }

  const service: Service = {
    id,
    title,
    description,
    image,
    to: typeof body.to === 'string' && body.to.trim() ? body.to.trim() : '/contact',
    icon: typeof body.icon === 'string' ? body.icon.trim() : ''
  }

  services.push(service)
  await saveServices(services)
  return service
})
