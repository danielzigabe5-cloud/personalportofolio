<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

interface ProfileData {
  name: string
  email: string
  phone: string
  role: string
  location: string
  aboutHeadline: string
  bio: string
  aboutDetails: string
  avatarUrl: string | null
}

const defaultProfile: ProfileData = {
  name: 'Daniel Zigabe',
  email: 'danielzigabe5@gmail.com',
  phone: '+251 945 800 348',
  role: 'Full-Stack & Mobile Developer',
  location: 'Ethiopia',
  aboutHeadline: 'Thoughtful software, built for people.',
  bio: "I'm a computer science student and software developer focused on useful, reliable web and mobile products.",
  aboutDetails: 'I enjoy turning complex ideas into functional, user-friendly applications. I work closely with teams to build meaningful digital solutions and care about the details that make software dependable and easy to use. My core tools include Nuxt.js, Laravel, and Flutter. I keep learning new technologies to improve performance and make better products.',
  avatarUrl: null
}

const profile = reactive<ProfileData>({ ...defaultProfile })

// Local Storage & Init
onMounted(() => {
  const saved = localStorage.getItem('portfolio_profile')
  if (saved) {
    try {
      Object.assign(profile, JSON.parse(saved))
    } catch {
      Object.assign(profile, defaultProfile)
    }
  }
})

/* =====================================================
   COMPUTED INITIALS & FILE UPLOAD
===================================================== */
const initials = computed(() => {
  if (!profile.name.trim()) return 'DZ'
  const parts = profile.name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return parts[0].slice(0, 2).toUpperCase()
})

const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    // Read file as base64 string
    const reader = new FileReader()
    reader.onload = (e) => {
      profile.avatarUrl = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const removeAvatar = () => {
  profile.avatarUrl = null
  if (fileInput.value) fileInput.value.value = ''
}

/* =====================================================
   SAVE & RESET LOGIC
===================================================== */
const isSaving = ref(false)
const saved = ref(false)
const errorMessage = ref('')

const saveProfile = () => {
  errorMessage.value = ''

  if (!profile.name.trim()) {
    errorMessage.value = 'ስም ማስገባት ግዴታ ነው (Name is required)'
    return
  }

  isSaving.value = true

  setTimeout(() => {
    if (import.meta.client) {
      localStorage.setItem('portfolio_profile', JSON.stringify(profile))
    }
    isSaving.value = false
    saved.value = true

    setTimeout(() => {
      saved.value = false
    }, 2500)
  }, 400)
}

const resetChanges = () => {
  const saved = localStorage.getItem('portfolio_profile')
  if (saved) {
    try {
      Object.assign(profile, JSON.parse(saved))
    } catch {
      Object.assign(profile, defaultProfile)
    }
  } else {
    Object.assign(profile, defaultProfile)
  }
  errorMessage.value = ''
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
        Manage your personal information and portfolio presence.
      </p>
    </div>

    <!-- FORM CARD -->
    <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 sm:p-8">

      <!-- AVATAR SECTION -->
      <div class="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center">
        <!-- AVATAR IMAGE / INITIALS -->
        <div class="relative group h-20 w-20 flex-shrink-0">
          <div
            v-if="profile.avatarUrl"
            class="h-20 w-20 overflow-hidden rounded-2xl border-2 border-blue-500/30 shadow-lg shadow-blue-600/20"
          >
            <img :src="profile.avatarUrl" alt="Avatar" class="h-full w-full object-cover" />
          </div>
          <div
            v-else
            class="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black text-white shadow-lg shadow-blue-600/20"
          >
            {{ initials }}
          </div>

          <!-- Quick overlay button to change -->
          <button
            type="button"
            @click="triggerFileUpload"
            class="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100"
          >
            ቀይር
          </button>
        </div>

        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-black text-slate-100">
              {{ profile.name || 'Your Name' }}
            </h2>
            <span class="rounded-lg border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-xs font-bold text-blue-400">
              Admin
            </span>
          </div>

          <p class="mt-1 text-sm font-semibold text-emerald-400">
            {{ profile.role || 'Professional Role' }}
          </p>

          <!-- Avatar Action Buttons -->
          <div class="mt-3 flex items-center gap-2">
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileUpload"
            />
            <button
              type="button"
              @click="triggerFileUpload"
              class="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300 hover:border-slate-600 hover:text-white"
            >
              Upload Photo
            </button>
            <button
              v-if="profile.avatarUrl"
              type="button"
              @click="removeAvatar"
              class="rounded-lg px-2 py-1 text-xs font-bold text-red-400/80 hover:bg-red-500/10 hover:text-red-400"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <!-- ERROR MESSAGE -->
      <div v-if="errorMessage" class="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-semibold text-red-400">
        {{ errorMessage }}
      </div>

      <!-- FORM GRID -->
      <form @submit.prevent="saveProfile">
        <div class="grid gap-5 md:grid-cols-2">

          <!-- Full Name -->
          <div>
            <label class="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Full Name *
            </label>
            <input
              v-model="profile.name"
              type="text"
              required
              class="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Email *
            </label>
            <input
              v-model="profile.email"
              type="email"
              required
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
              Role / Title
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

          <!-- About headline -->
          <div class="md:col-span-2">
            <label class="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
              About Page Headline
            </label>
            <input
              v-model="profile.aboutHeadline"
              type="text"
              class="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- About introduction -->
          <div class="md:col-span-2">
            <label class="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
              About Introduction
            </label>
            <textarea
              v-model="profile.bio"
              rows="3"
              class="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- About details -->
          <div class="md:col-span-2">
            <label class="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
              About Details
            </label>
            <textarea
              v-model="profile.aboutDetails"
              rows="5"
              class="w-full resize-y rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>

        </div>

        <!-- ACTIONS -->
        <div class="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-700/60 pt-6">
          <button
            type="submit"
            :disabled="isSaving"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50"
          >
            <span v-if="isSaving" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            {{ isSaving ? 'Saving...' : 'Save Changes' }}
          </button>

          <button
            type="button"
            @click="resetChanges"
            class="rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-400 transition hover:bg-slate-700 hover:text-white"
          >
            Reset
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
              ✓ Profile saved successfully!
            </span>
          </Transition>
        </div>
      </form>

    </div>
  </div>
</template>