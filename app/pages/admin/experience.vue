<script setup lang="ts">

definePageMeta({
  layout: 'admin'
})

const experiences = [
  {
    company: 'Koyehub',
    position: 'Frontend Developer Intern',
    period: '2026',
    description: 'Developed responsive interfaces using Nuxt.js and modern web technologies.'
  },
  {
    company: 'Personal Projects',
    position: 'Full Stack Developer',
    period: '2025 - Present',
    description: 'Building web and mobile applications using Nuxt, Laravel and Flutter.'
  }
]

</script>

<template>

  <div class="space-y-6">

    <div class="flex items-center justify-between">

      <div>
        <h1 class="text-2xl font-black text-white">
          Experience
        </h1>

        <p class="mt-1 text-sm text-slate-500">
          Manage your professional experience.
        </p>
      </div>

      <button class="admin-button">
        + Add Experience
      </button>

    </div>


    <div class="space-y-4">

      <div
        v-for="experience in experiences"
        :key="experience.company"
        class="
          rounded-2xl border border-slate-800
          bg-[#050b14] p-6
        "
      >

        <div class="flex items-start justify-between">

          <div>

            <h2 class="text-lg font-black text-white">
              {{ experience.position }}
            </h2>

            <p class="mt-1 text-[#39ff14]">
              {{ experience.company }}
            </p>

          </div>

          <span
            class="
              rounded-full bg-slate-900
              px-3 py-1 text-xs
              text-slate-400
            "
          >
            {{ experience.period }}
          </span>

        </div>

        <p class="mt-5 text-sm leading-7 text-slate-400">
          {{ experience.description }}
        </p>

        <button class="mt-5 text-xs text-slate-500 hover:text-white">
          Edit Experience
        </button>

      </div>

    </div>

  </div>

</template>