<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'default'
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
  <div
    class="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-16"
    style="background-color: rgb(15, 23, 42);"
  >
    <div
      class="w-full max-w-md rounded-2xl border p-8 shadow-2xl"
      style="
        background-color: rgb(20, 30, 50);
        border-color: rgb(51, 65, 85);
      "
    >
      <!-- TITLE -->
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white"
          style="background-color: rgb(37, 99, 235);"
        >
          DZ
        </div>

        <h1
          class="text-3xl font-bold"
          style="color: rgb(248, 250, 252);"
        >
          Admin Login
        </h1>

        <p
          class="mt-2 text-sm"
          style="color: rgb(148, 163, 184);"
        >
          Login to access the admin dashboard
        </p>
      </div>

      <!-- ERROR MESSAGE -->
      <div
        v-if="error"
        class="mb-5 rounded-xl border px-4 py-3 text-sm"
        style="
          border-color: rgba(239, 68, 68, 0.3);
          background-color: rgba(239, 68, 68, 0.1);
          color: rgb(248, 113, 113);
        "
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
            class="mb-2 block text-sm font-medium"
            style="color: rgb(226, 232, 240);"
          >
            Email
          </label>

          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            autocomplete="email"
            class="w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2"
            style="
              background-color: rgb(15, 23, 42);
              border-color: rgb(51, 65, 85);
              color: rgb(248, 250, 252);
              --tw-ring-color: rgba(37, 99, 235, 0.30);
            "
          />
        </div>

        <!-- PASSWORD -->
        <div>
          <label
            class="mb-2 block text-sm font-medium"
            style="color: rgb(226, 232, 240);"
          >
            Password
          </label>

          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
            class="w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2"
            style="
              background-color: rgb(15, 23, 42);
              border-color: rgb(51, 65, 85);
              color: rgb(248, 250, 252);
              --tw-ring-color: rgba(37, 99, 235, 0.30);
            "
          />
        </div>

        <!-- LOGIN BUTTON -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-xl px-6 py-3.5 font-bold text-white transition duration-300 hover:-translate-y-0.5 disabled:opacity-70"
          style="
            background-color: rgb(37, 99, 235);
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.20);
          "
        >
          <span v-if="!loading">Login to Admin</span>
          <span v-else>Logging in...</span>
        </button>
      </form>

      <!-- BACK TO PORTFOLIO -->
      <div class="mt-6 text-center">
        <NuxtLink
          to="/"
          class="text-sm transition"
          style="color: rgb(96, 165, 250);"
        >
          ← Back to Portfolio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>