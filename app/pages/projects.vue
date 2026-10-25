<script setup lang="ts">
import { ref, computed } from 'vue'

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
}

const { data: projects, pending, error } = await useFetch<Project[]>('/api/projects', {
  default: () => []
})
const selectedCategory = ref('All')
const categories = computed(() => ['All', ...new Set(projects.value.map(project => project.category).filter(Boolean))])
const gradients = [
  'from-emerald-950 via-slate-900 to-slate-950',
  'from-blue-950 via-slate-900 to-slate-950',
  'from-indigo-950 via-slate-900 to-slate-950',
  'from-amber-950 via-slate-900 to-slate-950'
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') return projects.value
  return projects.value.filter(project => project.category === selectedCategory.value)
})

const getProjectTags = (project: Project) => {
  return project.tech.split(/[+,]/).map(tag => tag.trim()).filter(Boolean)
}

const scrollToTop = () => {
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">

    <!-- ==========================================
     
        <NuxtLink
          to="/#contact"
          class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5"
        >
          <span>Contact</span>
          <span class="text-xs">✈</span>
        </NuxtLink>

      </div>
    </header>

    <!-- ==========================================
         PROJECTS MAIN CONTENT
    =========================================== -->
    <main class="py-16">
      <div class="max-w-7xl mx-auto px-6">

        <!-- Top Title & Subtitle (ከምስሉ 5 ጋር አንድ ዓይነት) -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span class="text-blue-600 font-extrabold text-xs tracking-wider uppercase mb-2 block">MY PROJECTS</span>
            <h1 class="text-3xl sm:text-4xl font-black text-slate-900">Featured Projects</h1>
            <p class="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Here are some of the projects I've worked on. Each project represents my passion for building useful and impactful solutions.
            </p>
          </div>

          <!-- Category Filter Pills -->
          <div class="flex flex-wrap items-center gap-2">
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              @click="selectedCategory = cat"
              :class="[
                'px-4 py-2 rounded-xl text-xs font-bold transition',
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- ==========================================
             PROJECTS GRID (ከምስሉ 5 ጋር አንድ ዓይነት ካርዶች)
        =========================================== -->
        <p v-if="pending" class="text-sm text-slate-500">Loading projects...</p>
        <p v-else-if="error" class="text-sm text-red-600">Projects could not be loaded.</p>
        <p v-else-if="filteredProjects.length === 0" class="text-sm text-slate-500">No projects in this category yet.</p>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <!-- Mockup Screen Visual Container -->
              <div :class="['relative h-64 p-6 flex items-center justify-center bg-gradient-to-br', gradients[index % gradients.length]]">
                
                <!-- Number Badge (01, 02) -->
                <span class="absolute top-4 left-4 bg-blue-600 text-white font-black text-xs px-2.5 py-1 rounded-md shadow">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>

                <!-- Realistic Mockup Window -->
                <div class="w-full max-w-sm bg-slate-950/90 rounded-2xl border border-white/10 p-5 shadow-2xl backdrop-blur-sm">
                  <div class="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <div class="flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    </div>
                    <span class="text-[10px] text-slate-400 font-mono tracking-tight">{{ project.title.toLowerCase().replace(/\s+/g, '') }}.app</span>
                  </div>

                  <span class="text-[10px] text-blue-400 font-extrabold tracking-wider uppercase block mb-1">
                    {{ project.category }}
                  </span>
                  <strong class="text-white text-base font-bold block truncate">{{ project.title }}</strong>

                  <div class="flex flex-col gap-1.5 mt-4">
                    <span class="h-2 w-3/4 rounded-full bg-white/10"></span>
                    <span class="h-2 w-1/2 rounded-full bg-white/10"></span>
                  </div>
                </div>

              </div>

              <!-- Content Body -->
              <div class="p-8">
                <!-- Category Label -->
                <span class="text-blue-600 font-extrabold text-[11px] tracking-wider uppercase block mb-1">
                  {{ project.category }}
                </span>

                <!-- Project Title -->
                <h2 class="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                  {{ project.title }}
                </h2>

                <!-- Description -->
                <p class="text-slate-600 text-sm leading-relaxed mb-6">
                  {{ project.description }}
                </p>

                <!-- Tags (Pills) -->
                <div class="flex flex-wrap gap-2 mb-8">
                  <span
                    v-for="tag in getProjectTags(project)"
                    :key="tag"
                    class="px-3 py-1 bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-bold rounded-lg"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Footer Action Buttons -->
            <div class="px-8 pb-8 pt-0 flex items-center gap-3">
              <!-- Live Demo Button -->
              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-md shadow-blue-600/20"
              >
                <span>Live Demo</span>
                <span>↗</span>
              </a>

              <!-- GitHub Button -->
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 bg-white border border-slate-300 hover:border-slate-800 text-slate-800 font-bold text-xs px-5 py-2.5 rounded-xl transition hover:bg-slate-50"
              >
                <span>GitHub</span>
                <span>↗</span>
              </a>
            </div>

          </article>
        </div>

      </div>
    </main>

    <!-- ==========================================
         8. FOOTER (ከምስሉ 8 ጋር አንድ ዓይነት)
    =========================================== -->
    <footer id="contact" class="bg-[#0c1527] border-t border-slate-800 text-white py-10 mt-20">
      <div class="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <!-- Brand & Copyright -->
        <div class="flex items-center gap-4">
          <span class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs">
            DZ
          </span>
          <div>
            <strong class="font-extrabold text-sm block tracking-wide">Daniel Zigabe</strong>
            <span class="text-xs text-slate-400">© 2025 Daniel Zigabe Minda. All rights reserved.</span>
          </div>
        </div>

        <!-- Social Icons & Scroll To Top -->
        <div class="flex items-center gap-5 text-lg">
          <a href="https://github.com/danielzigabe" target="_blank" class="text-slate-400 hover:text-white transition">🐙</a>
          <a href="https://linkedin.com/in/danielzigabe" target="_blank" class="text-slate-400 hover:text-white transition">💼</a>
          <a href="https://t.me/danielzigabe" target="_blank" class="text-slate-400 hover:text-white transition">✈</a>
          <a href="mailto:danielzigabe5@gmail.com" class="text-slate-400 hover:text-white transition">✉</a>

          <!-- Blue Round Scroll Top Button -->
          <button
            type="button"
            @click="scrollToTop"
            class="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition transform hover:-translate-y-1 ml-2 text-xs font-black"
            title="Scroll to Top"
          >
            ▲
          </button>
        </div>

      </div>
    </footer>

  </div>
</template>