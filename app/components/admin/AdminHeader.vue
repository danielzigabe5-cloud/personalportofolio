<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/* =========================================================
   CURRENT DATE & TIME
========================================================= */

const now = ref(new Date())

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})

/* =========================================================
   FORMATTED TIME
========================================================= */

const currentTime = computed(() => {
  return now.value.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
})

/* =========================================================
   FORMATTED DATE
========================================================= */

const currentDate = computed(() => {
  return now.value.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
})
</script>

<template>
  <header
    class="
      sticky top-0 z-40
      flex h-20 items-center justify-between
      border-b border-indigo-900/40
      bg-slate-950/90
      px-4
      backdrop-blur-xl
      sm:px-6
      lg:px-8
    "
  >

    <!-- =====================================================
         LEFT SIDE
    ====================================================== -->

    <div class="min-w-0">

      <!-- Dashboard Title -->
      <h1
        class="
          text-lg
          font-black
          tracking-tight
          text-slate-100
          sm:text-xl
        "
      >
        Dashboard
      </h1>

      <!-- Current Date -->
      <p
        class="
          mt-0.5
          text-xs
          font-medium
          text-indigo-300/70
        "
      >
        {{ currentDate }}
      </p>

    </div>


    <!-- =====================================================
         RIGHT SIDE
    ====================================================== -->

    <div class="flex items-center gap-2 sm:gap-3">

      <!-- ===================================================
           CURRENT TIME
      ==================================================== -->

      <div
        class="
          hidden
          items-center
          gap-2
          rounded-xl
          border
          border-indigo-800/40
          bg-indigo-950/40
          px-3
          py-2
          text-xs
          font-semibold
          text-indigo-200
          sm:flex
        "
      >
        <!-- Clock Icon -->
        <span
          class="
            flex
            h-5
            w-5
            items-center
            justify-center
            text-violet-400
          "
        >
          🕐
        </span>

        <span class="whitespace-nowrap">
          {{ currentTime }}
        </span>
      </div>


      <!-- ===================================================
           NOTIFICATION BUTTON
      ==================================================== -->

      <button
        type="button"
        aria-label="Notifications"
        class="
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-indigo-800/40
          bg-indigo-950/40
          text-lg
          transition
          duration-200
          hover:border-indigo-600/50
          hover:bg-indigo-900/50
          active:scale-95
        "
      >

        <!-- Bell -->
        <span class="leading-none">
          🔔
        </span>

        <!-- Notification Dot -->
        <span
          class="
            absolute
            right-1.5
            top-1.5
            h-2
            w-2
            rounded-full
            bg-violet-400
            shadow-[0_0_8px_rgba(167,139,250,0.9)]
          "
        ></span>

      </button>


      <!-- ===================================================
           USER AVATAR
      ==================================================== -->

      <button
        type="button"
        aria-label="User profile"
        class="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-violet-600
          text-sm
          font-black
          tracking-wide
          text-white
          ring-2
          ring-violet-400/30
          shadow-[0_0_12px_rgba(139,92,246,0.35)]
          transition
          duration-200
          hover:bg-violet-500
          hover:shadow-[0_0_20px_rgba(139,92,246,0.55)]
          active:scale-95
        "
      >
        DZ
      </button>

    </div>

  </header>
</template>