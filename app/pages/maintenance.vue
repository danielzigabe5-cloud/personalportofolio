<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const isPrivate = computed(() => route.query.mode === 'private')
</script>

<template>
  <main class="maintenance-page flex min-h-screen items-center justify-center px-6 py-16 text-center">
    <div class="max-w-lg">
      <span class="maintenance-label text-xs font-black uppercase tracking-[0.2em]">
        {{ isPrivate ? 'Portfolio unavailable' : 'Back soon' }}
      </span>
      <h1 class="maintenance-title mt-4 text-3xl font-black sm:text-4xl">
        {{ isPrivate ? 'This portfolio is currently private.' : 'The portfolio is being updated.' }}
      </h1>
      <p class="maintenance-message mt-4 text-base leading-relaxed">
        {{ isPrivate ? 'Please check back later.' : 'Please check back soon.' }}
      </p>
    </div>
  </main>
</template>

<style scoped>
.maintenance-page {
  background:
    radial-gradient(ellipse at 50% 42%, #ffffff 0%, #edf4ff 44%, transparent 76%),
    #e7effb;
}

.maintenance-label {
  color: #075ec9;
  text-shadow: 0 1px 0 #8acbff;
}

.maintenance-title {
  color: #1b2b45;
}

.maintenance-message {
  color: #61718a;
}
</style>