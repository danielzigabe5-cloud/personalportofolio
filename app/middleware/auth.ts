export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('auth_token')

  // የሎጊን ገጽ ዩአርኤል (በፕሮጀክትዎ መዋቅር መሠረት ሊስተካከል ይችላል)
  const isLoginPage = to.path === '/admin/login' || to.path === '/admin/login/'

  // 1. ተጠቃሚው ያልገባ ከሆነ (token ከሌለ) እና ወደ አድሚን ገጾች ለመግባት እየሞከረ ከሆነ ወደ ሎጊን መራው
  if (!token.value && to.path.startsWith('/admin') && !isLoginPage) {
    return navigateTo('/admin/login')
  }

  // 2. ተጠቃሚው ቀድሞ የገባ ከሆነ (token ካለው) እና መልሶ ወደ ሎጊን ገጽ ለመሄድ ከሞከረ ወደ አድሚን ዳሽቦርድ መራው
  if (token.value && isLoginPage) {
    return navigateTo('/admin')
  }
})