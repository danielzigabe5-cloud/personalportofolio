<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vue-router'
import heroImg from '~/assets/images/photo.jpg'

const menuOpen = ref(false)
const aboutMenuOpen = ref(false)
const mobileAboutMenuOpen = ref(false)
const route = useRoute()
const { data: profile } = await useProfile()
const authToken = useCookie('auth_token')
const phoneHref = computed(() => `tel:${profile.value.phone.replace(/[^\d+]/g, '')}`)
const adminDestination = computed(() => authToken.value ? '/admin' : '/admin/login')
const adminLinkLabel = computed(() => authToken.value ? 'Admin Dashboard' : 'Login')

const homeItem = { name: 'Home', path: '/' }
const navItems = [
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Education', path: '/education' },
  { name: 'Contact', path: '/contact' }
]

const aboutItems = [
  { name: 'About', path: '/about' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Services', path: '/services' }
]
const isAboutItemActive = (path: string) =>
  route.path === path || route.path.startsWith(`${path}/`)
const activeAboutItem = computed(() => aboutItems.find(item => isAboutItemActive(item.path)))
const currentAboutItem = computed(() => activeAboutItem.value ?? aboutItems[0]!)
const aboutSectionActive = computed(() => Boolean(activeAboutItem.value))

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/danielzigabe',
    iconPath:
      'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.36-1.18-3.36-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.21-.25-4.54-1.11-4.54-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.57 9.57 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.33 4.69-4.55 4.93.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/danielzigabe',
    iconPath:
      'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 9h3.55v11.45H3.56V9ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z'
  },
  {
    name: 'Telegram',
    href: 'https://t.me/danielzigabe',
    iconPath:
      'M22.5 2.2 19.1 21c-.26 1.33-.97 1.66-1.97 1.03l-5.45-4.02-2.63 2.53c-.29.29-.53.53-1.09.53l.39-5.55L18.46 7.2c.43-.38-.09-.6-.67-.22L6.52 14.16l-5.4-1.69c-1.17-.37-1.2-1.17.24-1.73L21.2 2.38c.97-.36 1.82.24 1.3-.18Z'
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@danielzigabe',
    iconPath:
      'M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.06 1.72 4.15 1.09 1.1 2.62 1.62 4.11 1.79v4.01c-1.4-.05-2.8-.34-4.1-.94-.57-.25-1.1-.57-1.62-.9-.01 2.77.01 5.54-.02 8.31-.07 1.33-.51 2.65-1.28 3.74-1.24 1.82-3.39 3.01-5.6 3.05-1.36.08-2.72-.29-3.88-.99-1.93-1.17-3.28-3.31-3.32-5.59-.12-1.4.26-2.8.98-4.01 1.15-2 3.36-3.29 5.67-3.33.24-.02.48-.02.72 0v4.13c-1.18-.04-2.44.34-3.3 1.2-.63.58-.98 1.47-.89 2.32.15 1.04.9 1.97 1.88 2.34.65.25 1.39.32 2.07.14.84-.2 1.58-.77 1.99-1.53.13-.23.22-.48.3-.73.07-1.25.03-2.51.04-3.76.01-2.82-.01-5.64.02-8.46z'
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@danielzigabe',
    iconPath:
      'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.376.55A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.5 12 20.5 12 20.5s7.505 0 9.376-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z'
  }
]

const closeMenu = () => {
  menuOpen.value = false
  mobileAboutMenuOpen.value = false
  mobileAboutMenuOpen.value = false
}

const toggleMenu = () => {
  if (menuOpen.value) {
    closeMenu()
    return
  }

  menuOpen.value = true
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu()
    aboutMenuOpen.value = false
  }
}

// ✅ Menu በ route ሲቀየር ይዘጋል
watch(
  () => route.fullPath,
  () => {
    closeMenu()
    aboutMenuOpen.value = false
  }
)

