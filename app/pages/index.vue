<script setup lang="ts">
import profileImg from '~/assets/images/daniel.jpg'

const skills = [
  'Nuxt.js',
  'Laravel',
  'Flutter',
  'Vue.js',
  'Tailwind CSS',
  'MySQL'
]

const projects = [
  {
    title: 'CombolojoSPORT',
    description: 'Sports venue booking platform for Ethiopia.',
    image: '/images/combolojo.jpg',
    tags: ['Nuxt', 'Laravel', 'Flutter']
  },
  {
    title: 'Internship Attendance System',
    description: 'Student, Advisor and Company management system.',
    image: '/images/internship.jpg',
    tags: ['Nuxt', 'Laravel', 'MySQL']
  }
]
</script>

<template>
  <div class="bg-gray-950 text-white min-h-screen font-sans">
    
    <!-- HERO SECTION -->
    <section class="py-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
      <div class="flex-1 space-y-6">
        <span class="text-emerald-400 font-semibold tracking-wider text-sm uppercase">
          Hello, I'm
        </span>

        <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight">
          Daniel<span class="text-emerald-400">Zigabe</span>
        </h1>

        <h2 class="text-2xl md:text-3xl font-medium text-gray-300">
          Frontend Developer
        </h2>

        <p class="text-gray-400 leading-relaxed text-lg max-w-xl">
          I build modern, responsive and user-friendly web applications that
          solve real problems and create great user experiences.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-4 pt-4">
          <NuxtLink
            to="/projects"
            class="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-gray-950 font-bold rounded-lg transition duration-200 shadow-lg shadow-emerald-500/20"
          >
            View My Projects →
          </NuxtLink>

          <a
            href="/cv/Alemu-Mekete-CV.pdf"
            download
            class="px-6 py-3 border border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400 font-semibold rounded-lg transition duration-200"
          >
            ↓ Download CV
          </a>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
          <div>
            <strong class="block text-3xl font-extrabold text-white">7+</strong>
            <span class="text-sm text-gray-400">Projects Completed</span>
          </div>

          <div>
            <strong class="block text-3xl font-extrabold text-white">1+</strong>
            <span class="text-sm text-gray-400">Year Experience</span>
          </div>

          <div>
            <strong class="block text-3xl font-extrabold text-white">100%</strong>
            <span class="text-sm text-gray-400">Passion</span>
          </div>
        </div>
      </div>

      <!-- Hero Profile Image -->
      <div class="relative flex items-center justify-center">
        <div class="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-emerald-500/30 p-2 relative">
          <img
            :src="profileImg"
            alt="Daniel Zigabe"
            class="w-full h-full object-cover rounded-full shadow-2xl"
          />
          <div class="absolute -bottom-2 -right-2 bg-emerald-500 text-gray-950 font-mono font-bold px-3 py-1 rounded-full text-sm">
            &lt;/&gt;
          </div>
        </div>
      </div>
    </section>

    <!-- SKILLS SECTION -->
    <section class="py-16 bg-gray-900 border-y border-gray-800">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12">
          <span class="text-emerald-400 font-semibold text-xs tracking-widest uppercase">TECHNOLOGIES</span>
          <h2 class="text-3xl font-bold mt-2">My Main Skills</h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div
            v-for="skill in skills"
            :key="skill"
            class="p-4 bg-gray-800/60 border border-gray-700/50 rounded-xl flex flex-col items-center gap-2 hover:border-emerald-500/50 transition duration-300"
          >
            <span class="text-emerald-400 font-mono text-lg">&lt;/&gt;</span>
            <strong class="text-sm text-gray-200">{{ skill }}</strong>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED PROJECTS -->
    <section class="py-20 px-6 max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <span class="text-emerald-400 font-semibold text-xs tracking-widest uppercase">MY WORK</span>
        <h2 class="text-3xl font-bold mt-2">Featured Projects</h2>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <article
          v-for="project in projects"
          :key="project.title"
          class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition duration-300 flex flex-col"
        >
          <div class="h-48 bg-gray-800 relative overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h3 class="text-xl font-bold text-white mb-2">{{ project.title }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed">{{ project.description }}</p>
            </div>

            <div class="flex flex-wrap gap-2 pt-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-md border border-emerald-500/20"
              >
                {{ tag }}
              </span>
            </div>

            <NuxtLink
              to="/projects"
              class="inline-flex items-center text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition pt-2"
            >
              View Project →
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="py-16 px-6 max-w-4xl mx-auto my-12">
      <div class="bg-gradient-to-r from-emerald-950 to-gray-900 border border-emerald-500/30 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">Let's work together!</h2>
          <p class="text-gray-400 text-sm">I'm always open to new opportunities and exciting projects.</p>
        </div>

        <NuxtLink
          to="/contact"
          class="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-gray-950 font-bold rounded-lg transition duration-200 whitespace-nowrap"
        >
          Contact Me →
        </NuxtLink>
      </div>
    </section>

  </div>
</template>