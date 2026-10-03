<script setup lang="ts">

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

    <div>

      <h1 class="text-2xl font-black text-white">
        Profile
      </h1>

      <p class="mt-1 text-sm text-slate-500">
        Manage your personal information.
      </p>

    </div>


    <div
      class="
        rounded-2xl border border-slate-800
        bg-[#050b14] p-6 sm:p-8
      "
    >

      <!-- Avatar -->
      <div class="mb-8 flex items-center gap-5">

        <div
          class="
            flex h-20 w-20
            items-center justify-center
            rounded-2xl bg-[#39ff14]
            text-2xl font-black
            text-[#020617]
          "
        >
          DZ
        </div>

        <div>

          <h2 class="text-xl font-black text-white">
            {{ profile.name }}
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            {{ profile.role }}
          </p>

        </div>

      </div>


      <div class="grid gap-5 md:grid-cols-2">

        <div>
          <label class="admin-label">
            Full Name
          </label>

          <input
            v-model="profile.name"
            class="admin-input"
          />
        </div>

        <div>
          <label class="admin-label">
            Email
          </label>

          <input
            v-model="profile.email"
            class="admin-input"
          />
        </div>

        <div>
          <label class="admin-label">
            Phone
          </label>

          <input
            v-model="profile.phone"
            class="admin-input"
          />
        </div>

        <div>
          <label class="admin-label">
            Role
          </label>

          <input
            v-model="profile.role"
            class="admin-input"
          />
        </div>

        <div class="md:col-span-2">

          <label class="admin-label">
            Location
          </label>

          <input
            v-model="profile.location"
            class="admin-input"
          />

        </div>

        <div class="md:col-span-2">

          <label class="admin-label">
            Bio
          </label>

          <textarea
            v-model="profile.bio"
            rows="5"
            class="admin-input resize-none"
          />

        </div>

      </div>


      <div class="mt-6 flex items-center gap-4">

        <button
          @click="saveProfile"
          class="admin-button"
        >
          Save Changes
        </button>

        <span
          v-if="saved"
          class="text-xs text-[#39ff14]"
        >
          ✓ Profile saved
        </span>

      </div>

    </div>

  </div>

</template>