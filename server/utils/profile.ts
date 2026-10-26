import { defaultProfile, type ProfileData } from '~~/shared/utils/profile'

const PROFILE_KEY = 'portfolio-profile.json'

export async function getProfile(): Promise<ProfileData> {
  const storage = useStorage('assets:server')
  const profile = await storage.getItem<Partial<ProfileData>>(PROFILE_KEY)
  return { ...defaultProfile, ...profile }
}

export async function saveProfile(profile: ProfileData): Promise<void> {
  const storage = useStorage('assets:server')
  await storage.setItem(PROFILE_KEY, profile)
}
