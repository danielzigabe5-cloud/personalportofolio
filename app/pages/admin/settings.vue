<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount, watch } from 'vue'

definePageMeta({
  layout: 'admin'
})

/* =====================================================
   SETTINGS STATE & PERSISTENCE
===================================================== */
const defaultSettings = {
  emailNotifications: true,
  messageNotifications: true,
  publicProfile: true,
  maintenanceMode: false
}

const settings = reactive({ ...defaultSettings })
const isLoaded = ref(false)
const isSaving = ref(false)

// Toast Alert State
const toast = reactive({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error' | 'info'
})

let toastTimeout: ReturnType<typeof setTimeout> | null = null

const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  if (toastTimeout) clearTimeout(toastTimeout)
  toast.message = message
  toast.type = type
  toast.show = true
  toastTimeout = setTimeout(() => {
    toast.show = false
  }, 3500)
}

let saveTimeout: ReturnType<typeof setTimeout> | null = null

onMounted(async () => {
  try {
    const savedSettings = await $fetch<typeof defaultSettings>('/api/settings')
    Object.assign(settings, savedSettings)
  } catch {
    showToast('Could not load settings from the server.', 'error')
  } finally {
    isLoaded.value = true
  }
})

watch(
  settings,
  (newVal) => {
    if (!isLoaded.value) return

    if (saveTimeout) clearTimeout(saveTimeout)
    isSaving.value = true
    const settingsToSave = { ...newVal }

    saveTimeout = setTimeout(async () => {
      try {
        await $fetch('/api/settings', { method: 'PUT', body: settingsToSave })
        showToast('Settings saved successfully!')
      } catch {
        showToast('Could not save settings. Please try again.', 'error')
      } finally {
        isSaving.value = false
        saveTimeout = null
      }
    }, 250)
  },
  { deep: true }
)

onBeforeUnmount(() => {
  if (saveTimeout) clearTimeout(saveTimeout)
  if (toastTimeout) clearTimeout(toastTimeout)
})

/* =====================================================
   CHANGE PASSWORD MODAL
===================================================== */
const isPasswordModalOpen = ref(false)
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const passwordError = ref('')
const passwordLoading = ref(false)

const openPasswordModal = () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  passwordError.value = ''
  isPasswordModalOpen.value = true
}

const closePasswordModal = () => {
  isPasswordModalOpen.value = false
}

const handlePasswordChange = async () => {
  passwordError.value = ''

  if (passwordForm.newPassword.length < 6) {
    passwordError.value = 'New password must be at least 6 characters.'
    return
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordError.value = 'New passwords do not match.'
    return
  }

  passwordLoading.value = true

  // API Call Simulation
  setTimeout(() => {
    passwordLoading.value = false
    closePasswordModal()
    showToast('Password changed successfully!')
  }, 800)
}

/* =====================================================
   DANGER ZONE: LOGOUT ALL DEVICES
===================================================== */
const isLogoutModalOpen = ref(false)

const confirmLogoutAll = () => {
  isLogoutModalOpen.value = false
  showToast('Logged out from all active sessions.', 'info')

  // Example redirect: If you have an auth store or login page
  setTimeout(() => {
    // navigateTo('/login')
  }, 1000)
}
</script>

