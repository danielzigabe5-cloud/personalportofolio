import { createError, defineEventHandler, readBody } from 'h3'
import { createAdminSession, verifyAdminCredentials } from '../../utils/admin-auth'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: unknown, password?: unknown }>(event)
  if (
    !body ||
    typeof body.email !== 'string' ||
    typeof body.password !== 'string' ||
    body.email.length > 320 ||
    body.password.length > 1024
  ) {
    throw createError({ statusCode: 400, statusMessage: 'A valid email and password are required.' })
  }

  if (!await verifyAdminCredentials(event, body.email, body.password)) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password.' })
  }

  await createAdminSession(event)
  return { success: true }
})