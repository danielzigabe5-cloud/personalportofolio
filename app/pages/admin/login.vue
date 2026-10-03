<script setup lang="ts">
// ✅ ይህ ገጽ የራሱ layout ይኑረው (Navbar/Footer አያስፈልገውም)
definePageMeta({
  layout: false
})

// 🎯 SEO
useHead({
  title: 'Admin Login | Daniel Zigabe',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// 📝 Form state
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

// 🔐 Login handler
async function handleLogin() {
  loading.value = true
  error.value = ''

  try {
    // 🔗 ከ Backend ጋር አገናኝ
    const res = await $fetch<{ token: string }>('/api/admin/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    // 🍪 Token አስቀምጥ (7 ቀን)
    const token = useCookie('auth_token', {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })
    token.value = res.token

    // 🚀 ወደ Dashboard ሂድ
    await navigateTo('/admin/dashboard')
  } catch (err: any) {
    error.value = err?.data?.message || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <!-- 🌟 የጀርባ Glow -->
    <div class="bg-glow bg-glow-1"></div>
    <div class="bg-glow bg-glow-2"></div>

    <!-- 🏠 Back to Home -->
    <NuxtLink to="/" class="home-back-link">
      <span>←</span>
      Back to Home
    </NuxtLink>

    <!-- 🎴 Login Card -->
    <div class="login-card">

      <!-- Logo & Header -->
      <div class="login-header">
        <div class="login-logo">DZ</div>
        <h1>Admin Login</h1>
        <p>Sign in to access the dashboard</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="login-form">

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="admin@example.com"
            :disabled="loading"
          />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-wrapper">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              autocomplete="current-password"
              placeholder="••••••••"
              :disabled="loading"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="login-button"
        >
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Logging in...' : '🔑 Login' }}
        </button>

        <!-- Error Message -->
        <Transition name="fade">
          <p v-if="error" class="error-message">
            ⚠️ {{ error }}
          </p>
        </Transition>
      </form>

      <!-- Footer -->
      <p class="login-footer">
        © {{ new Date().getFullYear() }} Daniel Zigabe Minda
      </p>
    </div>
  </div>
</template>

<style scoped>
/* ===== Page ===== */
.login-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d1117;
  padding: 20px;
  overflow: hidden;
}

/* ===== Background Glow ===== */
.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  opacity: 0.4;
}

.bg-glow-1 {
  top: -200px;
  right: -200px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #10b981, transparent 70%);
  animation: pulse 6s ease-in-out infinite;
}

.bg-glow-2 {
  bottom: -200px;
  left: -200px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #059669, transparent 70%);
  animation: pulse 8s ease-in-out infinite reverse;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.1); opacity: 0.25; }
}

/* ===== Back Link ===== */
.home-back-link {
  position: absolute;
  top: 24px;
  left: 24px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #9ca3af;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 8px;
  transition: all 0.25s ease;
  z-index: 10;
}

.home-back-link span {
  transition: transform 0.25s ease;
}

.home-back-link:hover {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.home-back-link:hover span {
  transform: translateX(-4px);
}

/* ===== Login Card ===== */
.login-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  background: #161b22;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 40px 36px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(16, 185, 129, 0.05) inset;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== Header ===== */
.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-logo {
  width: 60px;
  height: 60px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #0d1117;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 1px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.login-header h1 {
  color: #ffffff;
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 6px;
  letter-spacing: -0.5px;
}

.login-header p {
  color: #9ca3af;
  font-size: 14px;
  margin: 0;
}

/* ===== Form ===== */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #9ca3af;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.form-group input {
  width: 100%;
  padding: 14px 16px;
  background: #0d1117;
  border: 2px solid #30363d;
  border-radius: 12px;
  color: #ffffff;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: all 0.25s ease;
}

.form-group input::placeholder {
  color: #6b7280;
}

.form-group input:focus {
  border-color: #10b981;
  background: #0d1117;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
}

.form-group input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ===== Password Wrapper ===== */
.password-wrapper {
  position: relative;
}

.password-wrapper input {
  padding-right: 48px;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: background 0.2s ease;
  opacity: 0.7;
}

.password-toggle:hover {
  background: rgba(255, 255, 255, 0.05);
  opacity: 1;
}

/* ===== Submit Button ===== */
.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
  padding: 15px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(16, 185, 129, 0.5);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== Spinner ===== */
.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ===== Error ===== */
.error-message {
  color: #f87171;
  font-size: 13px;
  text-align: center;
  padding: 10px 14px;
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.3);
  border-radius: 10px;
  margin: 0;
}

/* ===== Fade Transition ===== */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ===== Footer ===== */
.login-footer {
  text-align: center;
  margin: 24px 0 0;
  color: #4b5563;
  font-size: 12px;
  letter-spacing: 0.3px;
}

/* ===== Responsive ===== */
@media (max-width: 480px) {
  .login-card {
    padding: 32px 24px;
    border-radius: 16px;
  }

  .login-header h1 {
    font-size: 22px;
  }

  .login-logo {
    width: 54px;
    height: 54px;
    font-size: 20px;
  }

  .home-back-link {
    top: 16px;
    left: 16px;
    font-size: 13px;
    padding: 6px 10px;
  }

  .login-page {
    padding: 16px;
  }
}
</style>