import { createError, defineEventHandler, readBody } from 'h3'
import { changeAdminPassword, clearAdminSession } from '../../utils/admin-auth'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ currentPassword?: unknown, newPassword?: unknown }>(event)
  if (
    !body ||
    typeof body.currentPassword !== 'string' ||
    typeof body.newPassword !== 'string' ||
    body.currentPassword.length > 1024 ||
    body.newPassword.length < 12 ||
    body.newPassword.length > 1024
  ) {
    throw createError({ statusCode: 400, statusMessage: 'Enter your current password and a new password with at least 12 characters.' })
  }

  await changeAdminPassword(event, body.currentPassword, body.newPassword)
  clearAdminSession(event)
  return { success: true }
})
