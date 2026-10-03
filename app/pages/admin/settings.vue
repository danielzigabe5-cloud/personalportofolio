<script setup lang="ts">

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

    <div>

      <h1 class="text-2xl font-black text-white">
        Settings
      </h1>

      <p class="mt-1 text-sm text-slate-500">
        Manage your dashboard preferences.
      </p>

    </div>


    <!-- General -->
    <section
      class="
        rounded-2xl border border-slate-800
        bg-[#050b14] p-6
      "
    >

      <h2 class="font-black text-white">
        General Settings
      </h2>

      <p class="mt-1 text-xs text-slate-500">
        Configure your portfolio dashboard.
      </p>


      <div class="mt-6 space-y-5">

        <!-- Email -->
        <label
          class="
            flex cursor-pointer items-center
            justify-between gap-5
          "
        >

          <div>

            <p class="text-sm font-bold text-white">
              Email Notifications
            </p>

            <p class="mt-1 text-xs text-slate-500">
              Receive notifications when someone contacts you.
            </p>

          </div>

          <input
            v-model="settings.emailNotifications"
            type="checkbox"
            class="accent-[#39ff14]"
          />

        </label>


        <!-- Messages -->
        <label
          class="
            flex cursor-pointer items-center
            justify-between gap-5
          "
        >

          <div>

            <p class="text-sm font-bold text-white">
              Message Notifications
            </p>

            <p class="mt-1 text-xs text-slate-500">
              Show new message notifications.
            </p>

          </div>

          <input
            v-model="settings.messageNotifications"
            type="checkbox"
            class="accent-[#39ff14]"
          />

        </label>


        <!-- Public -->
        <label
          class="
            flex cursor-pointer items-center
            justify-between gap-5
          "
        >

          <div>

            <p class="text-sm font-bold text-white">
              Public Profile
            </p>

            <p class="mt-1 text-xs text-slate-500">
              Make your portfolio profile publicly visible.
            </p>

          </div>

          <input
            v-model="settings.publicProfile"
            type="checkbox"
            class="accent-[#39ff14]"
          />

        </label>


        <!-- Maintenance -->
        <label
          class="
            flex cursor-pointer items-center
            justify-between gap-5
          "
        >

          <div>

            <p class="text-sm font-bold text-white">
              Maintenance Mode
            </p>

            <p class="mt-1 text-xs text-slate-500">
              Temporarily disable the public website.
            </p>

          </div>

          <input
            v-model="settings.maintenanceMode"
            type="checkbox"
            class="accent-[#39ff14]"
          />

        </label>

      </div>

    </section>


    <!-- Security -->
    <section
      class="
        rounded-2xl border border-slate-800
        bg-[#050b14] p-6
      "
    >

      <h2 class="font-black text-white">
        Security
      </h2>

      <p class="mt-1 text-xs text-slate-500">
        Manage your account security.
      </p>

      <button
        class="
          mt-6 rounded-xl
          border border-slate-700
          px-4 py-2.5
          text-sm font-bold
          text-slate-300
          hover:border-[#39ff14]
          hover:text-[#39ff14]
        "
      >
        Change Password
      </button>

    </section>


    <!-- Danger -->
    <section
      class="
        rounded-2xl border border-red-900/50
        bg-red-950/10 p-6
      "
    >

      <h2 class="font-black text-red-400">
        Danger Zone
      </h2>

      <p class="mt-1 text-xs text-slate-500">
        Actions here can affect your portfolio account.
      </p>

      <button
        class="
          mt-5 rounded-xl
          border border-red-800
          px-4 py-2.5
          text-sm font-bold
          text-red-400
          hover:bg-red-500/10
        "
      >
        Logout From All Devices
      </button>

    </section>

  </div>

</template>