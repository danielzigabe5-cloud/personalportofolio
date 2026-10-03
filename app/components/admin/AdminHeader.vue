<script setup lang="ts">

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

const currentTime = computed(() => {
  return now.value.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
})

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
      border-b border-slate-800
      bg-[#050b14]/95 px-4
      backdrop-blur
      sm:px-6 lg:px-8
    "
  >

    <!-- Left -->
    <div>

      <h1 class="text-lg font-black text-white">
        Dashboard
      </h1>

      <p class="text-xs text-slate-500">
        {{ currentDate }}
      </p>

    </div>


    <!-- Right -->
    <div class="flex items-center gap-3">

      <div
        class="
          hidden items-center gap-2
          rounded-lg bg-slate-900
          px-3 py-2 text-xs
          text-slate-400 sm:flex
        "
      >
        <span>🕐</span>
        {{ currentTime }}
      </div>

      <button
        class="
          relative flex h-10 w-10
          items-center justify-center
          rounded-xl bg-slate-900
          text-lg hover:bg-slate-800
        "
      >
        🔔

        <span
          class="
            absolute right-1 top-1
            h-2 w-2 rounded-full
            bg-[#39ff14]
          "
        />
      </button>

      <div
        class="
          flex h-10 w-10 items-center
          justify-center rounded-xl
          bg-[#39ff14]
          font-black text-[#020617]
        "
      >
        DZ
      </div>

    </div>

  </header>

</template>