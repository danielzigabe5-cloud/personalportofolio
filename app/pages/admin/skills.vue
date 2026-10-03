<script setup lang="ts">

definePageMeta({
  layout: 'admin'
})

const skills = ref([
  { name: 'HTML', level: 95 },
  { name: 'CSS / Tailwind CSS', level: 90 },
  { name: 'JavaScript', level: 85 },
  { name: 'TypeScript', level: 80 },
  { name: 'Vue.js', level: 88 },
  { name: 'Nuxt.js', level: 85 },
  { name: 'Laravel', level: 78 },
  { name: 'Flutter', level: 75 }
])

</script>

<template>

  <div class="space-y-6">

    <div class="flex items-center justify-between">

      <div>
        <h1 class="text-2xl font-black text-white">
          Skills
        </h1>

        <p class="mt-1 text-sm text-slate-500">
          Manage technical skills and proficiency.
        </p>
      </div>

      <button class="admin-button">
        + Add Skill
      </button>

    </div>


    <div
      class="
        grid grid-cols-1 gap-4
        md:grid-cols-2
      "
    >

      <div
        v-for="skill in skills"
        :key="skill.name"
        class="
          rounded-2xl border border-slate-800
          bg-[#050b14] p-5
        "
      >

        <div class="flex items-center justify-between">

          <span class="font-bold text-white">
            {{ skill.name }}
          </span>

          <span class="text-sm font-black text-[#39ff14]">
            {{ skill.level }}%
          </span>

        </div>

        <div class="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">

          <div
            class="h-full rounded-full bg-[#39ff14]"
            :style="{ width: `${skill.level}%` }"
          />

        </div>

        <div class="mt-4 text-right">

          <button class="text-xs text-slate-500 hover:text-white">
            Edit
          </button>

        </div>

      </div>

    </div>

  </div>

</template>