// ✅ Menu ክፍት ሆኖ ሳለ body scroll ይቆለፋል
watch(menuOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <!-- =====================================================
       NAVBAR
  ====================================================== -->
  <header class="border-b border-[var(--portfolio-border)] bg-white shadow-lg shadow-[#172b4d]/5">
    <div class="bg-[var(--portfolio-deep)] text-white">
      <div class="mx-auto flex h-11 max-w-[1400px] items-center justify-between gap-3 px-5 text-xs font-semibold sm:px-6 lg:px-8">
        <span class="truncate">Welcome to {{ profile.name }}’s portfolio</span>
        <div class="flex shrink-0 items-center gap-1" aria-label="Social media links">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.href"
            :aria-label="social.name"
            :title="social.name"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[var(--portfolio-deep)] transition-colors duration-200 hover:bg-[var(--portfolio-accent)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path :d="social.iconPath" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="bg-white">
      <div class="mx-auto flex min-h-[104px] max-w-[1400px] items-center justify-between gap-6 px-5 py-4 sm:px-6 lg:px-8">
        <NuxtLink to="/" class="group flex min-w-0 shrink-0 items-center gap-3" :aria-label="`${profile.name} — Home`">
          <div class="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-white bg-[var(--portfolio-surface-raised)] shadow-md shadow-[#172b4d]/10 ring-2 ring-[var(--portfolio-border)] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
            <img :src="profile.avatarUrl || heroImg" alt="" class="h-full w-full object-cover object-top" />
            <span class="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-[var(--portfolio-accent)]" aria-hidden="true" />
          </div>
          <span class="max-w-[190px] truncate text-base font-extrabold tracking-tight text-[var(--portfolio-text)] transition-colors group-hover:text-[var(--portfolio-accent)] sm:text-lg">
            {{ profile.name }}
          </span>
        </NuxtLink>

        <div class="hidden items-center divide-x divide-[var(--portfolio-border)] lg:flex">
          <a :href="phoneHref" class="flex items-center gap-3 px-5 text-[var(--portfolio-text)] transition-colors hover:text-[var(--portfolio-accent)]" :aria-label="`Call ${profile.name}`">
            <svg class="h-8 w-8 shrink-0 text-[var(--portfolio-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 3h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
            </svg>
            <span class="flex flex-col gap-1">
              <strong class="text-sm font-extrabold">Call me</strong>
              <span class="text-sm text-[var(--portfolio-muted)]">{{ profile.phone }}</span>
            </span>
          </a>
          <a :href="`mailto:${profile.email}`" class="flex items-center gap-3 px-5 text-[var(--portfolio-text)] transition-colors hover:text-[var(--portfolio-accent)]" :aria-label="`Email ${profile.name}`">
            <svg class="h-8 w-8 shrink-0 text-[var(--portfolio-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16v12H4z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="m4 7 8 6 8-6" />
            </svg>
            <span class="flex min-w-0 flex-col gap-1">
              <strong class="text-sm font-extrabold">Email me</strong>
              <span class="max-w-[220px] truncate text-sm text-[var(--portfolio-muted)]">{{ profile.email }}</span>
            </span>
          </a>
          <div class="flex items-center gap-3 px-5 text-[var(--portfolio-text)]">
            <svg class="h-8 w-8 shrink-0 text-[var(--portfolio-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span class="flex max-w-[210px] flex-col gap-1">
              <strong class="text-sm font-extrabold">Location</strong>
              <span class="text-sm text-[var(--portfolio-muted)]">{{ profile.location }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>

    <!-- MAIN NAV -->
    <nav
      class="sticky top-0 z-50 bg-[var(--portfolio-accent)] text-white shadow-md shadow-[#172b4d]/10"
      aria-label="Main navigation"
    >
      <div class="relative mx-auto flex h-[74px] max-w-[1400px] items-center justify-between px-5 sm:px-6 lg:px-8">
      <div class="ml-auto hidden items-center gap-1 xl:flex 2xl:gap-2">
        <NuxtLink
          :to="homeItem.path"
          class="relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-white/95 transition-colors duration-200 hover:bg-white/15 hover:text-white 2xl:text-[0.95rem]"
          active-class="bg-white/20 text-white"
          exact-active-class="bg-white/20 text-white"
        >
          {{ homeItem.name }}
        </NuxtLink>
        <div class="relative inline-flex items-center">
          <NuxtLink
            :to="currentAboutItem.path"
            class="relative whitespace-nowrap rounded-l-full py-2 pl-3 pr-1 text-sm font-semibold text-white/95 transition-colors duration-200 hover:bg-white/15 hover:text-white 2xl:text-[0.95rem]"
            :class="aboutSectionActive ? 'bg-white/20 text-white' : ''"
            active-class="bg-white/20 text-white"
          >
            {{ currentAboutItem.name }}
          </NuxtLink>
          <button
            type="button"
            class="relative inline-flex items-center rounded-r-full py-2 pl-1 pr-3 text-sm font-semibold text-white/95 transition-colors duration-200 hover:bg-white/15 hover:text-white 2xl:text-[0.95rem]"
            :class="aboutSectionActive ? 'bg-white/20 text-white' : ''"
            :aria-expanded="aboutMenuOpen"
            aria-haspopup="true"
            aria-controls="about-dropdown"
            :aria-label="`Toggle ${currentAboutItem.name} menu`"
            @click="aboutMenuOpen = !aboutMenuOpen"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path v-if="!aboutMenuOpen" d="M12 5v14" />
            </svg>
          </button>
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="-translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-1 opacity-0"
          >
            <div
              v-if="aboutMenuOpen"
              id="about-dropdown"
              class="absolute left-0 top-full z-50 mt-2 min-w-44 rounded-xl border border-[var(--portfolio-border)] bg-white p-2 text-[var(--portfolio-text)] shadow-xl shadow-[#172b4d]/10"
            >
              <NuxtLink
                v-for="item in aboutItems"
                :key="item.path"
                :to="item.path"
                class="block rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[var(--portfolio-surface-raised)] hover:text-[var(--portfolio-accent)]"
                :class="isAboutItemActive(item.path) ? 'bg-[var(--portfolio-surface-raised)] text-[var(--portfolio-accent)]' : 'text-[var(--portfolio-muted)]'"
                :aria-current="isAboutItemActive(item.path) ? 'page' : undefined"
              >
                {{ item.name }}
              </NuxtLink>
            </div>
          </Transition>
        </div>
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-white/95 transition-colors duration-200 hover:bg-white/15 hover:text-white 2xl:text-[0.95rem]"
          active-class="bg-white/20 text-white"
          exact-active-class="bg-white/20 text-white"
        >
          {{ item.name }}
        </NuxtLink>
      </div>

      <NuxtLink
        :to="adminDestination"
        class="ml-6 hidden h-10 items-center justify-center gap-2 rounded-full bg-[var(--portfolio-deep)] px-5 text-sm font-semibold text-white shadow-md shadow-[#172b4d]/20 transition-colors duration-200 hover:bg-[var(--portfolio-accent-hover)] xl:inline-flex"
        :aria-label="adminLinkLabel"
      >
        <svg
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 17l5-5-5-5" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H3" />
        </svg>
        <span>{{ adminLinkLabel }}</span>
      </NuxtLink>

      <!-- MOBILE MENU TOGGLE -->
      <button
        type="button"
        class="ml-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/70 bg-[var(--portfolio-accent)] text-white shadow-md shadow-[#172b4d]/20 transition-colors duration-200 hover:bg-[var(--portfolio-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white xl:flex"
        :aria-expanded="menuOpen"
        aria-controls="site-menu-drawer"
        :aria-label="menuOpen ? 'Close navigation menu' : 'Open navigation menu'"
        @click="toggleMenu"
      >
        <svg
          v-if="!menuOpen"
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      </div>

    <!-- MOBILE OFF-CANVAS MENU -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="menuOpen" class="fixed inset-0 z-[60]">
        <button
          type="button"
          class="absolute inset-0 h-full w-full bg-slate-950/60"
          aria-label="Close navigation menu"
          @click="closeMenu"
        />
        <Transition
          appear
          enter-active-class="transition-transform duration-300 ease-out"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition-transform duration-250 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <aside
            id="site-menu-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Contact and navigation menu"
            class="absolute inset-y-0 right-0 flex w-[min(84vw,340px)] flex-col overflow-y-auto bg-[var(--portfolio-surface)] text-[var(--portfolio-text)] shadow-2xl xl:w-[min(90vw,420px)]"
          >
            <div class="flex justify-end px-6 pt-5">
              <button
                type="button"
                class="flex h-10 w-10 items-center justify-center rounded-full text-[var(--portfolio-text)] transition hover:bg-[var(--portfolio-surface-raised)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-accent)]"
                aria-label="Close navigation menu"
                @click="closeMenu"
              >
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div class="flex items-center gap-4 px-8 pt-3 xl:hidden">
              <img
                :src="profile.avatarUrl || heroImg"
                :alt="profile.name"
                class="h-16 w-16 shrink-0 rounded-xl object-cover object-top ring-2 ring-[var(--portfolio-border)]"
              >
              <div class="min-w-0">
                <p class="truncate font-extrabold text-[var(--portfolio-text)]">{{ profile.name }}</p>
                <p class="mt-1 text-sm text-[var(--portfolio-muted)]">{{ profile.role }}</p>
              </div>
            </div>

            <div class="hidden px-8 pb-7 pt-8">
              <p class="text-sm leading-7 text-[var(--portfolio-muted)]">{{ profile.bio }}</p>
              <div class="mt-8 space-y-6">
                <div class="flex items-center gap-4">
                  <svg class="h-7 w-7 shrink-0 text-[var(--portfolio-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <div class="min-w-0">
                    <p class="text-sm font-bold text-[var(--portfolio-text)]">Location</p>
                    <p class="text-sm text-[var(--portfolio-muted)]">{{ profile.location }}</p>
                  </div>
                </div>
                <a :href="phoneHref" class="flex items-center gap-4 hover:text-[var(--portfolio-accent)]">
                  <svg class="h-7 w-7 shrink-0 text-[var(--portfolio-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 3h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
                  </svg>
                  <span class="min-w-0">
                    <span class="block text-sm font-bold text-[var(--portfolio-text)]">Call me</span>
                    <span class="block text-sm text-[var(--portfolio-muted)]">{{ profile.phone }}</span>
                  </span>
                </a>
                <a :href="`mailto:${profile.email}`" class="flex items-center gap-4 hover:text-[var(--portfolio-accent)]">
                  <svg class="h-7 w-7 shrink-0 text-[var(--portfolio-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16v12H4z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4 7 8 6 8-6" />
                  </svg>
                  <span class="min-w-0">
                    <span class="block text-sm font-bold text-[var(--portfolio-text)]">Email me</span>
                    <span class="block truncate text-sm text-[var(--portfolio-muted)]">{{ profile.email }}</span>
                  </span>
                </a>
              </div>
            </div>

            <section class="hidden flex-1 flex-col items-center overflow-y-auto px-8 pb-8 pt-2 text-center xl:flex" aria-label="Profile and contact information">
              <img
                :src="profile.avatarUrl || heroImg"
                :alt="profile.name"
                class="h-28 w-28 rounded-2xl object-cover object-top ring-2 ring-[var(--portfolio-border)]"
              >
              <h2 class="mt-5 text-lg font-extrabold text-[var(--portfolio-text)]">{{ profile.name }}</h2>
              <p class="mt-1 text-sm text-[var(--portfolio-muted)]">{{ profile.role }}</p>
              <p class="mt-6 text-left text-sm leading-6 text-[var(--portfolio-muted)]">{{ profile.bio }}</p>

              <div class="mt-8 w-full space-y-6 text-left">
                <div class="flex items-center gap-4">
                  <svg class="h-7 w-7 shrink-0 text-[var(--portfolio-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span class="min-w-0">
                    <span class="block font-bold text-[var(--portfolio-text)]">Location</span>
                    <span class="text-sm text-[var(--portfolio-muted)]">{{ profile.location }}</span>
                  </span>
                </div>
                <a :href="phoneHref" class="flex items-center gap-4 hover:text-[var(--portfolio-accent)]">
                  <svg class="h-7 w-7 shrink-0 text-[var(--portfolio-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 3h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
                  </svg>
                  <span class="min-w-0">
                    <span class="block font-bold text-[var(--portfolio-text)]">Call me</span>
                    <span class="text-sm text-[var(--portfolio-muted)]">{{ profile.phone }}</span>
                  </span>
                </a>
                <a :href="`mailto:${profile.email}`" class="flex items-center gap-4 hover:text-[var(--portfolio-accent)]">
                  <svg class="h-7 w-7 shrink-0 text-[var(--portfolio-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16v12H4z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4 7 8 6 8-6" />
                  </svg>
                  <span class="min-w-0">
                    <span class="block font-bold text-[var(--portfolio-text)]">Email me</span>
                    <span class="block truncate text-sm text-[var(--portfolio-muted)]">{{ profile.email }}</span>
                  </span>
                </a>
              </div>

              <div class="mt-8 w-full space-y-6">
                <NuxtLink
                  to="/contact"
                  class="flex items-center justify-center gap-2 rounded-xl bg-[var(--portfolio-accent)] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-900/20 transition hover:bg-[var(--portfolio-accent-hover)]"
                >
                  Contact me <span aria-hidden="true">→</span>
                </NuxtLink>
                <div class="flex flex-wrap justify-center gap-3" aria-label="Social media links">
                  <a
                    v-for="social in socialLinks"
                    :key="social.name"
                    :href="social.href"
                    :aria-label="social.name"
                    :title="social.name"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--portfolio-accent)] text-white transition-colors hover:bg-[var(--portfolio-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-accent)] focus-visible:ring-offset-2"
                  >
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path :d="social.iconPath" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>

            <nav class="flex-1 space-y-1 border-t border-[var(--portfolio-border)] px-4 py-4 xl:hidden" aria-label="Drawer navigation">
              <NuxtLink
                :to="homeItem.path"
                class="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-[var(--portfolio-muted)] transition-colors hover:bg-[var(--portfolio-surface-raised)] hover:text-[var(--portfolio-accent)]"
                active-class="bg-[var(--portfolio-surface-raised)] text-[var(--portfolio-accent)]"
                exact-active-class="bg-[var(--portfolio-surface-raised)] text-[var(--portfolio-accent)]"
              >
                {{ homeItem.name }} <span aria-hidden="true">→</span>
              </NuxtLink>

              <div class="flex items-center rounded-xl text-sm font-semibold text-[var(--portfolio-muted)] transition-colors hover:bg-[var(--portfolio-surface-raised)] hover:text-[var(--portfolio-accent)]" :class="aboutSectionActive ? 'bg-[var(--portfolio-surface-raised)] text-[var(--portfolio-accent)]' : ''">
                <NuxtLink :to="currentAboutItem.path" class="flex-1 rounded-l-xl px-4 py-3.5" active-class="text-[var(--portfolio-accent)]">
                  {{ currentAboutItem.name }}
                </NuxtLink>
                <button
                  type="button"
                  class="rounded-r-xl px-4 py-3.5"
                  :aria-expanded="mobileAboutMenuOpen"
                  aria-controls="mobile-about-dropdown"
                  :aria-label="`Toggle ${currentAboutItem.name} menu`"
                  @click="mobileAboutMenuOpen = !mobileAboutMenuOpen"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path v-if="!mobileAboutMenuOpen" d="M12 5v14" />
                  </svg>
                </button>
              </div>
              <Transition
                enter-active-class="overflow-hidden transition-all duration-200 ease-out"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-64 opacity-100"
                leave-active-class="overflow-hidden transition-all duration-150 ease-in"
                leave-from-class="max-h-64 opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <div v-if="mobileAboutMenuOpen" id="mobile-about-dropdown" class="ml-4 space-y-1 border-l border-[var(--portfolio-border)] pl-3">
                  <NuxtLink
                    v-for="item in aboutItems"
                    :key="item.path"
                    :to="item.path"
                    class="block rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--portfolio-surface-raised)] hover:text-[var(--portfolio-accent)]"
                    :class="isAboutItemActive(item.path) ? 'bg-[var(--portfolio-surface-raised)] text-[var(--portfolio-accent)]' : 'text-[var(--portfolio-muted)]'"
                    :aria-current="isAboutItemActive(item.path) ? 'page' : undefined"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </div>
              </Transition>

              <NuxtLink
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                class="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-[var(--portfolio-muted)] transition-colors hover:bg-[var(--portfolio-surface-raised)] hover:text-[var(--portfolio-accent)]"
                active-class="bg-[var(--portfolio-surface-raised)] text-[var(--portfolio-accent)]"
              >
                {{ item.name }} <span aria-hidden="true">→</span>
              </NuxtLink>
            </nav>

            <section class="space-y-5 border-t border-[var(--portfolio-border)] px-6 py-5 xl:hidden" aria-label="Contact details">
              <a :href="phoneHref" class="flex items-center gap-4 text-sm hover:text-[var(--portfolio-accent)]">
                <svg class="h-6 w-6 shrink-0 text-[var(--portfolio-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 3h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
                </svg>
                <span class="min-w-0">
                  <span class="block font-bold text-[var(--portfolio-text)]">Call me</span>
                  <span class="text-[var(--portfolio-muted)]">{{ profile.phone }}</span>
                </span>
              </a>
              <a :href="`mailto:${profile.email}`" class="flex items-center gap-4 text-sm hover:text-[var(--portfolio-accent)]">
                <svg class="h-6 w-6 shrink-0 text-[var(--portfolio-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16v12H4z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4 7 8 6 8-6" />
                </svg>
                <span class="min-w-0">
                  <span class="block font-bold text-[var(--portfolio-text)]">Email me</span>
                  <span class="block truncate text-[var(--portfolio-muted)]">{{ profile.email }}</span>
                </span>
              </a>
              <div class="flex items-center gap-4 text-sm">
                <svg class="h-6 w-6 shrink-0 text-[var(--portfolio-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span class="min-w-0">
                  <span class="block font-bold text-[var(--portfolio-text)]">Location</span>
                  <span class="text-[var(--portfolio-muted)]">{{ profile.location }}</span>
                </span>
              </div>
            </section>

            <div class="space-y-5 border-t border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-5 xl:hidden">
              <NuxtLink
                to="/contact"
                class="flex items-center justify-center gap-2 rounded-xl bg-[var(--portfolio-accent)] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-900/20 transition hover:bg-[var(--portfolio-accent-hover)]"
              >
                Contact me <span aria-hidden="true">→</span>
              </NuxtLink>
              <div class="flex flex-wrap justify-center gap-3" aria-label="Social media links">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.href"
                  :aria-label="social.name"
                  :title="social.name"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--portfolio-accent)] text-white transition-colors hover:bg-[var(--portfolio-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-accent)] focus-visible:ring-offset-2"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path :d="social.iconPath" />
                  </svg>
                </a>
              </div>
              <NuxtLink
                :to="adminDestination"
                class="flex items-center justify-center gap-2 rounded-xl border border-[var(--portfolio-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--portfolio-accent)] transition-colors hover:bg-[var(--portfolio-surface-raised)]"
              >
                {{ adminLinkLabel }}
              </NuxtLink>
            </div>
          </aside>
        </Transition>
      </div>
    </Transition>
    </nav>

</template>