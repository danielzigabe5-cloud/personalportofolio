<script setup lang="ts">
import { reactive } from 'vue'

definePageMeta({
  layout: 'admin'
})

const settings = reactive({
  emailNotifications: true,
  messageNotifications: true,
  publicProfile: true,
  maintenanceMode: false
})
</script>

<template>
  <div class="max-w-4xl space-y-6">

    <!-- HEADER -->
    <div>
      <h1 class="text-2xl font-black text-slate-100">
        Settings
      </h1>
      <p class="mt-1 text-sm text-slate-400">
        Manage your dashboard preferences.
      </p>
    </div>

    <!-- GENERAL SETTINGS -->
    <section class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
      <h2 class="font-black text-slate-100">
        General Settings
      </h2>
      <p class="mt-1 text-xs text-slate-400">
        Configure your portfolio dashboard.
      </p>

      <div class="mt-6 space-y-5">

        <!-- Email Notifications -->
        <label class="flex cursor-pointer items-center justify-between gap-5 rounded-xl border border-slate-700 bg-slate-900/30 p-4 transition hover:border-slate-600">
          <div>
            <p class="text-sm font-bold text-slate-100">Email Notifications</p>
            <p class="mt-1 text-xs text-slate-400">Receive notifications when someone contacts you.</p>
          </div>
          <div class="relative inline-flex cursor-pointer items-center">
            <input v-model="settings.emailNotifications" type="checkbox" class="peer sr-only" />
            <div class="h-6 w-11 rounded-full bg-slate-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full"></div>
          </div>
        </label>

        <!-- Message Notifications -->
        <label class="flex cursor-pointer items-center justify-between gap-5 rounded-xl border border-slate-700 bg-slate-900/30 p-4 transition hover:border-slate-600">
          <div>
            <p class="text-sm font-bold text-slate-100">Message Notifications</p>
            <p class="mt-1 text-xs text-slate-400">Show new message notifications.</p>
          </div>
          <div class="relative inline-flex cursor-pointer items-center">
            <input v-model="settings.messageNotifications" type="checkbox" class="peer sr-only" />
            <div class="h-6 w-11 rounded-full bg-slate-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full"></div>
          </div>
        </label>

        <!-- Public Profile -->
        <label class="flex cursor-pointer items-center justify-between gap-5 rounded-xl border border-slate-700 bg-slate-900/30 p-4 transition hover:border-slate-600">
          <div>
            <p class="text-sm font-bold text-slate-100">Public Profile</p>
            <p class="mt-1 text-xs text-slate-400">Make your portfolio profile publicly visible.</p>
          </div>
          <div class="relative inline-flex cursor-pointer items-center">
            <input v-model="settings.publicProfile" type="checkbox" class="peer sr-only" />
            <div class="h-6 w-11 rounded-full bg-slate-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full"></div>
          </div>
        </label>

        <!-- Maintenance Mode -->
        <label class="flex cursor-pointer items-center justify-between gap-5 rounded-xl border border-slate-700 bg-slate-900/30 p-4 transition hover:border-slate-600">
          <div>
            <p class="text-sm font-bold text-slate-100">Maintenance Mode</p>
            <p class="mt-1 text-xs text-slate-400">Temporarily disable the public website.</p>
          </div>
          <div class="relative inline-flex cursor-pointer items-center">
            <input v-model="settings.maintenanceMode" type="checkbox" class="peer sr-only" />
            <div class="h-6 w-11 rounded-full bg-slate-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full"></div>
          </div>
        </label>

      </div>
    </section>

    <!-- SECURITY -->
    <section class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
      <h2 class="font-black text-slate-100">Security</h2>
      <p class="mt-1 text-xs text-slate-400">Manage your account security.</p>

      <button
        type="button"
        class="mt-6 inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 px-5 py-2.5 text-sm font-bold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-400"
      >
        Change Password
      </button>
    </section>

    <!-- DANGER ZONE -->
    <section class="rounded-2xl border border-red-900/50 bg-red-950/20 p-6">
      <h2 class="font-black text-red-400">Danger Zone</h2>
      <p class="mt-1 text-xs text-slate-400">Actions here can affect your portfolio account.</p>

      <button
        type="button"
        class="mt-5 inline-flex items-center justify-center rounded-xl border border-red-800 px-5 py-2.5 text-sm font-bold text-red-400 transition duration-300 hover:-translate-y-0.5 hover:bg-red-500/10"
      >
        Logout From All Devices
      </button>
    </section>

  </div>
</template>