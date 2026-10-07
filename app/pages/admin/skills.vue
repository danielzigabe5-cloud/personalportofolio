```vue
<script setup lang="ts">

definePageMeta({
  layout: 'admin'
})

/* =====================================================
   SKILLS DATA
===================================================== */

const skills = ref([
  { name: 'HTML', level: 95, category: 'Frontend' },
  { name: 'CSS / Tailwind CSS', level: 90, category: 'Frontend' },
  { name: 'JavaScript', level: 85, category: 'Frontend' },
  { name: 'TypeScript', level: 80, category: 'Frontend' },
  { name: 'Vue.js', level: 88, category: 'Frontend' },
  { name: 'Nuxt.js', level: 85, category: 'Frontend' },
  { name: 'Laravel', level: 78, category: 'Backend' },
  { name: 'Flutter', level: 75, category: 'Mobile' }
])

</script>


<template>

  <div class="space-y-6">

    <!-- =================================================
         PAGE HEADER
    ================================================== -->

    <div
      class="
        flex flex-col gap-4
        sm:flex-row sm:items-center
        sm:justify-between
      "
    >

      <div>

        <div class="flex items-center gap-3">

          <div
            class="
              flex h-10 w-10 items-center justify-center
              rounded-xl
              border border-emerald-500/20
              bg-emerald-500/10
              text-lg
            "
          >
            ⚡
          </div>

          <div>

            <h1 class="text-2xl font-black text-white">
              Skills
            </h1>

            <p class="mt-1 text-sm text-slate-500">
              Manage technical skills and proficiency.
            </p>

          </div>

        </div>

      </div>


      <!-- ADD BUTTON -->

      <button
        class="
          inline-flex items-center justify-center
          rounded-xl
          bg-[#39ff14]
          px-5 py-2.5
          text-sm font-black
          text-black
          shadow-lg shadow-[#39ff14]/10
          transition
          hover:-translate-y-0.5
          hover:bg-[#52ff32]
        "
      >
        + Add Skill
      </button>

    </div>


    <!-- =================================================
         SUMMARY
    ================================================== -->

    <div
      class="
        grid grid-cols-1 gap-4
        sm:grid-cols-3
      "
    >

      <!-- TOTAL -->

      <div
        class="
          rounded-2xl
          border border-slate-800
          bg-[#050b14]
          p-5
        "
      >

        <p class="text-xs font-bold uppercase tracking-wider text-slate-500">
          Total Skills
        </p>

        <p class="mt-2 text-3xl font-black text-white">
          {{ skills.length }}
        </p>

      </div>


      <!-- FRONTEND -->

      <div
        class="
          rounded-2xl
          border border-slate-800
          bg-[#050b14]
          p-5
        "
      >

        <p class="text-xs font-bold uppercase tracking-wider text-slate-500">
          Frontend
        </p>

        <p class="mt-2 text-3xl font-black text-[#39ff14]">
          {{ skills.filter(skill => skill.category === 'Frontend').length }}
        </p>

      </div>


      <!-- AVERAGE -->

      <div
        class="
          rounded-2xl
          border border-slate-800
          bg-[#050b14]
          p-5
        "
      >

        <p class="text-xs font-bold uppercase tracking-wider text-slate-500">
          Average Level
        </p>

        <p class="mt-2 text-3xl font-black text-white">
          {{
            Math.round(
              skills.reduce((total, skill) => total + skill.level, 0)
              / skills.length
            )
          }}%
        </p>

      </div>

    </div>


    <!-- =================================================
         SKILLS GRID
    ================================================== -->

    <div
      class="
        grid grid-cols-1 gap-4
        md:grid-cols-2
      "
    >

      <!-- SKILL CARD -->

      <div
        v-for="skill in skills"
        :key="skill.name"
        class="
          group
          rounded-2xl
          border border-slate-800
          bg-[#050b14]
          p-5
          transition
          duration-300
          hover:-translate-y-1
          hover:border-[#39ff14]/30
          hover:shadow-lg
          hover:shadow-black/20
        "
      >

        <!-- TOP -->

        <div class="flex items-center justify-between">

          <div>

            <span
              class="
                text-xs font-semibold
                uppercase tracking-wider
                text-slate-600
              "
            >
              {{ skill.category }}
            </span>

            <h2 class="mt-1 font-bold text-white">
              {{ skill.name }}
            </h2>

          </div>


          <span
            class="
              rounded-lg
              border border-[#39ff14]/20
              bg-[#39ff14]/10
              px-2.5 py-1
              text-sm font-black
              text-[#39ff14]
            "
          >
            {{ skill.level }}%
          </span>

        </div>


        <!-- PROGRESS -->

        <div class="mt-5">

          <div
            class="
              h-2
              overflow-hidden
              rounded-full
              bg-slate-800
            "
          >

            <div
              class="
                h-full
                rounded-full
                bg-[#39ff14]
                transition-all
                duration-700
              "
              :style="{ width: `${skill.level}%` }"
            ></div>

          </div>

        </div>


        <!-- BOTTOM -->

        <div class="mt-4 flex items-center justify-between">

          <span class="text-xs text-slate-600">
            Proficiency
          </span>

          <div class="flex gap-3">

            <button
              class="
                text-xs font-semibold
                text-slate-500
                transition
                hover:text-white
              "
            >
              Edit
            </button>

            <button
              class="
                text-xs font-semibold
                text-red-400/70
                transition
                hover:text-red-400
              "
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>


    <!-- =================================================
         FOOTER NOTE
    ================================================== -->

    <div
      class="
        rounded-2xl
        border border-slate-800
        bg-[#050b14]
        px-5 py-4
      "
    >

      <div class="flex items-start gap-3">

        <span class="text-[#39ff14]">
          ✓
        </span>

        <div>

          <p class="text-sm font-semibold text-slate-300">
            Skills Overview
          </p>

          <p class="mt-1 text-xs leading-5 text-slate-600">
            Keep your proficiency levels updated to accurately
            represent your current technical abilities.
          </p>

        </div>

      </div>

    </div>

  </div>

</template>
```