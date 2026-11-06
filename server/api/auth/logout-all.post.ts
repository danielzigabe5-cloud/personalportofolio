import { defineEventHandler } from 'h3'
import { clearAdminSession, revokeAllAdminSessions } from '../../utils/admin-auth'

export default defineEventHandler(async (event) => {
  await revokeAllAdminSessions(event)
  clearAdminSession(event)
  return { success: true }
})
