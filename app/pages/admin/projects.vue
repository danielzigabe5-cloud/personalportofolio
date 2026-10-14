<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

const projects = ref([
  {
    title: 'CombolojoSPORT',
    category: 'Sports Platform',
    tech: 'Nuxt + Laravel + Flutter',
    status: 'Completed'
  },
  {
    title: 'Internship Attendance System',
    category: 'Web Application',
    tech: 'Nuxt + Laravel',
    status: 'In Progress'
  },
  {
    title: 'Personal Portfolio',
    category: 'Portfolio',
    tech: 'Nuxt 4 + Tailwind',
    status: 'In Progress'
  }
])

const showForm = ref(false)
</script>

<template>
  <div class="space-y-6">

    <!-- HEADER -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-100">
          Projects
        </h1>
        <p class="mt-1 text-sm text-slate-400">
          Manage your portfolio projects.
        </p>
      </div>

      <button
        type="button"
        @click="showForm = !showForm"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        <span class="text-lg leading-none">{{ showForm ? '×' : '+' }}</span>
        {{ showForm ? 'Cancel' : 'Add Project' }}
      </button>
    </div>

    <!-- ADD PROJECT FORM -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="showForm"
        class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6"
      >
        <h2 class="mb-5 font-black text-slate-100">
          Add New Project
        </h2>

        <div class="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Project title"
            class="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Category"
            class="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Technologies"
            class="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="url"
            placeholder="Project URL"
            class="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          class="mt-4 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
        >
          Save Project
        </button>
      </div>
    </Transition>

    <!-- PROJECTS GRID -->
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="project in projects"
        :key="project.title"
        class="group flex flex-col rounded-2xl border border-slate-700 bg-slate-800/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800"
      >
        <!-- ICON -->
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-2xl">
          🚀
        </div>

        <!-- TITLE -->
        <h2 class="mt-5 text-lg font-black text-slate-100">
          {{ project.title }}
        </h2>

        <!-- CATEGORY -->
        <p class="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          {{ project.category }}
        </p>

        <!-- TECH -->
        <div class="mt-4 text-xs text-slate-400">
          {{ project.tech }}
        </div>

        <!-- FOOTER -->
        <div class="mt-auto flex items-center justify-between pt-5">
          <!-- STATUS BADGE -->
          <span
            :class="[
              'rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider',
              project.status === 'Completed'
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-amber-500/10 text-amber-400'
            ]"
          >
            {{ project.status }}
          </span>

          <!-- EDIT BUTTON -->
          <button
            type="button"
            class="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-400 transition hover:bg-slate-700 hover:text-white"
          >
            Edit
          </button>
        </div>
      </div>
    </div>

  </div>
</template>