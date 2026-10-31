<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: false
})

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const login = () => {
  error.value = ''

  // Check empty fields
  if (!email.value || !password.value) {
    error.value = 'Please enter your email and password.'
    return
  }

  loading.value = true

  // Admin credentials check (ወይም ወደፊት ከ Backend API ጋር ማገናኘት ይቻላል)
  if (
    email.value === 'dani@gmail.com' &&
    password.value === 'dani@1212'
  ) {
    // 1. የ auth_token ኩኪን እናስቀምጣለን (ይህም Middleware እንዲያልፍ እና ሎጊን ሆኖ እንዲቆይ ያደርጋል)
    const authToken = useCookie('auth_token', {
      maxAge: 60 * 60 * 24 * 7 // ለ 7 ቀናት እንዲቆይ (1 ሳምንት)
    })
    authToken.value = 'mock-admin-token-xyz-12345'

    // 2. ወደ አድሚን ዳሽቦርድ እንወስደዋለን
    setTimeout(() => {
      loading.value = false
      navigateTo('/admin')
    }, 500)
    return
  }

  // Wrong credentials
  setTimeout(() => {
    loading.value = false
    error.value = 'Invalid email or password.'
  }, 400)
}
</script>


<template>
  <div class="relative flex min-h-dvh items-center justify-center overflow-x-hidden overflow-y-auto bg-[#dcefed] px-6 py-16">
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-[#42bca3]/20 blur-3xl" />
      <div class="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#168b7d]/15 blur-3xl" />
    </div>

    <div class="relative z-10 w-full max-w-md rounded-3xl border border-[#c2ded9] bg-[#f3f9f8] p-8 shadow-2xl shadow-[#174b45]/10 sm:p-10">
      <!-- TITLE -->
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1d6b65] to-[#42bca3] text-xl font-black text-white shadow-lg shadow-[#168b7d]/25 ring-4 ring-[#168b7d]/10"
        >
          DZ
        </div>

        <h1
          class="text-3xl font-black tracking-tight text-[#174b45]"
        >
          Admin Login
        </h1>

        <p
          class="mt-2 text-sm text-[#66827e]"
        >
          Login to access the admin dashboard
        </p>
      </div>

      <!-- ERROR MESSAGE -->
      <div
        v-if="error"
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
            class="mb-2 block text-sm font-semibold text-[#174b45]"
          >
            Email
          </label>

          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            autocomplete="email"
            class="w-full rounded-xl border border-[#c2ded9] bg-white px-4 py-3 text-[#174b45] outline-none transition placeholder:text-[#91a9a5] focus:border-[#168b7d] focus:ring-4 focus:ring-[#168b7d]/10"
          />
        </div>

        <!-- PASSWORD -->
        <div>
          <label
            class="mb-2 block text-sm font-semibold text-[#174b45]"
          >
            Password
          </label>

          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
            class="w-full rounded-xl border border-[#c2ded9] bg-white px-4 py-3 text-[#174b45] outline-none transition placeholder:text-[#91a9a5] focus:border-[#168b7d] focus:ring-4 focus:ring-[#168b7d]/10"
          />
        </div>

        <!-- LOGIN BUTTON -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-xl bg-gradient-to-r from-[#1d6b65] to-[#168b7d] px-6 py-3.5 font-bold text-white shadow-lg shadow-[#168b7d]/20 transition duration-300 hover:-translate-y-0.5 hover:from-[#174b45] hover:to-[#11776c] focus:outline-none focus:ring-4 focus:ring-[#168b7d]/20 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span v-if="!loading">Login to Admin</span>
          <span v-else>Logging in...</span>
        </button>
      </form>

      <!-- BACK TO PORTFOLIO -->
      <div class="mt-6 text-center">
        <NuxtLink
          to="/"
          class="text-sm font-semibold text-[#168b7d] transition hover:text-[#174b45]"
        >
          ← Back to Portfolio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>