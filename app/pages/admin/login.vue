<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: false
})

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const login = async () => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Please enter your email and password.'
    return
  }

  loading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    await navigateTo('/admin/dashboard')
  } catch (cause) {
    const statusCode = cause && typeof cause === 'object' && 'statusCode' in cause
      ? cause.statusCode
      : undefined
    if (statusCode === 400) {
      error.value = 'Please enter a valid email address and password.'
    } else if (statusCode === 401) {
      error.value = 'Invalid email or password.'
    } else if (statusCode === 503) {
      error.value = 'Admin login is not configured. Run npm run admin:setup locally, or configure the required server environment variables.'
    } else if (statusCode) {
      error.value = `The sign-in service returned an error (${statusCode}). Please check the server logs.`
    } else {
      error.value = 'Could not reach the sign-in service. Check the server connection and try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <div class="relative flex min-h-dvh items-center justify-center overflow-x-hidden overflow-y-auto bg-[#eef4ff] px-6 py-16">
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-[#38bdf8]/20 blur-3xl" />
      <div class="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#0ea5e9]/15 blur-3xl" />
    </div>

    <div class="relative z-10 w-full max-w-md rounded-3xl border border-[#cbd9ee] bg-[#f8faff] p-8 shadow-2xl shadow-[#172b4d]/10 sm:p-10">
      <!-- TITLE -->
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#102a56] to-[#0ea5e9] text-xl font-black text-white shadow-lg shadow-[#0ea5e9]/25 ring-4 ring-[#0ea5e9]/10"
        >
          DZ
        </div>

        <h1
          class="text-3xl font-black tracking-tight text-[#172b4d]"
        >
          Admin Login
        </h1>

        <p
          class="mt-2 text-sm text-[#60708a]"
        >
          Login to access the admin dashboard
        </p>
      </div>

      <!-- ERROR MESSAGE -->
      <div
        v-if="error"
        role="alert"
        class="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
      >
        {{ error }}
      </div>

      <!-- LOGIN FORM -->
      <form
        class="space-y-5"
        @submit.prevent="login"
      >
        <!-- EMAIL -->
        <div>
          <label
            class="mb-2 block text-sm font-semibold text-[#172b4d]"
          >
            Email
          </label>

          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            autocomplete="email"
            class="w-full rounded-xl border border-[#cbd9ee] bg-white px-4 py-3 text-[#172b4d] outline-none transition placeholder:text-[#8190a8] focus:border-[#0ea5e9] focus:ring-4 focus:ring-[#0ea5e9]/10"
          />
        </div>

        <!-- PASSWORD -->
        <div>
          <label
            class="mb-2 block text-sm font-semibold text-[#172b4d]"
          >
            Password
          </label>

          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
            class="w-full rounded-xl border border-[#cbd9ee] bg-white px-4 py-3 text-[#172b4d] outline-none transition placeholder:text-[#8190a8] focus:border-[#0ea5e9] focus:ring-4 focus:ring-[#0ea5e9]/10"
          />
        </div>

        <!-- LOGIN BUTTON -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-xl bg-gradient-to-r from-[#102a56] to-[#0ea5e9] px-6 py-3.5 font-bold text-white shadow-lg shadow-[#0ea5e9]/20 transition duration-300 hover:-translate-y-0.5 hover:from-[#172b4d] hover:to-[#0284c7] focus:outline-none focus:ring-4 focus:ring-[#0ea5e9]/20 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span v-if="!loading">Login to Admin</span>
          <span v-else>Logging in...</span>
        </button>
      </form>

      <!-- BACK TO PORTFOLIO -->
      <div class="mt-6 text-center">
        <NuxtLink
          to="/"
          class="text-sm font-semibold text-[#0284c7] transition hover:text-[#172b4d]"
        >
          ← Back to Portfolio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>