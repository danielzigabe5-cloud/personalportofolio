<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'

definePageMeta({
  layout: 'admin'
})

interface Project {
  id: string
  title: string
  category: string
  tech: string
  url?: string
  status: 'Completed' | 'In Progress' | 'Planning'
}

/* =====================================================
   DEFAULT DATA & LOCAL STORAGE
===================================================== */
const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'CombolojoSPORT',
    category: 'Sports Platform',
    tech: 'Nuxt + Laravel + Flutter',
    url: 'https://example.com',
    status: 'Completed'
  },
  {
    id: '2',
    title: 'Internship Attendance System',
    category: 'Web Application',
    tech: 'Nuxt + Laravel',
    url: '',
    status: 'In Progress'
  },
  {
    id: '3',
    title: 'Personal Portfolio',
    category: 'Portfolio',
    tech: 'Nuxt 4 + Tailwind',
    url: 'https://example.com',
    status: 'In Progress'
  }
]

const projects = ref<Project[]>([])
const showForm = ref(false)
const editingId = ref<string | null>(null)

// Load from LocalStorage
onMounted(() => {
  const saved = localStorage.getItem('portfolio_projects')
  if (saved) {
    try {
      projects.value = JSON.parse(saved)
    } catch {
      projects.value = defaultProjects
    }
  } else {
    projects.value = defaultProjects
  }
})

// Auto-sync to LocalStorage
watch(
  projects,
  (newProjects) => {
    if (import.meta.client) {
      localStorage.setItem('portfolio_projects', JSON.stringify(newProjects))
    }
  },
  { deep: true }
)

/* =====================================================
   FORM STATE & ACTIONS
===================================================== */
const initialFormState = {
  title: '',
  category: '',
  tech: '',
  url: '',
  status: 'In Progress' as 'Completed' | 'In Progress' | 'Planning'
}

const form = reactive({ ...initialFormState })

const isEditing = computed(() => editingId.value !== null)

const resetForm = () => {
  Object.assign(form, initialFormState)
  editingId.value = null
}

const toggleForm = () => {
  if (showForm.value) {
    resetForm()
    showForm.value = false
  } else {
    resetForm()
    showForm.value = true
  }
}

