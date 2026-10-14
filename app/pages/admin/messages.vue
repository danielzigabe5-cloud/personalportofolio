<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const education = [
  {
    institution: 'Mekdela Amba University',
    degree: 'Bachelor Degree',
    field: 'Computer Science',
    period: '2023 - Present'
  }
]
</script>

<template>
  <div class="space-y-6">

    <!-- HEADER -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-100">
          Education
        </h1>
        <p class="mt-1 text-sm text-slate-400">
          Manage your academic background.
        </p>
      </div>

      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        <span class="text-lg leading-none">+</span>
        Add Education
      </button>
    </div>

    <!-- EDUCATION LIST -->
    <div class="space-y-4">
      <div
        v-for="item in education"
        :key="item.institution"
        class="group rounded-2xl border border-slate-700 bg-slate-800/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800"
      >
        <div class="flex flex-col gap-5 sm:flex-row">

          <!-- ICON -->
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-xl">
            🎓
          </div>

          <!-- CONTENT -->
          <div class="flex-1">
            <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div>
                <h2 class="text-lg font-black text-slate-100">
                  {{ item.institution }}
                </h2>
                <p class="mt-1 text-sm font-semibold text-emerald-400">
                  {{ item.degree }}
                </p>
              </div>

              <span class="inline-flex w-fit items-center rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {{ item.period }}
              </span>
            </div>

            <p class="mt-3 text-sm text-slate-400">
              {{ item.field }}
            </p>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>