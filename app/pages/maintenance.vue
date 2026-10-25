<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const isPrivate = computed(() => route.query.mode === 'private')
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 text-center">
    <div class="max-w-lg">
      <span class="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
        {{ isPrivate ? 'Portfolio unavailable' : 'Back soon' }}
      </span>
      <h1 class="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
        {{ isPrivate ? 'This portfolio is currently private.' : 'The portfolio is being updated.' }}
      </h1>
      <p class="mt-4 text-base leading-relaxed text-slate-600">
        {{ isPrivate ? 'Please check back later.' : 'Please check back soon.' }}
      </p>
    </div>
  </main>
</template>