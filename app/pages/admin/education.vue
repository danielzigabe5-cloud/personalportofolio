<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

definePageMeta({
  layout: 'admin'
})

// 1. Type Interface
interface Education {
  id: number
  institution: string
  degree: string
  field: string
  period: string
  isCurrent: boolean
}

const STORAGE_KEY = 'portfolio_education_records'

const defaultRecords: Education[] = [
  {
    id: 1,
    institution: 'Mekdela Amba University',
    degree: 'Bachelor Degree',
    field: 'Computer Science',
    period: '2023 - Present',
    isCurrent: true
  }
]

// 2. Data Fetching (ከ LocalStorage ወይም Backend ጋር በማገናኘት)
const { data: education, status, error, refresh } = await useAsyncData<Education[]>(
  'admin-education',
  async () => {
    // Simulate Network Delay (ኔትወርክ ለማስመሰል)
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (import.meta.client) {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          return JSON.parse(saved) as Education[]
        } catch {
          return defaultRecords
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRecords))
    }

    return defaultRecords
  }
)

// Helper: LocalStorage ውስጥ ዳታ ለማስቀመጥ
const persistData = (items: Education[]) => {
  if (import.meta.client) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}

/* =====================================================
   MODAL & FORM STATE
===================================================== */
const isModalOpen = ref(false)
const isSubmitting = ref(false)
const editingId = ref<number | null>(null)

const form = reactive({
  institution: '',
  degree: '',
  field: '',
  period: '',
  isCurrent: false
})

const isEditing = computed(() => editingId.value !== null)

// አዲስ ለመጨመር ፎርም መክፈት
const handleAdd = () => {
  editingId.value = null
  form.institution = ''
  form.degree = ''
  form.field = ''
  form.period = ''
  form.isCurrent = false
  isModalOpen.value = true
}

// ለማስተካከል ፎርም መክፈት
const handleEdit = (item: Education) => {
  editingId.value = item.id
  form.institution = item.institution
  form.degree = item.degree
  form.field = item.field
  form.period = item.period
  form.isCurrent = item.isCurrent
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingId.value = null
}

// አዲስ ማስቀመጥ ወይም ማስተካከል
const handleSubmit = async () => {
  if (!form.institution.trim() || !form.degree.trim()) return

  isSubmitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 400)) // delay simulation

  const currentList = education.value ? [...education.value] : []

  if (isEditing.value) {
    // UPDATE
    const index = currentList.findIndex((item) => item.id === editingId.value)
    if (index !== -1) {
      currentList[index] = {
        id: editingId.value!,
        institution: form.institution.trim(),
        degree: form.degree.trim(),
        field: form.field.trim(),
        period: form.period.trim() || 'Present',
        isCurrent: form.isCurrent
      }
    }
  } else {
    // CREATE
    const newRecord: Education = {
      id: Date.now(),
      institution: form.institution.trim(),
      degree: form.degree.trim(),
      field: form.field.trim(),
      period: form.period.trim() || 'Present',
      isCurrent: form.isCurrent
    }
    currentList.unshift(newRecord)
  }

  persistData(currentList)
  await refresh()
  isSubmitting.value = false
  closeModal()
}

/* =====================================================
   DELETE ACTION
===================================================== */
const isDeleting = ref<number | null>(null)

