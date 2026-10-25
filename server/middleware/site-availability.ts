import { getSiteSettings } from '../utils/site-settings'

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname

  if (
    path === '/maintenance' ||
    path.startsWith('/api/') ||
    path.startsWith('/_nuxt/') ||
    path.startsWith('/admin') ||
    path.includes('.')
  ) {
    return
  }

  const settings = await getSiteSettings()
  if (settings.maintenanceMode) {
    return sendRedirect(event, '/maintenance?mode=maintenance', 302)
  }
  if (!settings.publicProfile) {
    return sendRedirect(event, '/maintenance?mode=private', 302)
  }
})