import { defaultProfile, type ProfileData } from '~~/shared/utils/profile'

export function useProfile() {
  return useFetch<ProfileData>('/api/profile', {
    key: 'portfolio-profile',
    default: () => ({ ...defaultProfile })
  })
}
