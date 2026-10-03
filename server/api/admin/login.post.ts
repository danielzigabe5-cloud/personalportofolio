// server/api/admin/login.post.ts
export default defineEventHandler(async (event) => {
  // 📥 የተላከውን ውሂብ አንብብ
  const body = await readBody(event)

  // 🎯 የመግቢያ መረጃ (ለሙከራ)
  const ADMIN_EMAIL = 'admin@gmail.com'
  const ADMIN_PASSWORD = 'admin123'

  // ⏱️ ትንሽ መዘግየት (realistic)
  await new Promise(resolve => setTimeout(resolve, 500))

  // 🔍 አረጋግጥ
  if (body.email === ADMIN_EMAIL && body.password === ADMIN_PASSWORD) {
    return {
      token: 'demo-token-' + Date.now(),
      user: {
        id: 1,
        name: 'Daniel Zigabe',
        email: body.email
      }
    }
  }

  // ❌ ስህተት
  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid email or password'
  })
})