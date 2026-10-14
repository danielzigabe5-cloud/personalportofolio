<script setup lang="ts">
import { reactive, ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

const profile = reactive({
  name: 'Daniel Zigabe',
  email: 'daniel@example.com',
  phone: '+251 900 000 000',
  role: 'Frontend Developer',
  location: 'Ethiopia',
  bio: 'Frontend developer focused on building modern web and mobile applications.'
})

const saved = ref(false)

const saveProfile = () => {
  saved.value = true
  setTimeout(() => {
    saved.value = false
  }, 2000)
}
</script>

<template>
  <div class="max-w-4xl space-y-6">

    <!-- HEADER -->
    <div>
      <h1 class="text-2xl font-black text-slate-100">
        Profile
      </h1>
      <p class="mt-1 text-sm text-slate-400">
        Manage your personal information.
      </p>
    </div>

    <!-- FORM CARD -->
    <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 sm:p-8">

      <!-- AVATAR SECTION -->
      <div class="mb-8 flex items-center gap-5">
        <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black text-white shadow-lg shadow-blue-600/20">
          DZ
        </div>
        <div>
          <h2 class="text-xl font-black text-slate-100">
            {{ profile.name }}
          </h2>
          <p class="mt-1 text-sm font-semibold text-emerald-400">
            {{ profile.role }}
          </p>
        </div>
      </div>

      <!-- FORM GRID -->
      <div class="grid gap-5 md:grid-cols-2">

        <!-- Full Name -->
        <div>
          <label class="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
            Full Name
          </label>
          <input
            v-model="profile.name"
            type="text"
            class="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
            Email
          </label>
          <input
            v-model="profile.email"
            type="email"
            class="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <!-- Phone -->
        <div>
          <label class="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
            Phone
          </label>
          <input
            v-model="profile.phone"
            type="text"
            class="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <!-- Role -->
        <div>
          <label class="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
            Role
          </label>
          <input
            v-model="profile.role"
            type="text"
            class="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <!-- Location -->
        <div class="md:col-span-2">
          <label class="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
            Location
          </label>
          <input
            v-model="profile.location"
            type="text"
            class="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <!-- Bio -->
        <div class="md:col-span-2">
          <label class="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
            Bio
          </label>
          <textarea
            v-model="profile.bio"
            rows="5"
            class="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>

      </div>

      <!-- ACTIONS -->
      <div class="mt-6 flex items-center gap-4">
        <button
          type="button"
          @click="saveProfile"
          class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Save Changes
        </button>

        <!-- SUCCESS MESSAGE -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <span
            v-if="saved"
            class="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400"
          >
            ✓ Profile saved
          </span>
        </Transition>
      </div>

    </div>
  </div>
</template>