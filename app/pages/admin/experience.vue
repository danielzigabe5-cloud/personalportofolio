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

    <!-- HEADER -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-100">
          Experience
        </h1>
        <p class="mt-1 text-sm text-slate-400">
          Manage your professional experience.
        </p>
      </div>

      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        <span class="text-lg leading-none">+</span>
        Add Experience
      </button>
    </div>

    <!-- EXPERIENCE LIST -->
    <div class="space-y-4">
      <div
        v-for="experience in experiences"
        :key="experience.company"
        class="group rounded-2xl border border-slate-700 bg-slate-800/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800"
      >
        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 class="text-lg font-black text-slate-100">
              {{ experience.position }}
            </h2>
            <p class="mt-1 text-sm font-semibold text-blue-400">
              {{ experience.company }}
            </p>
          </div>

          <span class="inline-flex w-fit items-center rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {{ experience.period }}
          </span>
        </div>

        <p class="mt-5 text-sm leading-7 text-slate-400">
          {{ experience.description }}
        </p>

        <div class="mt-5 flex gap-2 border-t border-slate-700 pt-4">
          <button
            type="button"
            class="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-400 transition hover:bg-slate-700 hover:text-white"
          >
            Edit Experience
          </button>
          <button
            type="button"
            class="rounded-lg px-3 py-1.5 text-xs font-bold text-red-400/70 transition hover:bg-red-500/10 hover:text-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

  </div>
</template>