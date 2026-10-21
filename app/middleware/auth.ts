export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('auth_token')

  // 1. ተጠቃሚው ያልገባ ከሆነ (token ከሌለ) እና ወደ Login ገጽ ለመግባት እየሞከረ ከሆነ አታልፍልኝ
  if (!token.value && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  // 2. ተጠቃሚው ቀድሞ የገባ ከሆነ (token ካለው) እና መልሶ ወደ Login ገጽ ለመሄድ ከሞከረ ወደ Dashboard መራው
  if (token.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})