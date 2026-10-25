<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

definePageMeta({
  layout: 'admin'
})

interface ExperienceItem {
  id: string
  company: string
  position: string
  period: string
  description: string
}

const { data: experiences, refresh } = await useFetch<ExperienceItem[]>('/api/experience', {
  default: () => []
})
const actionError = ref('')
const isSaving = ref(false)

/* =====================================================
   MODAL & FORM STATE
===================================================== */
const isModalOpen = ref(false)
const editingId = ref<string | null>(null)

const form = reactive({
  company: '',
  position: '',
  period: '',
  description: ''
})

const isEditing = computed(() => editingId.value !== null)

const openAddModal = () => {
  actionError.value = ''
  editingId.value = null
  form.company = ''
  form.position = ''
  form.period = ''
  form.description = ''
  isModalOpen.value = true
}

const openEditModal = (exp: ExperienceItem) => {
  actionError.value = ''
  editingId.value = exp.id
  form.company = exp.company
  form.position = exp.position
  form.period = exp.period
  form.description = exp.description
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingId.value = null
}

const saveExperience = async () => {
  if (!form.company.trim() || !form.position.trim()) return

  actionError.value = ''
  isSaving.value = true
  const body = {
    company: form.company.trim(),
    position: form.position.trim(),
    period: form.period.trim() || 'Present',
    description: form.description.trim()
  }

  try {
    if (isEditing.value) {
      await $fetch(`/api/experience/${editingId.value}`, { method: 'PUT', body })
    } else {
      await $fetch('/api/experience', { method: 'POST', body })
    }
    await refresh()
    closeModal()
  } catch (error) {
    actionError.value = error instanceof Error ? error.message : 'Unable to save experience.'
  } finally {
    isSaving.value = false
  }
}

const deleteExperience = async (id: string, position: string, company: string) => {
  if (confirm(`"${position} at ${company}" የሚለውን የስራ ልምድ ማጥፋት እርግጠኛ ነዎት?`)) {
    actionError.value = ''
    try {
      await $fetch(`/api/experience/${id}`, { method: 'DELETE' })
      await refresh()
    } catch (error) {
      actionError.value = error instanceof Error ? error.message : 'Unable to delete experience.'
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
          Experience
        </h1>
        <p class="mt-1 text-sm text-slate-400">
          Manage your professional experience ({{ experiences.length }} Total).
        </p>
      </div>

      <button
        type="button"
        @click="openAddModal"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        <span class="text-lg leading-none">+</span>
        Add Experience
      </button>
    </div>

    <p v-if="actionError" role="alert" class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
      {{ actionError }}
    </p>

    <!-- EXPERIENCE LIST -->
    <div v-if="experiences.length > 0" class="space-y-4">
      <div
        v-for="experience in experiences"
        :key="experience.id"
        class="group rounded-2xl border border-slate-700 bg-slate-800/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800"
      >
        <!-- CARD HEADER -->
        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 class="text-lg font-black text-slate-100">
              {{ experience.position }}
            </h2>
            <p class="mt-1 text-sm font-semibold text-blue-400">
              {{ experience.company }}
            </p>
          </div>

          <!-- DURATION BADGE -->
          <span class="inline-flex w-fit items-center rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">
            {{ experience.period }}
          </span>
        </div>

        <!-- DESCRIPTION -->
        <p class="mt-4 text-sm leading-relaxed text-slate-400">
          {{ experience.description }}
        </p>

        <!-- ACTION BUTTONS -->
        <div class="mt-5 flex gap-2 border-t border-slate-700/60 pt-4">
          <button
            type="button"
            @click="openEditModal(experience)"
            class="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-400 transition hover:bg-slate-700 hover:text-white"
          >
            Edit Experience
          </button>
          <button
            type="button"
            @click="deleteExperience(experience.id, experience.position, experience.company)"
            class="rounded-lg px-3 py-1.5 text-xs font-bold text-red-400/80 transition hover:bg-red-500/10 hover:text-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- EMPTY STATE -->
    <div
      v-else
      class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-800/20 py-16 text-center"
    >
      <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-xl text-slate-400">
        💼
      </div>
      <p class="mt-3 text-base font-medium text-slate-200">ምንም የስራ ልምድ አልተመዘገበም</p>
      <p class="mt-1 text-sm text-slate-400">አዲስ የስራ ልምድ ለመመዝገብ ከላይ ያለውን "Add Experience" የሚለውን ይጫኑ።</p>
    </div>

    <!-- =================================================
         MODAL (ADD / EDIT EXPERIENCE)
    ================================================== -->
    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      >
        <div class="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 class="text-lg font-bold text-slate-100">
              {{ isEditing ? 'Edit Experience' : 'Add Experience' }}
            </h3>
            <button
              @click="closeModal"
              class="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              ✕
            </button>
          </div>

          <form @submit.prevent="saveExperience" class="mt-4 space-y-4">
            <!-- Position -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Position / Role *
              </label>
              <input
                v-model="form.position"
                type="text"
                placeholder="e.g. Frontend Developer, Full Stack Engineer"
                required
                class="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <!-- Company -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Company / Organization *
              </label>
              <input
                v-model="form.company"
                type="text"
                placeholder="e.g. Koyehub, Freelance, Google"
                required
                class="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <!-- Period -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Period / Duration
              </label>
              <input
                v-model="form.period"
                type="text"
                placeholder="e.g. 2025 - Present or 2024 - 2025"
                class="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Description & Key Responsibilities
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                placeholder="Explain the tech stack used, challenges tackled, and outcomes achieved..."
                class="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              ></textarea>
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
                {{ isSaving ? 'Saving...' : isEditing ? 'Update Experience' : 'Save Experience' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

  </div>
</template>