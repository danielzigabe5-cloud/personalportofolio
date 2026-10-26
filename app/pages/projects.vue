<script setup lang="ts">
import { computed, ref } from 'vue'

// SEO
useSeoMeta({
  title: 'Projects | Daniel Zigabe - Full-Stack & Mobile Developer',
  description: 'Featured projects built by Daniel Zigabe with Nuxt.js, Laravel, Flutter, and Tailwind CSS.'
})

interface Project {
  id: string
  category: string
  title: string
  description: string
  tech: string
  url: string
  githubUrl: string
  status: 'Completed' | 'In Progress' | 'Planning'
}

const { data: projects, pending, error } = await useFetch<Project[]>('/api/projects', {
  default: () => []
})
const selectedCategory = ref('All')
const categories = computed(() => ['All', ...new Set(projects.value.map(project => project.category).filter(Boolean))])
const completedCount = computed(() => projects.value.filter(project => project.status === 'Completed').length)
const gradients = [
  'from-emerald-800 via-teal-800 to-teal-950',
  'from-teal-700 via-emerald-800 to-teal-950',
  'from-emerald-700 via-teal-800 to-teal-950',
  'from-teal-800 via-emerald-800 to-teal-950'
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') return projects.value
  return projects.value.filter(project => project.category === selectedCategory.value)
})

const getProjectTags = (project: Project) => {
  return project.tech.split(/[+,]/).map(tag => tag.trim()).filter(Boolean)
}

</script>

<template>
  <main class="min-h-screen bg-[#f4f8f7] text-slate-900 selection:bg-teal-700 selection:text-white">
    <section class="relative overflow-hidden border-b border-teal-900/10 bg-[radial-gradient(ellipse_at_80%_0%,rgba(22,139,125,0.12),transparent_38%),linear-gradient(180deg,#f8fdfc_0%,#edf6f4_100%)]">
      <div class="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
        <div class="max-w-3xl">
          <span class="mb-3 block text-xs font-extrabold uppercase tracking-[0.2em] text-teal-700">SELECTED WORK</span>
          <h1 class="text-4xl font-black tracking-tight text-[#174b45] sm:text-5xl lg:text-6xl">Projects built to make a difference.</h1>
          <p class="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            A selection of digital products and practical solutions I’ve worked on, from web platforms to mobile applications.
          </p>
          <div class="mt-7 flex flex-wrap gap-3">
            <div class="rounded-xl border border-white/80 bg-white/75 px-4 py-3 shadow-sm">
              <strong class="block text-xl font-black text-[#174b45]">{{ projects.length }}</strong>
              <span class="text-xs font-semibold text-slate-500">Featured projects</span>
            </div>
            <div class="rounded-xl border border-white/80 bg-white/75 px-4 py-3 shadow-sm">
              <strong class="block text-xl font-black text-[#174b45]">{{ completedCount }}</strong>
              <span class="text-xs font-semibold text-slate-500">Completed</span>
            </div>
            <div class="rounded-xl border border-white/80 bg-white/75 px-4 py-3 shadow-sm">
              <strong class="block text-xl font-black text-[#174b45]">{{ categories.length - 1 }}</strong>
              <span class="text-xs font-semibold text-slate-500">Project categories</span>
            </div>
          </div>
        </div>

        <nav aria-label="Filter projects by category" class="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            :aria-pressed="selectedCategory === cat"
            @click="selectedCategory = cat"
            :class="[
              'rounded-full border px-4 py-2.5 text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2',
              selectedCategory === cat
                ? 'border-teal-700 bg-teal-700 text-white shadow-md shadow-teal-900/15'
                : 'border-teal-900/10 bg-white/80 text-slate-600 hover:border-teal-700/40 hover:text-teal-800'
            ]"
          >
            {{ cat }}
          </button>
        </nav>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 py-10 sm:py-14" aria-label="Project portfolio">
      <p v-if="pending" role="status" class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading projects...</p>
      <p v-else-if="error" role="alert" class="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">Projects could not be loaded. Please try again later.</p>
      <p v-else-if="filteredProjects.length === 0" class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">No projects in this category yet.</p>

      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <article
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-teal-700/30 hover:shadow-[0_24px_55px_rgba(23,75,69,0.12)]"
        >
          <div :class="['relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br p-6 sm:h-64', gradients[index % gradients.length]]">
            <div class="absolute -right-12 -top-16 h-48 w-48 rounded-full border border-white/10" aria-hidden="true" />
            <div class="absolute -bottom-24 -left-12 h-56 w-56 rounded-full border border-white/10" aria-hidden="true" />
            <span class="absolute left-5 top-5 rounded-lg border border-white/15 bg-slate-950/25 px-2.5 py-1 font-mono text-xs font-bold text-white/90">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <span
              :class="[
                'absolute right-5 top-5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur',
                project.status === 'Completed'
                  ? 'border-emerald-200/25 bg-emerald-300/15 text-emerald-50'
                  : project.status === 'In Progress'
                    ? 'border-amber-200/25 bg-amber-300/15 text-amber-50'
                    : 'border-white/20 bg-white/10 text-white'
              ]"
            >
              {{ project.status }}
            </span>

            <div class="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-slate-950/85 p-5 shadow-2xl backdrop-blur-md transition duration-300 group-hover:scale-[1.02]">
              <div class="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
                <div class="flex items-center gap-1.5" aria-hidden="true">
                  <span class="h-2 w-2 rounded-full bg-rose-400" />
                  <span class="h-2 w-2 rounded-full bg-amber-300" />
                  <span class="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
                <span class="max-w-[65%] truncate font-mono text-[10px] text-slate-400">{{ project.category }}</span>
              </div>
              <span class="mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-teal-300">DIGITAL PRODUCT</span>
              <strong class="block truncate text-lg font-bold text-white sm:text-xl">{{ project.title }}</strong>
              <div class="mt-5 flex gap-2" aria-hidden="true">
                <span class="h-1.5 w-2/3 rounded-full bg-white/20" />
                <span class="h-1.5 w-1/4 rounded-full bg-teal-300/50" />
              </div>
            </div>
          </div>

          <div class="flex flex-1 flex-col p-6 sm:p-8">
            <div class="mb-3 flex items-center justify-between gap-3">
              <span class="text-[11px] font-extrabold uppercase tracking-[0.14em] text-teal-700">{{ project.category }}</span>
              <span class="h-px flex-1 bg-slate-100" aria-hidden="true" />
            </div>
            <h2 class="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">{{ project.title }}</h2>
            <p class="mt-3 flex-1 text-sm leading-7 text-slate-600">{{ project.description }}</p>

            <div class="mt-6 border-t border-slate-100 pt-5">
              <span class="mb-3 block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">BUILT WITH</span>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in getProjectTags(project)"
                  :key="tag"
                  class="rounded-lg border border-teal-900/10 bg-[#f3f9f8] px-2.5 py-1.5 text-[11px] font-bold text-[#35665f]"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div v-if="project.url || project.githubUrl" class="mt-6 flex flex-wrap items-center gap-3">
              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Open ${project.title} live demo in a new tab`"
                class="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-teal-900/15 transition hover:-translate-y-0.5 hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                <span>Live Demo</span><span aria-hidden="true">↗</span>
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`View ${project.title} on GitHub in a new tab`"
                class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                <span>GitHub</span><span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>