const openEdit = (project: Project) => {
  editingId.value = project.id
  form.title = project.title
  form.category = project.category
  form.tech = project.tech
  form.url = project.url || ''
  form.status = project.status
  showForm.value = true

  // Scroll smoothly to form
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const saveProject = () => {
  if (!form.title.trim()) return

  if (isEditing.value) {
    // Update existing project
    const index = projects.value.findIndex(p => p.id === editingId.value)
    if (index !== -1) {
      projects.value[index] = {
        id: editingId.value!,
        title: form.title.trim(),
        category: form.category.trim() || 'General',
        tech: form.tech.trim() || 'Vue / Nuxt',
        url: form.url.trim(),
        status: form.status
      }
    }
  } else {
    // Add new project
    projects.value.unshift({
      id: Date.now().toString(),
      title: form.title.trim(),
      category: form.category.trim() || 'General',
      tech: form.tech.trim() || 'Vue / Nuxt',
      url: form.url.trim(),
      status: form.status
    })
  }

  resetForm()
  showForm.value = false
}

const deleteProject = (id: string, title: string) => {
  if (confirm(`"${title}" የሚለውን ፕሮጀክት ማጥፋት እርግጠኛ ነዎት?`)) {
    projects.value = projects.value.filter(p => p.id !== id)
    if (editingId.value === id) {
      resetForm()
      showForm.value = false
    }
  }
}
</script>

<template>
  <div class="space-y-6">

    <!-- HEADER -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-100">
          Projects
        </h1>
        <p class="mt-1 text-sm text-slate-400">
          Manage your portfolio projects ({{ projects.length }} Total).
        </p>
      </div>

      <button
        type="button"
        @click="toggleForm"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        <span class="text-lg leading-none">{{ showForm ? '✕' : '+' }}</span>
        {{ showForm ? 'Cancel' : 'Add Project' }}
      </button>
    </div>

    <!-- ADD / EDIT PROJECT FORM -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <form
        v-if="showForm"
        @submit.prevent="saveProject"
        class="rounded-2xl border border-slate-700 bg-slate-800/60 p-6 shadow-xl"
      >
        <div class="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-5">
          <h2 class="font-black text-slate-100 text-lg">
            {{ isEditing ? 'Edit Project' : 'Add New Project' }}
          </h2>
          <span v-if="isEditing" class="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg">
            Editing Mode
          </span>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <!-- Title -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Project Title *
            </label>
            <input
              v-model="form.title"
              type="text"
              required
              placeholder="e.g. CombolojoSPORT"
              class="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- Category -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Category
            </label>
            <input
              v-model="form.category"
              type="text"
              placeholder="e.g. Web App, Sports Platform"
              class="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- Technologies -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Technologies Used
            </label>
            <input
              v-model="form.tech"
              type="text"
              placeholder="e.g. Nuxt + Laravel + Tailwind"
              class="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- Project URL -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Live or Repo URL (Optional)
            </label>
            <input
              v-model="form.url"
              type="url"
              placeholder="https://example.com"
              class="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- Status Dropdown -->
          <div class="md:col-span-2">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Project Status
            </label>
            <select
              v-model="form.status"
              class="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-100 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Planning">Planning</option>
            </select>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-700/60">
          <button
            type="button"
            @click="toggleForm"
            class="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
          >
            {{ isEditing ? 'Update Project' : 'Save Project' }}
          </button>
        </div>
      </form>
    </Transition>

    <!-- PROJECTS GRID -->
    <div v-if="projects.length > 0" class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="project in projects"
        :key="project.id"
        class="group flex flex-col justify-between rounded-2xl border border-slate-700 bg-slate-800/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800"
      >
        <div>
          <!-- TOP ROW: ICON & URL LINK -->
          <div class="flex items-center justify-between">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-2xl">
              🚀
            </div>

            <!-- External link if URL exists -->
            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-blue-400"
              title="Open Project"
            >
              ↗
            </a>
          </div>

          <!-- TITLE -->
          <h2 class="mt-5 text-lg font-black text-slate-100">
            {{ project.title }}
          </h2>

          <!-- CATEGORY -->
          <p class="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {{ project.category }}
          </p>

          <!-- TECH -->
          <div class="mt-4 text-xs font-medium text-slate-300 bg-slate-900/40 px-3 py-2 rounded-xl border border-slate-700/50">
            {{ project.tech }}
          </div>
        </div>

        <!-- FOOTER -->
        <div class="mt-6 flex items-center justify-between border-t border-slate-700/60 pt-4">
          <!-- STATUS BADGE -->
          <span
            :class="[
              'rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider',
              project.status === 'Completed'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : project.status === 'In Progress'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
            ]"
          >
            {{ project.status }}
          </span>

          <!-- ACTION BUTTONS -->
          <div class="flex items-center gap-1">
            <button
              type="button"
              @click="openEdit(project)"
              class="rounded-lg px-2.5 py-1 text-xs font-bold text-slate-400 transition hover:bg-slate-700 hover:text-white"
            >
              Edit
            </button>
            <button
              type="button"
              @click="deleteProject(project.id, project.title)"
              class="rounded-lg px-2.5 py-1 text-xs font-bold text-red-400/80 transition hover:bg-red-500/10 hover:text-red-400"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- EMPTY STATE -->
    <div
      v-else
      class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-800/20 py-16 text-center"
    >
      <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-400 text-xl">
        📁
      </div>
      <p class="mt-3 text-base font-medium text-slate-200">ምንም ፕሮጀክት አልተገኘም</p>
      <p class="mt-1 text-sm text-slate-400">አዲስ ፕሮጀክት ለመመዝገብ ከላይ ያለውን "Add Project" ይጫኑ።</p>
    </div>

  </div>
</template>