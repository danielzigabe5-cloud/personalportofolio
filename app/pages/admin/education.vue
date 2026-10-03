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

    <div class="flex items-center justify-between">

      <div>
        <h1 class="text-2xl font-black text-white">
          Education
        </h1>

        <p class="mt-1 text-sm text-slate-500">
          Manage your academic background.
        </p>
      </div>

      <button class="admin-button">
        + Add Education
      </button>

    </div>


    <div class="space-y-4">

      <div
        v-for="item in education"
        :key="item.institution"
        class="
          rounded-2xl border border-slate-800
          bg-[#050b14] p-6
        "
      >

        <div class="flex gap-5">

          <div
            class="
              flex h-12 w-12 shrink-0
              items-center justify-center
              rounded-xl bg-slate-900
              text-xl
            "
          >
            🎓
          </div>

          <div class="flex-1">

            <div class="flex items-start justify-between gap-4">

              <div>

                <h2 class="font-black text-white">
                  {{ item.institution }}
                </h2>

                <p class="mt-1 text-sm text-[#39ff14]">
                  {{ item.degree }}
                </p>

              </div>

              <span class="text-xs text-slate-500">
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