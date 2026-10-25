<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'admin'
})

interface Skill {
  id: string
  name: string
  level: number
  category: string
}

const { data: skills, refresh } = await useFetch<Skill[]>('/api/skills', {
  default: () => []
})
const categories = ['Frontend', 'Backend', 'Mobile', 'Database', 'DevOps', 'Other']
const actionError = ref('')
const isSaving = ref(false)

/* =====================================================
   COMPUTED STATISTICS
===================================================== */
const totalSkills = computed(() => skills.value.length)

const frontendCount = computed(() => {
  return skills.value.filter(s => s.category.toLowerCase() === 'frontend').length
})

const averageLevel = computed(() => {
  if (skills.value.length === 0) return 0
  const total = skills.value.reduce((acc, curr) => acc + curr.level, 0)
  return Math.round(total / skills.value.length)
})

/* =====================================================
   MODAL & FORM STATE
===================================================== */
const isModalOpen = ref(false)
const editingId = ref<string | null>(null)

const form = ref<{
  name: string
  level: number
  category: string
}>({
  name: '',
  level: 80,
  category: 'Frontend'
})

const isEditing = computed(() => editingId.value !== null)

const openAddModal = () => {
  actionError.value = ''
  editingId.value = null
  form.value = {
    name: '',
    level: 75,
    category: 'Frontend'
  }
  isModalOpen.value = true
}

const openEditModal = (skill: Skill) => {
  actionError.value = ''
  editingId.value = skill.id
  form.value = {
    name: skill.name,
    level: skill.level,
    category: skill.category
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingId.value = null
}

const saveSkill = async () => {
  if (!form.value.name.trim()) return

  actionError.value = ''
  isSaving.value = true
  const body = {
      name: form.value.name.trim(),
      level: Number(form.value.level),
      category: form.value.category
  }

  try {
    if (isEditing.value) {
      await $fetch(`/api/skills/${editingId.value}`, { method: 'PUT', body })
    } else {
      await $fetch('/api/skills', { method: 'POST', body })
    }
    await refresh()
    closeModal()
  } catch (error) {
    actionError.value = error instanceof Error ? error.message : 'Unable to save skill.'
  } finally {
    isSaving.value = false
  }
}

const deleteSkill = async (id: string, name: string) => {
  if (confirm(`"${name}" የሚለውን ስኪል ማጥፋት ትፈልጋለህ?`)) {
    actionError.value = ''
    try {
      await $fetch(`/api/skills/${id}`, { method: 'DELETE' })
      await refresh()
    } catch (error) {
      actionError.value = error instanceof Error ? error.message : 'Unable to delete skill.'
    }
  }
}
</script>

<template>
  <div class="space-y-6">

    <!-- =================================================
         PAGE HEADER
    ================================================== -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-lg">
          ⚡
        </div>
        <div>
          <h1 class="text-2xl font-black text-slate-100">
            Skills
          </h1>
          <p class="mt-1 text-sm text-slate-400">
            Manage technical skills and proficiency.
          </p>
        </div>
      </div>

      <!-- ADD BUTTON -->
      <button
        type="button"
        @click="openAddModal"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        <span class="text-lg leading-none">+</span>
        Add Skill
      </button>
    </div>

      <p v-if="actionError" role="alert" class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
        {{ actionError }}
      </p>

    <!-- =================================================
         SUMMARY
    ================================================== -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">

      <!-- TOTAL -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
          Total Skills
        </p>
        <p class="mt-2 text-3xl font-black text-slate-100">
          {{ totalSkills }}
        </p>
      </div>

      <!-- FRONTEND -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
          Frontend
        </p>
        <p class="mt-2 text-3xl font-black text-blue-400">
          {{ frontendCount }}
        </p>
      </div>

      <!-- AVERAGE -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
          Average Level
        </p>
        <p class="mt-2 text-3xl font-black text-slate-100">
          {{ averageLevel }}%
        </p>
      </div>

    </div>

    <!-- =================================================
         SKILLS GRID
    ================================================== -->
    <div v-if="skills.length > 0" class="grid grid-cols-1 gap-4 md:grid-cols-2">

      <div
        v-for="skill in skills"
        :key="skill.id"
        class="group rounded-2xl border border-slate-700 bg-slate-800/50 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-800 hover:shadow-lg hover:shadow-black/20"
      >
        <!-- TOP -->
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {{ skill.category }}
            </span>
            <h2 class="mt-1 font-bold text-slate-100">
              {{ skill.name }}
            </h2>
          </div>

          <span class="rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-sm font-black text-blue-400">
            {{ skill.level }}%
          </span>
        </div>

        <!-- PROGRESS -->
        <div class="mt-5">
          <div class="h-2 overflow-hidden rounded-full bg-slate-700">
            <div
              class="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500"
              :style="{ width: `${skill.level}%` }"
            ></div>
          </div>
        </div>

        <!-- BOTTOM -->
        <div class="mt-4 flex items-center justify-between">
          <span class="text-xs text-slate-500">
            Proficiency
          </span>
          <div class="flex gap-2">
            <button
              type="button"
              @click="openEditModal(skill)"
              class="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-400 transition hover:bg-slate-700 hover:text-white"
            >
              Edit
            </button>
            <button
              type="button"
              @click="deleteSkill(skill.id, skill.name)"
              class="rounded-lg px-3 py-1.5 text-xs font-bold text-red-400/70 transition hover:bg-red-500/10 hover:text-red-400"
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
        ∅
      </div>
      <p class="mt-3 text-base font-medium text-slate-200">ምንም ስኪል አልተገኘም</p>
      <p class="mt-1 text-sm text-slate-400">አዲስ ስኪል ለመጨመር ከላይ ያለውን "Add Skill" ይጫኑ።</p>
    </div>

    <!-- =================================================
         MODAL (ADD / EDIT)
    ================================================== -->
    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      >
        <div
          class="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl transition-all"
        >
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 class="text-lg font-bold text-slate-100">
              {{ isEditing ? 'Edit Skill' : 'Add New Skill' }}
            </h3>
            <button
              @click="closeModal"
              class="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              ✕
            </button>
          </div>

          <form @submit.prevent="saveSkill" class="mt-4 space-y-4">
            <!-- Skill Name -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Skill Name
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="e.g. Vue.js, Python, Figma"
                required
                class="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <!-- Category -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Category
              </label>
              <select
                v-model="form.category"
                class="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
            </div>

            <!-- Proficiency Level -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Proficiency ({{ form.level }}%)
                </label>
              </div>
              <input
                v-model.number="form.level"
                type="range"
                min="1"
                max="100"
                class="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <!-- Actions -->
            <div class="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                @click="closeModal"
                class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSaving"
                class="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ isSaving ? 'Saving...' : isEditing ? 'Update Skill' : 'Save Skill' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- =================================================
         FOOTER NOTE
    ================================================== -->
    <div class="rounded-2xl border border-slate-700 bg-slate-800/50 px-5 py-4">
      <div class="flex items-start gap-3">
        <span class="text-blue-400">✓</span>
        <div>
          <p class="text-sm font-semibold text-slate-200">
            Skills Overview
          </p>
          <p class="mt-1 text-xs leading-5 text-slate-500">
            Keep your proficiency levels updated to accurately
            represent your current technical abilities.
          </p>
        </div>
      </div>
    </div>

  </div>
</template>