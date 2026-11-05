import { defaultProfile, type ProfileData } from '~~/shared/utils/profile'
import { readJsonData, writeJsonData } from './json-storage'

export async function getProfile(): Promise<ProfileData> {
  const profile = await readJsonData<Partial<ProfileData>>('portfolio-profile.json', {})
  return { ...defaultProfile, ...profile }
}

export async function saveProfile(profile: ProfileData): Promise<void> {
  await writeJsonData('portfolio-profile.json', profile)
}
