import { defineEventHandler, setResponseHeader } from 'h3'
import { isAdminAuthenticated } from '../../utils/admin-auth'

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'no-store')
  return { authenticated: await isAdminAuthenticated(event) }
})
