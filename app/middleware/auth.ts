export default defineNuxtRouteMiddleware((to) => {
  // 🍪 Token ፈልግ
  const token = useCookie('auth_token')

  // 🔐 Token ከሌለ → ወደ Login
  if (!token.value) {
    return navigateTo('/admin/login')
  }
})