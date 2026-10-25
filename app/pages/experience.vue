<script setup lang="ts">
interface Experience {
  id: string
  period: string
  position: string
  company: string
  description: string
}

const { data: experiences, pending, error } = await useFetch<Experience[]>('/api/experience', {
  default: () => []
})
</script>

<template>
  <section id="experience" class="border-t border-slate-200 bg-white py-20 sm:py-24">
    <div class="mx-auto max-w-7xl px-6">
      <header class="mb-12 max-w-3xl sm:mb-16">
        <span class="mb-3 block text-xs font-extrabold uppercase tracking-wider text-blue-600">EXPERIENCE</span>
        <h1 class="text-3xl font-black leading-tight text-slate-900 sm:text-5xl">Learning by building with people.</h1>
        <p class="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
          A record of the roles, teams, and projects that have shaped my work as a developer.
        </p>
      </header>

      <div class="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-8">
          <div class="mb-2 flex items-center justify-between gap-4">
            <h2 class="text-sm font-black uppercase tracking-wider text-slate-900">Career timeline</h2>
            <span class="text-xs font-semibold text-slate-500">{{ experiences.length }} roles</span>
          </div>

          <p v-if="pending" class="border-t border-slate-200 py-8 text-sm text-slate-500">Loading experience...</p>
          <p v-else-if="error" class="border-t border-slate-200 py-8 text-sm text-red-600">Experience could not be loaded.</p>
          <p v-else-if="experiences.length === 0" class="border-t border-slate-200 py-8 text-sm text-slate-500">No experience has been added yet.</p>

          <div v-else>
            <article
              v-for="(exp, index) in experiences"
              :key="exp.id"
              class="grid gap-4 border-t border-slate-200 py-7 sm:grid-cols-12 sm:gap-6 sm:py-8"
            >
              <div class="sm:col-span-3">
                <span class="text-xs font-bold uppercase tracking-wide text-blue-600">{{ exp.period }}</span>
                <span class="mt-2 block text-xs font-medium text-slate-400">{{ String(index + 1).padStart(2, '0') }}</span>
              </div>
              <div class="sm:col-span-9">
                <h3 class="text-xl font-black text-slate-900">{{ exp.position }}</h3>
                <p class="mt-1 text-sm font-semibold text-slate-500">{{ exp.company }}</p>
                <div class="mt-4 space-y-2">
                  <p
                    v-for="(line, lineIndex) in exp.description.split('\n').filter(Boolean)"
                    :key="lineIndex"
                    class="text-sm leading-relaxed text-slate-600"
                  >
                    {{ line }}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <aside class="min-w-0 rounded-2xl bg-blue-900 p-7 text-white sm:p-8 lg:sticky lg:top-28 lg:col-span-4">
          <div class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span class="text-xs font-bold uppercase tracking-widest text-blue-100">Open to opportunities</span>
          </div>
          <h2 class="mt-8 text-2xl font-black leading-tight">Let's build something useful.</h2>
          <p class="mt-4 text-sm leading-relaxed text-blue-50">
            I’m interested in meaningful projects, thoughtful collaborations, and teams that value continuous learning.
          </p>
          <div class="mt-7 border-t border-white/20 pt-5">
            <NuxtLink to="/contact" class="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-blue-900 transition hover:bg-blue-50">
              Start a conversation <span aria-hidden="true">→</span>
          </NuxtLink>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>