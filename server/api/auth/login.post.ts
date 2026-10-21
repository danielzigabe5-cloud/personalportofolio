// server/api/auth/login.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // እዚህ ጋር የምትፈልገውን የ አድሚን Username እና Password አስገባ
  const ADMIN_USERNAME = 'dani'
  const ADMIN_PASSWORD = 'your_secret_password_here' // የምትፈልገውን ፓስወርድ ቀይረው

  if (body.username === ADMIN_USERNAME && body.password === ADMIN_PASSWORD) {
    // ሎጊኑ ትክክል ከሆነ Auth Token በ Cookie ውስጥ መጻፍ
    setCookie(event, 'auth_token', 'admin_logged_in_secret_token', {
      httpOnly: true, // ለደህንነት ሲባል በ JS እንዳይነበብ ያደርጋል
      maxAge: 60 * 60 * 24 * 30, // ለ 30 ቀናት በ Session እንዲቆይ
      path: '/'
    })

    return { success: true, message: 'Logged in successfully' }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'የተሳሳተ Username ወይም Password አስገብተዋል!'
  })
})