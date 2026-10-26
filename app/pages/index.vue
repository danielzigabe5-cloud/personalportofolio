<script setup lang="ts">
import { computed } from 'vue'
import heroImg from '~/assets/images/photo.jpg'

const { data: profile } = await useProfile()
const profileNameParts = computed(() => profile.value.name.trim().split(/\s+/))
const firstName = computed(() => profileNameParts.value[0] || '')
const remainingName = computed(() => profileNameParts.value.slice(1).join(' '))

// የቴክኖሎጂ ክህሎቶች ዝርዝር
const techStack = [
  { name: 'Nuxt.js', icon: '💚' },
  { name: 'Laravel', icon: '🔴' },
  { name: 'Flutter', icon: '💙' },
  { name: 'Vue.js', icon: '🟢' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'MySQL / SQLite', icon: '🗄️' }
]

// የተመረጡ ዋና ዋና ፕሮጀክቶች
const featuredProjects = [
  {
    title: 'Combolojo (Ethiosport)',
    category: 'Sports Venue Booking Platform',
    desc: 'Sports venue booking platform and management system featuring Nuxt 4, Laravel API endpoints, and payment integrations.',
    link: '/projects'
  },
  {
    title: 'Internship Management System',
    category: 'Academic System',
    desc: 'Comprehensive system complete with software requirements specifications, architecture workflow diagrams, and presentation materials.',
    link: '/projects'
  }
]
</script>

<template>
  <div class="bg-white">
    <!-- HERO SECTION -->
    <section id="home" class="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 pt-6 pb-20 text-white">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- LEFT CONTENT (Col 7) -->
        <div class="lg:col-span-7">
          
          <!-- Status Badge -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-xs font-bold mb-6">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>Available for Hire</span>
          </div>

          <p class="text-white font-bold text-lg mb-1">Hello, I'm</p>

          <h1 class="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight mb-4">
            {{ firstName }} <span class="text-blue-100">{{ remainingName }}</span>
          </h1>

          <h2 class="text-xl sm:text-2xl font-bold text-blue-50 mb-6">
            {{ profile.role }}
          </h2>

          <p class="text-blue-50/90 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
            {{ profile.bio }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="/projects"
              class="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-700 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-950/20 transition transform hover:-translate-y-0.5"
            >
              <span>View My Projects</span>
              <span>→</span>
            </a>

            <a
              href="/Daniel%20Zigabe%20-%20Professional%20CV.pdf"
              download="Daniel_Zigabe_CV.pdf"
              class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/40 font-bold px-6 py-3.5 rounded-xl transition"
            >
              <span>📥</span>
              <span>Download CV</span>
            </a>

            <a
              href="/Daniel%20Zigabe%20-%20Professional%20CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/40 font-bold px-6 py-3.5 rounded-xl transition"
            >
              <span>👁️</span>
              <span>View CV</span>
            </a>
          </div>

          <!-- Social Links -->
          <div class="flex items-center gap-5 text-white text-xl">
            <a href="https://github.com/danielzigabe" target="_blank" class="hover:text-blue-100 transition">🐙</a>
            <a href="https://linkedin.com/in/danielzigabe" target="_blank" class="hover:text-blue-100 transition">💼</a>
            <a href="https://t.me/danielzigabe" target="_blank" class="hover:text-blue-100 transition">✈</a>
            <a :href="`mailto:${profile.email}`" class="hover:text-blue-100 transition">✉</a>
          </div>

        </div>

        <!-- RIGHT VISUAL (Col 5) -->
        <div class="lg:col-span-5 relative flex justify-center">
          
          <div class="relative w-80 h-96 sm:w-96 sm:h-[430px] rounded-[40px] bg-gradient-to-tr from-blue-300 to-indigo-400 overflow-hidden flex items-end justify-center shadow-2xl shadow-blue-950/30">
            <img
              :src="profile.avatarUrl || heroImg"
              :alt="profile.name"
              class="w-full h-full object-cover object-top"
            />
          </div>

          <div class="absolute -top-4 right-2 sm:right-6 pointer-events-none text-right">
            <span class="font-serif italic font-bold text-3xl sm:text-4xl text-white tracking-wide block">
              Build<br />Something<br /><span class="text-blue-100">Great</span>
            </span>
            <div class="w-20 h-1 bg-blue-600 rounded-full mt-2 ml-auto"></div>
          </div>

          <div class="absolute -bottom-6 right-0 bg-white border border-slate-100 rounded-2xl shadow-xl p-4 flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-green-500"></span>
            <div>
              <strong class="text-xs font-bold text-slate-900 block">Open to opportunities</strong>
              <span class="text-[11px] text-slate-500">Let's work together!</span>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- TECH STACK SECTION -->
    <section class="py-12 bg-slate-50 border-y border-slate-200">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h3 class="text-xs font-black tracking-widest text-slate-400 uppercase mb-8">
          Core Technologies & Tools
        </h3>
        <div class="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="flex items-center gap-2 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm font-bold text-slate-700 text-sm"
          >
            <span>{{ tech.icon }}</span>
            <span>{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED PROJECTS PREVIEW SECTION -->
    <section id="projects" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span class="text-blue-600 font-extrabold text-xs tracking-wider uppercase mb-2 block">PORTFOLIO</span>
            <h2 class="text-3xl sm:text-4xl font-black text-slate-900">Featured Projects</h2>
          </div>
          <NuxtLink to="/projects" class="mt-4 md:mt-0 font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
            View All Projects →
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="project in featuredProjects"
            :key="project.title"
            class="bg-slate-50 border border-slate-200 rounded-2xl p-8 transition hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <span class="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">{{ project.category }}</span>
              <h3 class="text-2xl font-black text-slate-900 mb-3">{{ project.title }}</h3>
              <p class="text-slate-600 text-sm leading-relaxed mb-6">{{ project.desc }}</p>
            </div>
            <NuxtLink :to="project.link" class="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-blue-600 transition">
              <span>Learn More</span>
              <span>→</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CALL TO ACTION (CTA) SECTION -->
    <section class="py-16 bg-slate-900 text-white">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl">
        <div>
          <span class="text-blue-400 font-extrabold text-xs tracking-widest uppercase block mb-2">LET'S CONNECT</span>
          <h2 class="text-3xl sm:text-4xl font-black">Have a project or idea in mind?</h2>
        </div>
        <NuxtLink
          to="/contact"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition whitespace-nowrap"
        >
          Get In Touch ↗
        </NuxtLink>
      </div>
    </section>

  </div>
</template>