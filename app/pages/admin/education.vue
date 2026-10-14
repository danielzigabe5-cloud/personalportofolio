<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

// 1. Type Interface ለ ዳታው
interface Education {
  id: number
  institution: string
  degree: string
  field: string
  period: string
  isCurrent: boolean
}

// 2. Data Fetching (ከ Backend ማምጣት)
const { data: education, status, error, refresh } = await useAsyncData<Education[]>(
  'admin-education',
  async () => {
    // እውነተኛ Backend API Call (Example):
    // return await $fetch('/api/admin/education')

    // ኔትወርክ ለማስመሰል የተጨመረ መዘግየት (Simulate network delay)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock Response from Database
    return [
      {
        id: 1,
        institution: 'Mekdela Amba University',
        degree: 'Bachelor Degree',
        field: 'Computer Science',
        period: '2023 - Present',
        isCurrent: true
      }
    ]
  }
)

// 3. Action Functions (ሎጂኮች)
const isDeleting = ref<number | null>(null)

// አዲስ ለመጨመር
const handleAdd = () => {
  console.log('Open Add Education Modal')
  // እዚህ ላይ ሞዳል (Modal) ለመክፈት ሎጂክ ትጽፋለህ
}

// ለማስተካከል
const handleEdit = (item: Education) => {
  console.log('Edit Education:', item.institution)
  // እዚህ ላይ Edit Modal ትከፍታለህ
}

// ለማጥፋት (API ጥሪ መመስያ)
const handleDelete = async (id: number) => {
  if (!confirm('Are you sure you want to delete this education record?')) return

  isDeleting.value = id
  try {
    // እውነተኛ ማጥፊያ ጥሪ (Example):
    // await $fetch(`/api/admin/education/${id}`, { method: 'DELETE' })

    // Simulate Delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // ዳታውን ሪፍሬሽ ማድረግ
    await refresh()
    console.log('Deleted successfully!')
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
                    class="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400"
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
                class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-red-400/70 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
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

  </div>
</template>