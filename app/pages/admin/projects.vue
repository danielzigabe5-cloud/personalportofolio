<script setup lang="ts">

definePageMeta({
  layout: 'admin'
})

const projects = ref([
  {
    title: 'CombolojoSPORT',
    category: 'Sports Platform',
    tech: 'Nuxt + Laravel + Flutter',
    status: 'Completed'
  },
  {
    title: 'Internship Attendance System',
    category: 'Web Application',
    tech: 'Nuxt + Laravel',
    status: 'In Progress'
  },
  {
    title: 'Personal Portfolio',
    category: 'Portfolio',
    tech: 'Nuxt 4 + Tailwind',
    status: 'In Progress'
  }
])

const showForm = ref(false)

</script>

<template>

  <div class="space-y-6">

    <div class="flex items-center justify-between">

      <div>
        <h1 class="text-2xl font-black text-white">
          Projects
        </h1>

        <p class="mt-1 text-sm text-slate-500">
          Manage your portfolio projects.
        </p>
      </div>

      <button
        @click="showForm = !showForm"
        class="
          rounded-xl bg-[#39ff14]
          px-4 py-2.5 text-sm
          font-black text-[#020617]
        "
      >
        + Add Project
      </button>

    </div>


    <!-- Form -->
    <div
      v-if="showForm"
      class="
        rounded-2xl border border-slate-800
        bg-[#050b14] p-6
      "
    >

      <h2 class="mb-5 font-black text-white">
        Add New Project
      </h2>

      <div class="grid gap-4 md:grid-cols-2">

        <input
          class="admin-input"
          placeholder="Project title"
        />

        <input
          class="admin-input"
          placeholder="Category"
        />

        <input
          class="admin-input"
          placeholder="Technologies"
        />

        <input
          class="admin-input"
          placeholder="Project URL"
        />

      </div>

      <button class="admin-button mt-4">
        Save Project
      </button>

    </div>


    <!-- Projects -->
    <div
      class="
        grid grid-cols-1 gap-5
        md:grid-cols-2
        xl:grid-cols-3
      "
    >

      <div
        v-for="project in projects"
        :key="project.title"
        class="
          rounded-2xl border border-slate-800
          bg-[#050b14] p-6
        "
      >

        <div class="text-3xl">
          🚀
        </div>

        <h2 class="mt-5 font-black text-white">
          {{ project.title }}
        </h2>

        <p class="mt-2 text-xs text-slate-500">
          {{ project.category }}
        </p>

        <div class="mt-5 text-xs text-slate-400">
          {{ project.tech }}
        </div>

        <div class="mt-5 flex items-center justify-between">

          <span
            class="
              rounded-full bg-[#39ff14]/10
              px-3 py-1 text-[10px]
              font-bold text-[#39ff14]
            "
          >
            {{ project.status }}
          </span>

          <button class="text-xs text-slate-500 hover:text-white">
            Edit
          </button>

        </div>

      </div>

    </div>

  </div>

</template>