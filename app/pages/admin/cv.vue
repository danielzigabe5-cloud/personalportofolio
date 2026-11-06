<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({ layout: 'admin' })

interface CVMetadata {
  name: string
  size: number
  updatedAt: string
  url: string
}

const cv = ref<CVMetadata | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const isLoading = ref(true)
const isUploading = ref(false)
const errorMessage = ref('')
const statusMessage = ref('')

const loadCV = async () => {
  errorMessage.value = ''
  isLoading.value = true
  try {
    cv.value = await $fetch<CVMetadata>('/api/admin/cv')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Could not load CV information.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadCV)

const uploadCV = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return

  errorMessage.value = ''
  statusMessage.value = ''
  if (!file.name.toLowerCase().endsWith('.pdf') || (file.type && file.type !== 'application/pdf')) {
    errorMessage.value = 'Choose a PDF file.'
    return
  }
  if (file.size > 10 * 1024 * 1024) {
    errorMessage.value = 'The CV must be smaller than 10 MB.'
    return
  }

  const body = new FormData()
  body.append('cv', file)
  isUploading.value = true
  try {
    cv.value = await $fetch<CVMetadata>('/api/admin/cv', { method: 'PUT', body })
    statusMessage.value = 'CV uploaded and published successfully.'
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Could not upload the CV.'
  } finally {
    isUploading.value = false
  }
}

const formatSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`
</script>

<template>
  <div class="mx-auto max-w-4xl space-y-6">
    <header>
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">PORTFOLIO CONTENT</p>
      <h1 class="mt-2 text-2xl font-black text-slate-100 sm:text-3xl">CV Management</h1>
      <p class="mt-2 text-sm text-slate-400">Upload a PDF to update the CV linked from your public portfolio.</p>
    </header>

    <section class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 sm:p-8">
      <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="font-bold text-slate-100">Current CV</h2>
          <p v-if="isLoading" class="mt-2 text-sm text-slate-400">Checking the published CV...</p>
          <p v-else-if="cv?.size" class="mt-2 text-sm text-slate-300">
            {{ cv.name }} · {{ formatSize(cv.size) }}
          </p>
          <p v-else class="mt-2 text-sm text-slate-400">No CV is currently available.</p>
          <p v-if="cv?.updatedAt" class="mt-1 text-xs text-slate-500">
            Last updated {{ new Date(cv.updatedAt).toLocaleString() }}
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a
            v-if="cv?.size"
            href="/api/cv"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-xl border border-slate-600 px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:border-blue-400 hover:text-blue-300"
          >
            View current CV
          </a>
          <button
            type="button"
            class="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="isUploading"
            @click="fileInput?.click()"
          >
            {{ isUploading ? 'Uploading...' : cv?.size ? 'Replace CV' : 'Upload CV' }}
          </button>
        </div>
      </div>

      <input ref="fileInput" type="file" accept="application/pdf,.pdf" class="hidden" @change="uploadCV">
      <p class="mt-5 border-t border-slate-700 pt-4 text-xs leading-relaxed text-slate-400">
        PDF only · Maximum size 10 MB. Uploading replaces the existing public CV used by the Home and About pages.
      </p>
      <p v-if="errorMessage" role="alert" class="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
        {{ errorMessage }}
      </p>
      <p v-if="statusMessage" role="status" class="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
        {{ statusMessage }}
      </p>
    </section>
  </div>
</template>
