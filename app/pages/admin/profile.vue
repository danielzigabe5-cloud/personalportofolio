<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { ProfileData } from '~~/shared/utils/profile'

definePageMeta({
  layout: 'admin'
})

const { data: savedProfile, error: profileLoadError } = await useProfile()
const profile = reactive<ProfileData>({ ...savedProfile.value })

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

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  errorMessage.value = ''
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) {
    errorMessage.value = 'Choose a JPG, PNG, or WebP photo smaller than 10 MB.'
    target.value = ''
    return
  }

  try {
    const image = await createImageBitmap(file)
    const scale = Math.min(1, 1000 / Math.max(image.width, image.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(image.width * scale)
    canvas.height = Math.round(image.height * scale)
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Your browser could not process this photo.')

    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    image.close()
    const avatarUrl = canvas.toDataURL('image/jpeg', 0.82)
    if (avatarUrl.length > 1_200_000) {
      throw new Error('This photo is too large after processing. Choose a smaller image.')
    }
    profile.avatarUrl = avatarUrl
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Could not process this photo.'
  } finally {
    target.value = ''
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

const saveProfile = async () => {
  errorMessage.value = ''

  if (!profile.name.trim()) {
    errorMessage.value = 'ስም ማስገባት ግዴታ ነው (Name is required)'
    return
  }

  isSaving.value = true
  try {
    const updatedProfile = await $fetch<ProfileData>('/api/profile', {
      method: 'PUT',
      body: { ...profile }
    })
    Object.assign(profile, updatedProfile)
    savedProfile.value = updatedProfile
    saved.value = true

    setTimeout(() => {
      saved.value = false
    }, 2500)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Could not save your profile.'
  } finally {
    isSaving.value = false
  }
}

const resetChanges = () => {
  Object.assign(profile, savedProfile.value)
  errorMessage.value = ''
}
</script>

<template>
  <div class="profile-page mx-auto max-w-6xl space-y-6">
    <header class="profile-page-header flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
      <div>
        <p class="profile-eyebrow">ACCOUNT</p>
        <h1 class="mt-1 text-2xl font-black sm:text-3xl">Profile</h1>
        <p class="profile-muted mt-2 text-sm">Manage how you appear across your portfolio.</p>
      </div>
      <NuxtLink to="/" class="profile-secondary-button inline-flex w-fit items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 3h7v7m-1-6L10 14" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
        </svg>
        View portfolio
      </NuxtLink>
    </header>

    <section class="profile-overview overflow-hidden rounded-3xl" aria-label="Profile preview">
      <div class="profile-overview-main flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
        <div class="profile-avatar-wrap group relative h-20 w-20 shrink-0">
          <div v-if="profile.avatarUrl" class="h-20 w-20 overflow-hidden rounded-2xl border border-white/20">
            <img :src="profile.avatarUrl" alt="Profile photo" class="h-full w-full object-cover" />
          </div>
          <div v-else class="profile-initials flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-black">
            {{ initials }}
          </div>
          <button
            type="button"
            @click="triggerFileUpload"
            class="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-950/65 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100 focus:opacity-100"
            aria-label="Change profile photo"
          >
            Change
          </button>
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <h2 class="truncate text-xl font-black text-white sm:text-2xl">{{ profile.name || 'Your Name' }}</h2>
            <span class="profile-admin-badge rounded-full px-2.5 py-1 text-[11px] font-bold">Admin</span>
          </div>
          <p class="profile-role mt-1 text-sm font-semibold">{{ profile.role || 'Professional Role' }}</p>
          <div class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/70">
            <span v-if="profile.email">{{ profile.email }}</span>
            <span v-if="profile.location">{{ profile.location }}</span>
          </div>
        </div>

        <div class="profile-visibility rounded-2xl border px-4 py-3 sm:min-w-48">
          <p class="text-xs text-white/60">Portfolio profile</p>
          <p class="mt-1 flex items-center gap-2 text-sm font-semibold text-white">
            <span class="h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true"></span>
            Public profile details
          </p>
        </div>
      </div>
      <div class="profile-photo-actions flex flex-wrap items-center gap-3 px-6 py-3 sm:px-8">
        <input
          ref="fileInput"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          class="hidden"
          @change="handleFileUpload"
        />
        <button type="button" @click="triggerFileUpload" class="profile-upload-button rounded-lg px-3 py-2 text-xs font-bold transition">
          Upload photo
        </button>
        <button
          v-if="profile.avatarUrl"
          type="button"
          @click="removeAvatar"
          class="profile-remove-button rounded-lg px-3 py-2 text-xs font-bold transition"
        >
          Remove photo
        </button>
        <span class="profile-muted text-xs">JPG, PNG or WebP · Max 10 MB</span>
      </div>
    </section>

    <div v-if="profileLoadError || errorMessage" class="profile-error rounded-xl border p-4 text-sm font-semibold" role="alert">
      {{ errorMessage || 'Could not load the saved profile. You can retry by refreshing this page.' }}
    </div>

    <form class="profile-form-card overflow-hidden rounded-3xl border" @submit.prevent="saveProfile">
      <div class="profile-form-heading border-b px-6 py-5 sm:px-8">
        <p class="profile-eyebrow">PERSONAL INFORMATION</p>
        <h2 class="mt-1 text-lg font-bold">Profile details</h2>
        <p class="profile-muted mt-1 text-sm">These details help visitors learn about you and get in touch.</p>
      </div>

      <div class="grid gap-x-6 gap-y-5 p-6 sm:grid-cols-2 sm:p-8">
        <div class="profile-field">
          <label for="profile-name" class="mb-2 block text-sm font-semibold">Full name <span class="profile-required">*</span></label>
          <input id="profile-name" v-model="profile.name" type="text" required autocomplete="name" class="profile-input" />
        </div>
        <div class="profile-field">
          <label for="profile-email" class="mb-2 block text-sm font-semibold">Email <span class="profile-required">*</span></label>
          <input id="profile-email" v-model="profile.email" type="email" required autocomplete="email" class="profile-input" />
        </div>
        <div class="profile-field">
          <label for="profile-phone" class="mb-2 block text-sm font-semibold">Phone</label>
          <input id="profile-phone" v-model="profile.phone" type="tel" autocomplete="tel" class="profile-input" />
        </div>
        <div class="profile-field">
          <label for="profile-role" class="mb-2 block text-sm font-semibold">Professional title</label>
          <input id="profile-role" v-model="profile.role" type="text" class="profile-input" />
        </div>
        <div class="profile-field sm:col-span-2">
          <label for="profile-location" class="mb-2 block text-sm font-semibold">Location</label>
          <input id="profile-location" v-model="profile.location" type="text" autocomplete="address-level2" class="profile-input" />
        </div>
        <div class="profile-field sm:col-span-2">
          <label for="profile-headline" class="mb-2 block text-sm font-semibold">About page headline</label>
          <input id="profile-headline" v-model="profile.aboutHeadline" type="text" class="profile-input" />
        </div>
        <div class="profile-field sm:col-span-2">
          <label for="profile-bio" class="mb-2 block text-sm font-semibold">Introduction</label>
          <textarea id="profile-bio" v-model="profile.bio" rows="3" class="profile-input resize-y"></textarea>
        </div>
        <div class="profile-field sm:col-span-2">
          <label for="profile-details" class="mb-2 block text-sm font-semibold">About details</label>
          <textarea id="profile-details" v-model="profile.aboutDetails" rows="5" class="profile-input resize-y"></textarea>
        </div>
      </div>

      <div class="profile-form-actions flex flex-wrap items-center gap-3 border-t px-6 py-5 sm:px-8">
        <button type="submit" :disabled="isSaving" class="profile-save-button inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60">
          <span v-if="isSaving" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          {{ isSaving ? 'Saving...' : 'Save changes' }}
        </button>
        <button type="button" @click="resetChanges" class="profile-reset-button rounded-xl border px-5 py-3 text-sm font-semibold transition">
          Reset changes
        </button>

        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <span v-if="saved" class="profile-success inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold" role="status">
            <span aria-hidden="true">✓</span> Profile saved successfully
          </span>
        </Transition>
      </div>
    </form>
  </div>
</template>

<style scoped>
.profile-page {
  color: #174b45;
}

.profile-page-header,
.profile-form-card {
  border-color: #c2ded9;
  background: #f8fbfa;
  box-shadow: 0 8px 26px rgb(23 75 69 / 4%);
}

.profile-eyebrow {
  color: #168b7d;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.profile-muted {
  color: #66827e;
}

.profile-secondary-button,
.profile-reset-button {
  border-color: #c2ded9;
  background: #fff;
  color: #315e58;
}

.profile-secondary-button:hover,
.profile-reset-button:hover {
  border-color: #8fc5ba;
  background: #eff8f6;
}

.profile-overview {
  background: linear-gradient(115deg, #14283a, #174b45 72%, #236c61);
  box-shadow: 0 18px 38px rgb(20 40 58 / 16%);
}

.profile-overview-main {
  min-height: 158px;
}

.profile-initials {
  border: 1px solid rgb(255 255 255 / 18%);
  background: linear-gradient(145deg, #36b79c, #11786e);
  color: #fff;
  box-shadow: 0 8px 20px rgb(0 0 0 / 18%);
}

.profile-admin-badge {
  background: rgb(90 226 184 / 14%);
  color: #8af0cb;
}

.profile-role {
  color: #6de0bd;
}

.profile-visibility {
  border-color: rgb(255 255 255 / 12%);
  background: rgb(255 255 255 / 7%);
}

.profile-photo-actions {
  border-top: 1px solid rgb(255 255 255 / 12%);
  background: rgb(8 28 39 / 22%);
}

.profile-upload-button {
  background: rgb(255 255 255 / 12%);
  color: #fff;
}

.profile-upload-button:hover {
  background: rgb(255 255 255 / 20%);
}

.profile-remove-button {
  color: #ffc0bc;
}

.profile-remove-button:hover {
  background: rgb(255 125 115 / 12%);
}

.profile-form-heading,
.profile-form-actions {
  border-color: #e0ece9;
}

.profile-field {
  color: #315e58;
}

.profile-required {
  color: #d65b57;
}

.profile-input {
  width: 100%;
  border: 1px solid #d2e3df;
  border-radius: 0.8rem;
  background: #fff;
  padding: 0.8rem 0.95rem;
  color: #174b45;
  font-size: 0.9rem;
  line-height: 1.5;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.profile-input:focus {
  border-color: #168b7d;
  outline: none;
  box-shadow: 0 0 0 3px rgb(22 139 125 / 12%);
}

.profile-save-button {
  background: linear-gradient(110deg, #168b7d, #12a985);
  box-shadow: 0 7px 16px rgb(22 139 125 / 18%);
}

.profile-save-button:hover:not(:disabled) {
  box-shadow: 0 10px 20px rgb(22 139 125 / 25%);
  transform: translateY(-1px);
}

.profile-error {
  border-color: #f2c3bd;
  background: #fff4f2;
  color: #a63e36;
}

.profile-success {
  background: #e6f7ef;
  color: #187b5a;
}

@media (prefers-reduced-motion: reduce) {
  .profile-input,
  .profile-secondary-button,
  .profile-reset-button,
  .profile-save-button {
    transition: none;
  }
}
</style>