export interface SiteSettings {
  emailNotifications: boolean
  messageNotifications: boolean
  publicProfile: boolean
  maintenanceMode: boolean
}

export const defaultSiteSettings: SiteSettings = {
  emailNotifications: true,
  messageNotifications: true,
  publicProfile: true,
  maintenanceMode: false
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const storage = useStorage('assets:server')
  const settings = await storage.getItem<Partial<SiteSettings>>('site-settings.json')
  return { ...defaultSiteSettings, ...settings }
}

export async function saveSiteSettings(settings: SiteSettings) {
  const storage = useStorage('assets:server')
  await storage.setItem('site-settings.json', settings)
}