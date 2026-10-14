<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

/* =====================================================
   SKILLS DATA
===================================================== */
const skills = ref([
  { name: 'HTML', level: 95, category: 'Frontend' },
  { name: 'CSS / Tailwind CSS', level: 90, category: 'Frontend' },
  { name: 'JavaScript', level: 85, category: 'Frontend' },
  { name: 'TypeScript', level: 80, category: 'Frontend' },
  { name: 'Vue.js', level: 88, category: 'Frontend' },
  { name: 'Nuxt.js', level: 85, category: 'Frontend' },
  { name: 'Laravel', level: 78, category: 'Backend' },
  { name: 'Flutter', level: 75, category: 'Mobile' }
])
</script>

<template>
  <div class="space-y-6">

    <!-- =================================================
         PAGE HEADER
    ================================================== -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-lg">
          ⚡
        </div>
        <div>
          <h1 class="text-2xl font-black text-slate-100">
            Skills
          </h1>
          <p class="mt-1 text-sm text-slate-400">
            Manage technical skills and proficiency.
          </p>
        </div>
      </div>

      <!-- ADD BUTTON -->
      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        <span class="text-lg leading-none">+</span>
        Add Skill
      </button>
    </div>

    <!-- =================================================
         SUMMARY
    ================================================== -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">

      <!-- TOTAL -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
          Total Skills
        </p>
        <p class="mt-2 text-3xl font-black text-slate-100">
          {{ skills.length }}
        </p>
      </div>

      <!-- FRONTEND -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
          Frontend
        </p>
        <p class="mt-2 text-3xl font-black text-blue-400">
          {{ skills.filter(skill => skill.category === 'Frontend').length }}
        </p>
      </div>

      <!-- AVERAGE -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
          Average Level
        </p>
        <p class="mt-2 text-3xl font-black text-slate-100">
          {{
            Math.round(
              skills.reduce((total, skill) => total + skill.level, 0)
              / skills.length
            )
          }}%
        </p>
      </div>

    </div>

    <!-- =================================================
         SKILLS GRID
    ================================================== -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">

      <!-- SKILL CARD -->
      <div
        v-for="skill in skills"
        :key="skill.name"
        class="group rounded-2xl border border-slate-700 bg-slate-800/50 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-800 hover:shadow-lg hover:shadow-black/20"
      >
        <!-- TOP -->
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {{ skill.category }}
            </span>
            <h2 class="mt-1 font-bold text-slate-100">
              {{ skill.name }}
            </h2>
          </div>

          <span class="rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-sm font-black text-blue-400">
            {{ skill.level }}%
          </span>
        </div>

        <!-- PROGRESS -->
        <div class="mt-5">
          <div class="h-2 overflow-hidden rounded-full bg-slate-700">
            <div
              class="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-700"
              :style="{ width: `${skill.level}%` }"
            ></div>
          </div>
        </div>

        <!-- BOTTOM -->
        <div class="mt-4 flex items-center justify-between">
          <span class="text-xs text-slate-500">
            Proficiency
          </span>
          <div class="flex gap-2">
            <button
              type="button"
              class="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-400 transition hover:bg-slate-700 hover:text-white"
            >
              Edit
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

    <!-- =================================================
         FOOTER NOTE
    ================================================== -->
    <div class="rounded-2xl border border-slate-700 bg-slate-800/50 px-5 py-4">
      <div class="flex items-start gap-3">
        <span class="text-blue-400">✓</span>
        <div>
          <p class="text-sm font-semibold text-slate-200">
            Skills Overview
          </p>
          <p class="mt-1 text-xs leading-5 text-slate-500">
            Keep your proficiency levels updated to accurately
            represent your current technical abilities.
          </p>
        </div>
      </div>
    </div>

  </div>
</template>