<template>
  <div class="relative max-w-4xl space-y-6">

    <!-- TOAST NOTIFICATION -->
    <Teleport to="body">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md transition-all duration-300"
        :class="{
          'border-emerald-500/30 bg-emerald-950/80 text-emerald-200': toast.type === 'success',
          'border-red-500/30 bg-red-950/80 text-red-200': toast.type === 'error',
          'border-blue-500/30 bg-blue-950/80 text-blue-200': toast.type === 'info'
        }"
      >
        <span class="text-base">
          {{ toast.type === 'success' ? '✓' : toast.type === 'error' ? '⚠' : 'ℹ' }}
        </span>
        <p class="text-xs font-bold">{{ toast.message }}</p>
      </div>
    </Teleport>

    <!-- HEADER -->
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-100">
          Settings
        </h1>
        <p class="mt-1 text-sm text-slate-400">
          Manage your dashboard preferences and account security.
        </p>
      </div>

      <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {{ !isLoaded ? 'Loading settings...' : isSaving ? 'Saving...' : 'Saved' }}
        </span>
      </div>
    </div>

    <!-- MAINTENANCE MODE WARNING BANNER -->
    <div
      v-if="settings.maintenanceMode"
      class="flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-300"
    >
      <span class="text-xl">⚠️</span>
      <div>
        <p class="text-sm font-bold">Maintenance Mode is ON</p>
        <p class="text-xs text-amber-300/80">Visitors will see a maintenance screen when visiting your public portfolio.</p>
      </div>
    </div>

    <!-- GENERAL SETTINGS -->
    <section class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
      <h2 class="font-black text-slate-100">
        General Settings
      </h2>
      <p class="mt-1 text-xs text-slate-400">
        Configure your portfolio dashboard preferences.
      </p>

      <div class="mt-6 space-y-4">

        <!-- Email Notifications -->
        <label class="flex cursor-pointer items-center justify-between gap-5 rounded-xl border border-slate-700 bg-slate-900/30 p-4 transition hover:border-slate-600">
          <div>
            <p class="text-sm font-bold text-slate-100">Email Notifications</p>
            <p class="mt-1 text-xs text-slate-400">Receive notifications when someone contacts you.</p>
          </div>
          <div class="relative inline-flex cursor-pointer items-center">
            <input v-model="settings.emailNotifications" type="checkbox" class="peer sr-only" />
            <div class="h-6 w-11 rounded-full bg-slate-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full"></div>
          </div>
        </label>

        <!-- Message Notifications -->
        <label class="flex cursor-pointer items-center justify-between gap-5 rounded-xl border border-slate-700 bg-slate-900/30 p-4 transition hover:border-slate-600">
          <div>
            <p class="text-sm font-bold text-slate-100">Message Notifications</p>
            <p class="mt-1 text-xs text-slate-400">Show new message popup in dashboard.</p>
          </div>
          <div class="relative inline-flex cursor-pointer items-center">
            <input v-model="settings.messageNotifications" type="checkbox" class="peer sr-only" />
            <div class="h-6 w-11 rounded-full bg-slate-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full"></div>
          </div>
        </label>

        <!-- Public Profile -->
        <label class="flex cursor-pointer items-center justify-between gap-5 rounded-xl border border-slate-700 bg-slate-900/30 p-4 transition hover:border-slate-600">
          <div>
            <p class="text-sm font-bold text-slate-100">Public Profile</p>
            <p class="mt-1 text-xs text-slate-400">Make your portfolio profile publicly visible to recruiters.</p>
          </div>
          <div class="relative inline-flex cursor-pointer items-center">
            <input v-model="settings.publicProfile" type="checkbox" class="peer sr-only" />
            <div class="h-6 w-11 rounded-full bg-slate-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full"></div>
          </div>
        </label>

        <!-- Maintenance Mode -->
        <label class="flex cursor-pointer items-center justify-between gap-5 rounded-xl border border-slate-700 bg-slate-900/30 p-4 transition hover:border-slate-600">
          <div>
            <p class="text-sm font-bold text-slate-100">Maintenance Mode</p>
            <p class="mt-1 text-xs text-slate-400">Temporarily disable the public website during updates.</p>
          </div>
          <div class="relative inline-flex cursor-pointer items-center">
            <input v-model="settings.maintenanceMode" type="checkbox" class="peer sr-only" />
            <div class="h-6 w-11 rounded-full bg-slate-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full"></div>
          </div>
        </label>

      </div>
    </section>

    <!-- SECURITY -->
    <section class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
      <h2 class="font-black text-slate-100">Security</h2>
      <p class="mt-1 text-xs text-slate-400">Manage your password and authentication.</p>

      <div class="mt-6">
        <button
          type="button"
          @click="openPasswordModal"
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-bold text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-400 focus:outline-none"
        >
          <span>🔒</span>
          Change Password
        </button>
      </div>
    </section>

    <!-- DANGER ZONE -->
    <section class="rounded-2xl border border-red-900/40 bg-red-950/20 p-6">
      <h2 class="font-black text-red-400">Danger Zone</h2>
      <p class="mt-1 text-xs text-slate-400">Actions here can affect active sessions across all devices.</p>

      <div class="mt-5">
        <button
          type="button"
          @click="isLogoutModalOpen = true"
          class="inline-flex items-center justify-center rounded-xl border border-red-800/80 bg-red-950/40 px-5 py-2.5 text-sm font-bold text-red-400 transition duration-300 hover:-translate-y-0.5 hover:bg-red-500/20 hover:border-red-600"
        >
          Logout From All Devices
        </button>
      </div>
    </section>

    <!-- =================================================
         MODAL: CHANGE PASSWORD
    ================================================== -->
    <Teleport to="body">
      <div
        v-if="isPasswordModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      >
        <div class="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 class="text-lg font-bold text-slate-100">Change Password</h3>
            <button
              @click="closePasswordModal"
              class="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              ✕
            </button>
          </div>

          <form @submit.prevent="handlePasswordChange" class="mt-4 space-y-4">
            <div v-if="passwordError" class="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-semibold text-red-400">
              {{ passwordError }}
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Current Password
              </label>
              <input
                v-model="passwordForm.currentPassword"
                type="password"
                required
                class="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                New Password
              </label>
              <input
                v-model="passwordForm.newPassword"
                type="password"
                placeholder="At least 6 characters"
                required
                class="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Confirm New Password
              </label>
              <input
                v-model="passwordForm.confirmPassword"
                type="password"
                placeholder="Repeat new password"
                required
                class="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div class="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                @click="closePasswordModal"
                class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="passwordLoading"
                class="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 disabled:opacity-50"
              >
                {{ passwordLoading ? 'Updating...' : 'Update Password' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- =================================================
         MODAL: LOGOUT CONFIRMATION
    ================================================== -->
    <Teleport to="body">
      <div
        v-if="isLogoutModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      >
        <div class="w-full max-w-sm rounded-2xl border border-red-900/50 bg-slate-900 p-6 text-center shadow-2xl">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-xl text-red-400">
            ⚠️
          </div>
          <h3 class="mt-4 text-lg font-bold text-slate-100">ከሁሉም መሳሪያዎች መውጣት?</h3>
          <p class="mt-2 text-xs text-slate-400">
            ይህ እርምጃ በስልክ፣ በሌላ ኮምፒውተር ወይም በታብሌት ላይ የተከፈቱትን ሁሉንም Session ይዘጋል።
          </p>

          <div class="mt-6 flex justify-center gap-3">
            <button
              type="button"
              @click="isLogoutModalOpen = false"
              class="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800"
            >
              ተመለስ (Cancel)
            </button>
            <button
              type="button"
              @click="confirmLogoutAll"
              class="rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-500"
            >
              አዎ፣ Logout አድርግ
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>