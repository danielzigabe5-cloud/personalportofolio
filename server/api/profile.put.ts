import { createError, defineEventHandler, getCookie, readBody } from 'h3'
import { getProfile, saveProfile, type ProfileData } from '../utils/profile'

const textFields = [
  'name',
  'email',
  'phone',
  'role',
  'location',
  'aboutHeadline',
  'bio',
  'aboutDetails'
] as const

export default defineEventHandler(async (event) => {
  if (!getCookie(event, 'auth_token')) {
    throw createError({ statusCode: 401, statusMessage: 'Please sign in to update the profile.' })
  }

  const body = await readBody<Partial<ProfileData>>(event)

  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'A profile object is required.' })
  }

  for (const field of textFields) {
    if (typeof body[field] !== 'string' || body[field].length > 5000) {
      throw createError({ statusCode: 400, statusMessage: `A valid ${field} is required.` })
    }
  }

  const name = body.name!.trim()
  const email = body.email!.trim()
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'A name and valid email address are required.' })
  }

  const avatarUrl = body.avatarUrl
  if (
    avatarUrl !== null &&
    (typeof avatarUrl !== 'string' ||
      avatarUrl.length > 1_200_000 ||
      !/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(avatarUrl))
  ) {
    throw createError({ statusCode: 400, statusMessage: 'The profile photo must be a supported image under 900 KB.' })
  }

  const profile: ProfileData = {
    name,
    email,
    phone: body.phone!.trim(),
    role: body.role!.trim(),
    location: body.location!.trim(),
    aboutHeadline: body.aboutHeadline!.trim(),
    bio: body.bio!.trim(),
    aboutDetails: body.aboutDetails!.trim(),
    avatarUrl
  }

  await saveProfile(profile)
  return profile
})
