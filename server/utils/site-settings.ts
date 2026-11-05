import { readJsonData, writeJsonData } from './json-storage'

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
  const settings = await readJsonData<Partial<SiteSettings>>('site-settings.json', {})
  return { ...defaultSiteSettings, ...settings }
}

export async function saveSiteSettings(settings: SiteSettings) {
  await writeJsonData('site-settings.json', settings)
}