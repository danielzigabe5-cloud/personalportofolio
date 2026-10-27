<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vue-router'
import heroImg from '~/assets/images/photo.jpg'

const menuOpen = ref(false)
const topBarHidden = ref(false)
const route = useRoute()
const { data: profile } = await useProfile()
const authToken = useCookie('auth_token')
const phoneHref = computed(() => `tel:${profile.value.phone.replace(/[^\d+]/g, '')}`)
const adminDestination = computed(() => authToken.value ? '/admin' : '/admin/login')
const adminLinkLabel = computed(() => authToken.value ? 'Admin Dashboard' : 'Login')

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Education', path: '/education' },
  { name: 'Contact', path: '/contact' }
]

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
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

const handleScroll = () => {
  topBarHidden.value = window.scrollY > 24
}

// ✅ Menu በ route ሲቀየር ይዘጋል
watch(
  () => route.fullPath,
  () => {
    closeMenu()
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
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  window.removeEventListener('scroll', handleScroll)
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <!-- =====================================================
       NAVBAR
  ====================================================== -->
  <header
    class="fixed inset-x-0 top-0 z-50 border-b border-[#c2ded9] bg-[#f3f9f8]/95 shadow-lg shadow-[#174b45]/5 backdrop-blur-xl"
  >
    <!-- TOP CONTACT BAR -->
    <div
      class="overflow-hidden border-b border-white/10 bg-[#174b45] text-[#e8f4f2] shadow-sm transition-[max-height,opacity] duration-300 ease-in-out"
      :class="topBarHidden ? 'max-h-0 opacity-0' : 'max-h-[46px] opacity-100'"
    >
      <div
        class="mx-auto flex h-[46px] max-w-[1400px] items-center justify-between gap-3 px-5 text-xs font-semibold sm:px-6 lg:px-8"
      >
        <div class="flex min-w-0 items-center gap-3 sm:gap-6">
          <a
            :href="`mailto:${profile.email}`"
            class="flex min-w-0 items-center gap-2 transition-colors duration-200 hover:text-[#9be8dc]"
            :aria-label="`Email ${profile.name}`"
          >
            <svg
              class="h-3.5 w-3.5 shrink-0 text-[#9be8dc]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16v12H4z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="m4 7 8 6 8-6" />
            </svg>
            <span class="hidden truncate sm:inline">{{ profile.email }}</span>
          </a>

          <a
            :href="phoneHref"
            class="hidden items-center gap-2 transition-colors duration-200 hover:text-[#9be8dc] md:flex"
            :aria-label="`Call ${profile.name}`"
          >
            <svg
              class="h-3.5 w-3.5 text-[#9be8dc]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 3h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"
              />
            </svg>
            {{ profile.phone }}
          </a>

          <span class="hidden items-center gap-2 lg:flex">
            <svg
              class="h-3.5 w-3.5 text-[#9be8dc]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
              />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {{ profile.location }}
          </span>
        </div>

        <div class="flex shrink-0 items-center gap-1" aria-label="Social media links">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.href"
            :aria-label="social.name"
            :title="social.name"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-[#9be8dc] hover:text-[#174b45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9be8dc]"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path :d="social.iconPath" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- MAIN NAV -->
    <nav
      class="relative mx-auto flex h-[74px] max-w-[1400px] items-center justify-between px-5 sm:px-6 lg:px-8"
      aria-label="Main navigation"
    >
      <NuxtLink to="/" class="group z-10 flex min-w-0 items-center gap-3" :aria-label="`${profile.name} — Home`">
        <div
          class="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border-2 border-white bg-[#e8f4f2] shadow-md shadow-[#174b45]/10 ring-2 ring-[#c2ded9] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg"
        >
          <img :src="profile.avatarUrl || heroImg" alt="" class="h-full w-full object-cover object-top" />
          <span
            class="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#168b7d]"
            aria-hidden="true"
          />
        </div>

        <div class="min-w-0 max-w-[190px]">
          <div class="truncate whitespace-nowrap text-sm font-extrabold leading-tight tracking-tight text-[#174b45] transition-colors group-hover:text-[#168b7d] sm:text-lg">
            {{ profile.name }}
          </div>
        </div>
      </NuxtLink>

      <div class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 xl:flex 2xl:gap-2">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-[#66827e] transition-colors duration-200 hover:bg-[#e8f4f2] hover:text-[#168b7d] 2xl:text-[0.95rem]"
          active-class="bg-[#e8f4f2] text-[#168b7d]"
          exact-active-class="bg-[#e8f4f2] text-[#168b7d]"
        >
          {{ item.name }}
        </NuxtLink>
      </div>

      <NuxtLink
        :to="adminDestination"
        class="absolute right-5 hidden h-10 items-center justify-center gap-2 rounded-full bg-[#168b7d] px-5 text-sm font-semibold text-white shadow-md shadow-[#168b7d]/20 transition-colors duration-200 hover:bg-[#11776c] xl:flex sm:right-6 lg:right-8"
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
        class="ml-auto flex h-11 w-11 items-center justify-center rounded-xl border border-[#c2ded9] bg-white text-[#174b45] shadow-sm transition-colors duration-200 hover:bg-[#e8f4f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168b7d] xl:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
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
    </nav>

    <!-- MOBILE NAVIGATION (smooth max-height) -->
    <Transition
      enter-active-class="overflow-hidden transition-all duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[1000px] opacity-100"
      leave-active-class="overflow-hidden transition-all duration-200 ease-in"
      leave-from-class="max-h-[1000px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div
        v-if="menuOpen"
        id="mobile-menu"
        class="max-h-[calc(100dvh-7.5rem)] overflow-y-auto border-t border-[#c2ded9] bg-[#f3f9f8] shadow-lg xl:hidden"
      >
        <div class="mx-auto max-w-7xl px-5 pb-6 pt-4">
          <!-- MOBILE LINKS -->
          <div class="space-y-1">
            <NuxtLink
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-[#66827e] transition-colors duration-200 hover:bg-[#e8f4f2] hover:text-[#168b7d]"
              active-class="bg-[#e8f4f2] text-[#168b7d]"
            >
              <span>{{ item.name }}</span>
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <!-- SOCIALS -->
          <div class="mt-5 border-t border-[#c2ded9] pt-4">
            <p class="mb-3 px-4 text-xs font-bold uppercase tracking-wider text-[#66827e]">
              Find me online
            </p>
            <div class="flex flex-wrap gap-2 px-4">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-lg border border-[#c2ded9] px-3 py-2 text-sm font-semibold text-[#66827e] transition-colors duration-200 hover:border-[#a8d2ca] hover:bg-[#e8f4f2] hover:text-[#168b7d]"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path :d="social.iconPath" />
                </svg>
                {{ social.name }}
              </a>
            </div>
          </div>

          <!-- LET'S TALK -->
          <NuxtLink
            to="/contact"
            class="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#168b7d] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#11776c]"
          >
            <span>Let's Talk</span>
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>

          <!-- LOGIN -->
          <NuxtLink
            :to="adminDestination"
            class="mt-3 flex items-center justify-center gap-2 rounded-xl border border-[#c2ded9] bg-[#f3f9f8] px-5 py-3.5 text-sm font-semibold text-[#168b7d] transition-colors duration-200 hover:bg-[#e8f4f2]"
          >
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 17l5-5-5-5" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H3" />
            </svg>
            <span>{{ adminLinkLabel }}</span>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>

  <!-- Spacer: fixed header ገጹን እንዳይሸፍን -->
  <div
    class="transition-[height] duration-300"
    :class="topBarHidden ? 'h-[74px]' : 'h-[120px]'"
    aria-hidden="true"
  />
</template>