import { createError, defineEventHandler, readBody } from 'h3'
import { saveSiteSettings, type SiteSettings } from '../utils/site-settings'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<SiteSettings>>(event)
  const keys: (keyof SiteSettings)[] = [
    'emailNotifications',
    'messageNotifications',
    'publicProfile',
    'maintenanceMode'
  ]

  if (keys.some(key => typeof body[key] !== 'boolean')) {
    throw createError({ statusCode: 400, statusMessage: 'All settings must be boolean values.' })
  }

  const settings = body as SiteSettings
  await saveSiteSettings(settings)
  return settings
})