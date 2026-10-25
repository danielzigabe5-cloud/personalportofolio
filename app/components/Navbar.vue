<script setup lang="ts">

import { ref, onMounted, onBeforeUnmount } from 'vue'
import heroImg from '~/assets/images/photo.jpg'

const menuOpen = ref(false)

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
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
    iconPath: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.36-1.18-3.36-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.21-.25-4.54-1.11-4.54-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.57 9.57 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.33 4.69-4.55 4.93.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/danielzigabe',
    iconPath: 'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 9h3.55v11.45H3.56V9ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z'
  },
  {
    name: 'Telegram',
    href: 'https://t.me/danielzigabe',
    iconPath: 'M22.5 2.2 19.1 21c-.26 1.33-.97 1.66-1.97 1.03l-5.45-4.02-2.63 2.53c-.29.29-.53.53-1.09.53l.39-5.55L18.46 7.2c.43-.38-.09-.6-.67-.22L6.52 14.16l-5.4-1.69c-1.17-.37-1.2-1.17.24-1.73L21.2 2.38c.97-.36 1.82.24 1.3-.18Z'
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


onMounted(() => {

  window.addEventListener('keydown', handleEscape)

})


onBeforeUnmount(() => {

  window.removeEventListener('keydown', handleEscape)

})

</script>


<template>

  <!-- =====================================================
       NAVBAR
  ====================================================== -->

  <header
    class="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
    style="
      background-color: rgba(255, 255, 255, 0.97);
      border-color: rgb(226, 232, 240);
    "
  >

    <div class="bg-orange-500 text-white">
      <div class="mx-auto flex h-10 max-w-7xl items-center justify-between gap-3 px-5 text-xs font-medium sm:px-6 lg:px-8">
        <div class="flex min-w-0 items-center gap-4 sm:gap-6">
          <a href="mailto:danielzigabe5@gmail.com" class="flex min-w-0 items-center gap-2 transition hover:text-orange-100">
            <svg class="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16v12H4z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="m4 7 8 6 8-6" />
            </svg>
            <span class="hidden truncate sm:inline">danielzigabe5@gmail.com</span>
          </a>
          <a href="tel:+251945800348" class="hidden items-center gap-2 transition hover:text-orange-100 md:flex">
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 3h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
            </svg>
            +251 945 800 348
          </a>
          <span class="hidden items-center gap-2 lg:flex">
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            Ethiopia
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
            class="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path :d="social.iconPath" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <nav
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
      aria-label="Main navigation"
    >

      <!-- =================================================
           LOGO
      ================================================== -->

      <NuxtLink
        to="/"
        class="group flex items-center gap-3"
        @click="closeMenu"
      >

        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl border text-lg font-black shadow-lg transition duration-300"
          style="
            border-color: rgba(37, 99, 235, 0.20);
            background-color: rgba(37, 99, 235, 0.08);
            color: rgb(37, 99, 235);
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.10);
          "
        >

          DZ
        </div>


        <div class="hidden sm:block">

          <div
            class="text-lg font-extrabold tracking-tight text-slate-900 transition"
          >
            Daniel Zigabe
          </div>

          <div
            class="text-xs font-medium tracking-wider"
            style="color: rgb(100, 116, 139);"
          >
            FRONTEND DEVELOPER
          </div>

        </div>

      </NuxtLink>


      <!-- =================================================
           DESKTOP NAVIGATION
      ================================================== -->

      <div class="hidden items-center gap-1 lg:flex">

        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="group relative rounded-lg px-3 py-2 text-sm font-medium transition duration-300"
          style="color: rgb(71, 85, 105);"
          active-class="!text-[#2563EB]"
        >

          {{ item.name }}

          <!-- ACTIVE / HOVER LINE -->

          <span
            class="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full transition-all duration-300 group-hover:w-1/2"
            style="background-color: rgb(37, 99, 235);"
          ></span>

        </NuxtLink>

      </div>

      <!-- =================================================
           DESKTOP BUTTONS
      ================================================== -->

      <div class="hidden items-center gap-3 lg:flex">

       


        <!--  LOGIN -->

        <NuxtLink
          to="/admin/login"
          class="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5"
          style="
            border-color: rgb(226, 232, 240);
            background-color: rgb(255, 255, 255);
            color: rgb(37, 99, 235);
          "
        >

          <!-- Login Icon -->

          <svg
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
            />

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 17l5-5-5-5"
            />

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12H3"
            />

          </svg>

          <span>
          Login
          </span>

        </NuxtLink>

      </div>


      <!-- =================================================
           MOBILE MENU BUTTON
      ================================================== -->

      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-xl border transition lg:hidden"
        style="
          border-color: rgb(226, 232, 240);
          background-color: rgb(248, 250, 252);
          color: rgb(30, 41, 59);
        "
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >

        <!-- HAMBURGER -->

        <svg
          v-if="!menuOpen"
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >

          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />

        </svg>


        <!-- CLOSE -->

        <svg
          v-else
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >

          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />

        </svg>

      </button>

    </nav>


    <!-- =================================================
         MOBILE NAVIGATION
    ================================================== -->

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-[-10px] opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-[-10px] opacity-0"
    >

      <div
        v-if="menuOpen"
        class="border-t px-5 pb-6 pt-4 lg:hidden"
        style="
          background-color: rgb(255, 255, 255);
          border-color: rgb(226, 232, 240);
        "
      >

        <div class="mx-auto max-w-7xl">


          <!-- MOBILE LINKS -->

          <div class="space-y-1">

            <NuxtLink
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition"
              style="color: rgb(71, 85, 105);"
              active-class="!text-[#2563EB]"
              @click="closeMenu"
            >

              <span>
                {{ item.name }}
              </span>


              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >

                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />

              </svg>

            </NuxtLink>

          </div>

          <div class="mt-5 border-t border-slate-200 pt-4">
            <p class="mb-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">Find me online</p>
            <div class="flex flex-wrap gap-2 px-4">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path :d="social.iconPath" />
                </svg>
                {{ social.name }}
              </a>
            </div>
          </div>


          <!-- =================================================
               MOBILE LET'S TALK
          ================================================== -->

          <NuxtLink
            to="/contact"
            class="mt-4 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white transition"
            style="
              background-color: rgb(37, 99, 235);
              color: rgb(255, 255, 255);
              box-shadow: 0 8px 20px rgba(37, 99, 235, 0.18);
            "
            @click="closeMenu"
          >
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >

              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />

            </svg>

          </NuxtLink>


          <!-- =================================================
                LOGIN
          ================================================== -->

          <NuxtLink
            to="/admin/login"
            class="mt-3 flex items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-semibold transition"
            style="
              border-color: rgb(226, 232, 240);
              background-color: rgb(255, 255, 255);
              color: rgb(37, 99, 235);
            "
            @click="closeMenu"
          >

            <!-- LOGIN ICON -->

            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >

              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
              />

              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 17l5-5-5-5"
              />

              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12H3"
              />

            </svg>


            <span>
               Login
            </span>

          </NuxtLink>

        </div>

      </div>

    </Transition>

  </header>

</template>