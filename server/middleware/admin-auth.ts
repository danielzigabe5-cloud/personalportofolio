import { createError, defineEventHandler, getRequestURL } from 'h3'
import { isAdminAuthenticated } from '../utils/admin-auth'

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname.replace(/\/+$/, '') || '/'
  if (!path.startsWith('/api/')) return

  const method = event.method.toUpperCase()
  const isLoginRequest = path === '/api/auth/login'
  const isPrivateMediaRead =
    (path === '/api/media' || path.startsWith('/api/media/')) &&
    (method === 'GET' || method === 'HEAD')
  const isAdminApi = path === '/api/admin' || path.startsWith('/api/admin/')
  const isMutation = method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS'

  if ((isAdminApi || isPrivateMediaRead || (isMutation && !isLoginRequest && path !== '/api/auth/logout')) &&
    !await isAdminAuthenticated(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Please sign in to access this resource.'
    })
  }
})
