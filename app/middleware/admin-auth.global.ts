export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return

  const { authenticated } = await useRequestFetch()<{ authenticated: boolean }>('/api/auth/session')
  const isLoginPage = to.path === '/admin/login' || to.path === '/admin/login/'

  if (!authenticated && !isLoginPage) {
    return navigateTo('/admin/login')
  }

  if (authenticated && isLoginPage) {
    return navigateTo('/admin/dashboard')
  }
})
