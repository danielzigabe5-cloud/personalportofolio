<script setup lang="ts">

import { ref, onMounted, onBeforeUnmount } from 'vue'

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
      background-color: rgba(15, 23, 42, 0.95);
      border-color: rgba(51, 65, 85, 0.80);
    "
  >

    <nav
      class="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
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
            border-color: rgba(37, 99, 235, 0.40);
            background-color: rgba(37, 99, 235, 0.12);
            color: rgb(96, 165, 250);
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.10);
          "
        >
          DZ
        </div>


        <div class="hidden sm:block">

          <div
            class="text-lg font-extrabold tracking-tight text-white transition"
          >
            Daniel Zigabe
          </div>

          <div
            class="text-xs font-medium tracking-wider"
            style="color: rgb(148, 163, 184);"
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
          style="color: rgb(203, 213, 225);"
          active-class="!text-blue-400"
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

        <!-- Let's Talk -->

        <NuxtLink
          to="/contact"
          class="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5"
          style="
            background-color: rgb(37, 99, 235);
            box-shadow: 0 8px 20px rgba(37, 99, 235, 0.20);
          "
        >

          <span>
            Let's Talk
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
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />

          </svg>

        </NuxtLink>


        <!-- ADMIN LOGIN -->

        <NuxtLink
          to="/admin/login"
          class="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5"
          style="
            border-color: rgba(59, 130, 246, 0.45);
            background-color: rgba(37, 99, 235, 0.08);
            color: rgb(96, 165, 250);
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
            Admin Login
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
          border-color: rgb(51, 65, 85);
          background-color: rgb(20, 30, 50);
          color: rgb(226, 232, 240);
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
          background-color: rgb(15, 23, 42);
          border-color: rgb(30, 41, 59);
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
              style="color: rgb(203, 213, 225);"
              active-class="!text-blue-400"
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


          <!-- =================================================
               MOBILE LET'S TALK
          ================================================== -->

          <NuxtLink
            to="/contact"
            class="mt-4 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white transition"
            style="
              background-color: rgb(37, 99, 235);
              box-shadow: 0 8px 20px rgba(37, 99, 235, 0.20);
            "
            @click="closeMenu"
          >

            <span>
              Let's Talk
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />

            </svg>

          </NuxtLink>


          <!-- =================================================
               MOBILE ADMIN LOGIN
          ================================================== -->

          <NuxtLink
            to="/admin/login"
            class="mt-3 flex items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-semibold transition"
            style="
              border-color: rgba(59, 130, 246, 0.45);
              background-color: rgba(37, 99, 235, 0.08);
              color: rgb(96, 165, 250);
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
              Admin Login
            </span>

          </NuxtLink>

        </div>

      </div>

    </Transition>

  </header>

</template>