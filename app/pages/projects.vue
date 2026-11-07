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
const gradients = [
'from-sky-900 via-blue-800 to-sky-950',
'from-blue-700 via-sky-800 to-sky-950',
'from-sky-700 via-blue-800 to-sky-950',
'from-blue-800 via-sky-800 to-sky-950'
]
const accents = [
  { badge: 'border-blue-300/50 bg-blue-400/10 text-blue-800', link: 'text-blue-700 hover:text-blue-800' },
  { badge: 'border-sky-300/30 bg-sky-400/10 text-sky-700', link: 'text-sky-700 hover:text-sky-800' },
  { badge: 'border-teal-300/20 bg-teal-400/10 text-teal-300', link: 'text-teal-400 hover:text-teal-300' },
  { badge: 'border-amber-300/20 bg-amber-400/10 text-amber-300', link: 'text-amber-400 hover:text-amber-300' }
]
const getAccent = (index: number) => accents[index % accents.length] ?? accents[0]!

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') return projects.value
  return projects.value.filter(project => project.category === selectedCategory.value)
})

const getProjectTags = (project: Project) => {
  return project.tech.split(/[+,]/).map(tag => tag.trim()).filter(Boolean)
}

</script>

<template>
  <main class="projects-page min-h-screen bg-[#172335] text-white selection:bg-[#0ea5e9] selection:text-white">
    <section class="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,rgba(14,165,233,0.14),transparent_52%),linear-gradient(115deg,#172335_0%,#1b2b40_50%,#172335_100%)]">
      <div class="pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true">
        <span class="absolute left-[12%] top-12 h-1 w-1 rounded-full bg-sky-300" />
        <span class="absolute right-[15%] top-24 h-1 w-1 rounded-full bg-blue-300" />
        <span class="absolute left-[27%] bottom-10 h-1 w-1 rounded-full bg-sky-300" />
        <span class="absolute right-[30%] bottom-16 h-1 w-1 rounded-full bg-sky-300" />
      </div>
      <div class="mx-auto max-w-7xl px-6 pb-8 pt-14 text-center sm:pb-10 sm:pt-16">
        <span class="inline-flex rounded-full border border-blue-300/40 bg-blue-300/20 px-3 py-1 text-[10px] font-bold tracking-wide text-blue-800">PORTFOLIO</span>
        <h1 class="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Featured <span class="bg-gradient-to-r from-blue-900 via-blue-700 to-sky-400 bg-clip-text text-transparent">Projects</span>
        </h1>
        <p class="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#aab8ca] sm:text-base">
            A selection of digital products and practical solutions I’ve worked on, from web platforms to mobile applications.
        </p>

        <nav aria-label="Filter projects by category" class="mt-6 flex flex-wrap justify-center gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            :aria-pressed="selectedCategory === cat"
            @click="selectedCategory = cat"
            :class="[
              'rounded-full border px-3.5 py-2 text-[11px] font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#172335]',
              selectedCategory === cat
                ? 'border-[#0ea5e9] bg-[#0ea5e9] text-white shadow-md shadow-sky-950/30'
                : 'border-white/10 bg-white/[0.04] text-[#bdc9d8] hover:border-sky-300/40 hover:text-white'
            ]"
          >
            {{ cat }}
          </button>
        </nav>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 pb-16 pt-3 sm:pb-20" aria-label="Project portfolio">
      <p v-if="pending" role="status" class="rounded-2xl border border-white/10 bg-[#202e42] p-6 text-sm text-[#aab8ca]">Loading projects...</p>
      <p v-else-if="error" role="alert" class="rounded-2xl border border-red-300/20 bg-red-400/10 p-6 text-sm text-red-200">Projects could not be loaded. Please try again later.</p>
      <p v-else-if="filteredProjects.length === 0" class="rounded-2xl border border-white/10 bg-[#202e42] p-6 text-sm text-[#aab8ca]">No projects in this category yet.</p>

      <div v-else class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#202d40] shadow-[0_12px_30px_rgba(3,10,20,0.18)] transition duration-300 hover:-translate-y-1 hover:border-sky-300/20 hover:shadow-[0_20px_40px_rgba(3,10,20,0.3)]"
        >
          <div :class="['relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br p-4 sm:h-48', gradients[index % gradients.length]]">
            <div class="absolute -right-12 -top-16 h-48 w-48 rounded-full border border-white/10" aria-hidden="true" />
            <div class="absolute -bottom-24 -left-12 h-56 w-56 rounded-full border border-white/10" aria-hidden="true" />
            <span class="absolute left-4 top-4 rounded-lg border border-white/15 bg-slate-950/25 px-2.5 py-1 font-mono text-[10px] font-bold text-white/90">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <span
              :class="[
                'absolute right-4 top-4 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider backdrop-blur',
                project.status === 'Completed'
                ? 'border-sky-200/25 bg-sky-300/15 text-sky-50'
                  : project.status === 'In Progress'
                    ? 'border-amber-200/25 bg-amber-300/15 text-amber-50'
                    : 'border-white/20 bg-white/10 text-white'
              ]"
            >
              {{ project.status }}
            </span>

            <div class="relative w-full max-w-md overflow-hidden rounded-xl border border-white/15 bg-slate-950/85 p-4 shadow-2xl backdrop-blur-md transition duration-300 group-hover:scale-[1.02]">
              <div class="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                <div class="flex items-center gap-1.5" aria-hidden="true">
                  <span class="h-2 w-2 rounded-full bg-blue-400" />
                  <span class="h-2 w-2 rounded-full bg-sky-300" />
                  <span class="h-2 w-2 rounded-full bg-sky-500" />
                </div>
                <span class="max-w-[65%] truncate font-mono text-[10px] text-[#aab8ca]">{{ project.category }}</span>
              </div>
              <span class="mb-1 block text-[9px] font-bold uppercase tracking-[0.16em] text-sky-300">DIGITAL PRODUCT</span>
              <strong class="block truncate text-base font-bold text-white sm:text-lg">{{ project.title }}</strong>
              <div class="mt-4 flex gap-2" aria-hidden="true">
                <span class="h-1.5 w-2/3 rounded-full bg-white/20" />
                <span class="h-1.5 w-1/4 rounded-full bg-sky-300/50" />
              </div>
            </div>
          </div>

          <div class="flex flex-1 flex-col p-4 sm:p-5">
            <div class="mb-2 flex items-center gap-2">
              <span :class="['rounded-full border px-2 py-0.5 text-[9px] font-bold', getAccent(index).badge]">{{ project.category }}</span>
            </div>
            <h2 class="text-lg font-black tracking-tight text-white">{{ project.title }}</h2>
            <p class="mt-2 flex-1 text-xs leading-6 text-[#aab8ca]">{{ project.description }}</p>

            <div class="mt-4 border-t border-white/[0.07] pt-3">
              <span class="mb-2 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#8191a8]">BUILT WITH</span>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in getProjectTags(project)"
                  :key="tag"
                  class="rounded-md border border-white/[0.07] bg-white/[0.04] px-2 py-1 text-[9px] font-bold text-[#bdc9d8]"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div v-if="project.url || project.githubUrl" class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-3">
              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Open ${project.title} live demo in a new tab`"
                :class="['inline-flex items-center gap-1.5 text-[11px] font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#202d40]', getAccent(index).link]"
              >
                <span>Live Demo</span><span aria-hidden="true">↗</span>
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`View ${project.title} on GitHub in a new tab`"
                class="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.05] px-2 py-1.5 text-[10px] font-semibold text-[#bdc9d8] transition hover:border-white/20 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#202d40]"
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