const handleDelete = async (id: number) => {
  if (!confirm('ይህንን የትምህርት መረጃ ለማጥፋት እርግጠኛ ነዎት? (Delete this record?)')) return

  isDeleting.value = id
  try {
    await new Promise((resolve) => setTimeout(resolve, 600)) // network delay simulation
    const updatedList = (education.value || []).filter((item) => item.id !== id)
    persistData(updatedList)
    await refresh()
  } catch (err) {
    console.error('Failed to delete', err)
  } finally {
    isDeleting.value = null
  }
}
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
        @click="handleAdd"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        <span class="text-lg leading-none">+</span>
        Add Education
      </button>
    </div>

    <!-- ERROR STATE -->
    <div v-if="error" class="rounded-2xl border border-red-900/50 bg-red-950/20 p-5">
      <p class="font-bold text-red-400">Failed to load education data!</p>
      <p class="mt-1 text-sm text-red-300/80">{{ error.message }}</p>
      <button
        type="button"
        @click="refresh"
        class="mt-3 rounded-lg border border-red-800 px-4 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/10"
      >
        Try Again
      </button>
    </div>

    <!-- LOADING SKELETON -->
    <div v-else-if="status === 'pending'" class="space-y-4 animate-pulse">
      <div v-for="i in 2" :key="i" class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
        <div class="flex gap-5">
          <div class="h-12 w-12 shrink-0 rounded-xl bg-slate-700"></div>
          <div class="flex-1 space-y-3 py-1">
            <div class="h-4 w-1/3 rounded bg-slate-700"></div>
            <div class="h-3 w-1/4 rounded bg-slate-700"></div>
            <div class="mt-4 h-3 w-1/2 rounded bg-slate-700"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- EMPTY STATE -->
    <div
      v-else-if="!education || education.length === 0"
      class="flex flex-col items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/50 p-12 text-center"
    >
      <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-3xl">
        🎓
      </div>
      <h3 class="mt-5 text-lg font-black text-slate-100">No Education Records</h3>
      <p class="mt-2 text-sm text-slate-400">You haven't added any academic background yet.</p>
      <button
        type="button"
        @click="handleAdd"
        class="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500"
      >
        + Add your first education
      </button>
    </div>

    <!-- ACTUAL DATA LIST -->
    <div v-else class="space-y-4">
      <div
        v-for="item in education"
        :key="item.id"
        class="group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800"
        :class="{ 'opacity-50 pointer-events-none': isDeleting === item.id }"
      >
        <div class="flex flex-col gap-5 sm:flex-row">

          <!-- ICON -->
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 text-xl">
            🎓
          </div>

          <!-- CONTENT -->
          <div class="flex-1">
            <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div>
                <h2 class="flex flex-wrap items-center gap-2 text-lg font-black text-slate-100">
                  {{ item.institution }}
                  <span
                    v-if="item.isCurrent"
                    class="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400"
                  >
                    Current
                  </span>
                </h2>
                <p class="mt-1 text-sm font-semibold text-blue-400">
                  {{ item.degree }}
                </p>
              </div>

              <span class="inline-flex w-fit items-center whitespace-nowrap rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {{ item.period }}
              </span>
            </div>

            <p class="mt-3 text-sm text-slate-400">
              {{ item.field }}
            </p>

            <!-- ACTION BUTTONS -->
            <div class="mt-5 flex items-center gap-2 border-t border-slate-700 pt-4 sm:absolute sm:bottom-6 sm:right-6 sm:mt-0 sm:border-0 sm:pt-0 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
              <button
                type="button"
                @click="handleEdit(item)"
                class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-400 transition hover:bg-slate-700 hover:text-blue-400"
              >
                <span>✏️</span> Edit
              </button>

              <button
                type="button"
                @click="handleDelete(item.id)"
                class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-red-400/80 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="isDeleting === item.id"
              >
                <span>{{ isDeleting === item.id ? '⏳' : '🗑️' }}</span>
                {{ isDeleting === item.id ? 'Deleting...' : 'Delete' }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- =================================================
         MODAL (ADD / EDIT FORM)
    ================================================== -->
    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      >
        <div class="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 class="text-lg font-bold text-slate-100">
              {{ isEditing ? 'Edit Education Record' : 'Add Education Record' }}
            </h3>
            <button
              @click="closeModal"
              class="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              ✕
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
            <!-- Institution -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Institution / University *
              </label>
              <input
                v-model="form.institution"
                type="text"
                placeholder="e.g. Mekdela Amba University"
                required
                class="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <!-- Degree & Field -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Degree / Certificate *
                </label>
                <input
                  v-model="form.degree"
                  type="text"
                  placeholder="e.g. Bachelor Degree"
                  required
                  class="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Field of Study
                </label>
                <input
                  v-model="form.field"
                  type="text"
                  placeholder="e.g. Computer Science"
                  class="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <!-- Period -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Period / Years
              </label>
              <input
                v-model="form.period"
                type="text"
                placeholder="e.g. 2023 - Present"
                class="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <!-- Current Checkbox -->
            <label class="flex items-center gap-3 cursor-pointer pt-1">
              <input
                v-model="form.isCurrent"
                type="checkbox"
                class="h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
              />
              <span class="text-xs font-bold text-slate-300">
                I am currently studying here (Show 'Current' Badge)
              </span>
            </label>

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
                :disabled="isSubmitting"
                class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 disabled:opacity-50"
              >
                <span v-if="isSubmitting" class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update Record' : 'Save Record') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

  </div>
</template>