<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import heroImg from '~/assets/images/photo.jpg'

interface AboutProfile {
  name: string
  email: string
  role: string
  location: string
  aboutHeadline: string
  bio: string
  aboutDetails: string
  avatarUrl: string | null
}

const profile = reactive<AboutProfile>({
  name: 'Daniel Zigabe',
  email: 'danielzigabe5@gmail.com',
  role: 'Full-Stack & Mobile Developer',
  location: 'Ethiopia',
  aboutHeadline: 'Thoughtful software, built for people.',
  bio: "I'm a computer science student and software developer focused on useful, reliable web and mobile products.",
  aboutDetails: 'I enjoy turning complex ideas into functional, user-friendly applications. I work closely with teams to build meaningful digital solutions and care about the details that make software dependable and easy to use. My core tools include Nuxt.js, Laravel, and Flutter. I keep learning new technologies to improve performance and make better products.',
  avatarUrl: null
})

onMounted(() => {
  const savedProfile = localStorage.getItem('portfolio_profile')
  if (!savedProfile) return

  try {
    Object.assign(profile, JSON.parse(savedProfile))
  } catch {
    return
  }
})

const values = [
  { icon: '</>', title: 'Clean Code', desc: 'Maintainable & Scalable' },
  { icon: '💡', title: 'Problem Solving', desc: 'Creative Solutions' },
  { icon: '👥', title: 'Team Player', desc: 'Work Better Together' },
  { icon: '📈', title: 'Continuous Learning', desc: 'Always Growing' }
]
</script>

<template>
  <section id="about" class="border-t border-slate-200 bg-white py-20 sm:py-24">
    <div class="mx-auto max-w-7xl px-6">
      <header class="mb-12 max-w-3xl sm:mb-16">
        <span class="mb-3 block text-xs font-extrabold uppercase tracking-wider text-blue-600">ABOUT ME</span>
        <h1 class="text-3xl font-black leading-tight text-slate-900 sm:text-5xl">{{ profile.aboutHeadline }}</h1>
        <p class="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
          {{ profile.bio }}
        </p>
      </header>

      <div class="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <aside class="lg:col-span-5">
          <figure class="relative overflow-hidden rounded-2xl border border-slate-200 bg-blue-50 p-3">
            <img
              :src="profile.avatarUrl || heroImg"
              :alt="`${profile.name}, ${profile.role}`"
              class="aspect-[4/5] w-full rounded-xl object-cover object-top"
            />
          </figure>
          <div class="mt-5 flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <strong class="block text-base font-black text-slate-900">{{ profile.name }}</strong>
              <span class="mt-1 block text-sm text-slate-500">{{ profile.role }}</span>
            </div>
            <span class="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{{ profile.location }}</span>
          </div>
        </aside>

        <div class="lg:col-span-7 lg:pt-2">
          <span class="text-xs font-bold uppercase tracking-wider text-blue-600">MY APPROACH</span>
          <h2 class="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">From a complex idea to a clear, useful product.</h2>
          <p class="mt-5 text-base leading-relaxed text-slate-600">
            {{ profile.aboutDetails }}
          </p>

          <ul class="mt-7 grid gap-3 border-y border-slate-200 py-5 text-sm font-semibold text-slate-700 sm:grid-cols-2">
            <li class="flex items-center gap-3">
              <span class="text-blue-600">✉</span>
              <span>{{ profile.email }}</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="h-2.5 w-2.5 rounded-full bg-green-500"></span>
              <span>Available for hire & freelance</span>
            </li>
          </ul>

          <div class="mt-7 flex flex-wrap gap-3">
            <a
              href="/Daniel%20Zigabe%20-%20Professional%20CV.pdf"
              download="Daniel_Zigabe_CV.pdf"
              class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <span>📥</span>
              <span>Download CV</span>
            </a>
            <a
              href="/Daniel%20Zigabe%20-%20Professional%20CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800 transition hover:bg-slate-50"
            >
              <span>👁️</span>
              <span>View CV</span>
            </a>
          </div>
        </div>
      </div>

      <section class="mt-16 border-t border-slate-200 pt-10 sm:mt-20 sm:pt-12">
        <div class="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600">HOW I WORK</span>
            <h2 class="mt-2 text-2xl font-black text-slate-900">Principles I bring to every project</h2>
          </div>
          <p class="max-w-md text-sm leading-relaxed text-slate-500">A practical approach to building and improving digital products.</p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="value in values" :key="value.title" class="border-l-2 border-blue-600 pl-4 py-1">
            <span class="text-xl font-bold text-blue-600">{{ value.icon }}</span>
            <h3 class="mt-3 text-sm font-black text-slate-900">{{ value.title }}</h3>
            <p class="mt-1 text-xs leading-relaxed text-slate-500">{{ value.desc }}</p>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>