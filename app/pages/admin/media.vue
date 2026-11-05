<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

interface MediaFile {
  id: string
  name: string
  size: number
  date: string
  url: string
  extension: string
  mimeType: string
  kind: 'image' | 'document'
}

const uploadedFiles = ref<MediaFile[]>([])
const isDragging = ref(false)
const isLoading = ref(true)
const isUploading = ref(false)
const errorMessage = ref('')
const statusMessage = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const searchQuery = ref('')
const selectedImage = ref<MediaFile | null>(null)
const filteredFiles = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return uploadedFiles.value
  return uploadedFiles.value.filter(file =>
    file.name.toLowerCase().includes(query) ||
    file.extension.toLowerCase().includes(query)
  )
})

onMounted(loadMedia)

async function loadMedia() {
  errorMessage.value = ''
  isLoading.value = true
  try {
    uploadedFiles.value = await $fetch<MediaFile[]>('/api/media')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Could not load uploaded files.'
  } finally {
    isLoading.value = false
  }
}

async function handleFileUpload(files: FileList | File[] | null) {
  if (!files?.length) return

  errorMessage.value = ''
  statusMessage.value = ''
  const selectedFiles = Array.from(files)
  if (selectedFiles.length > 20) {
    errorMessage.value = 'You can upload up to 20 files at a time.'
    return
  }
  const allowedTypes: Record<string, string[]> = {
    pdf: ['application/pdf'],
    ppt: ['application/vnd.ms-powerpoint', 'application/octet-stream'],
    pptx: ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/octet-stream'],
    jpg: ['image/jpeg'],
    jpeg: ['image/jpeg'],
    png: ['image/png'],
    gif: ['image/gif'],
    webp: ['image/webp']
  }
  const invalidFile = selectedFiles.find((file) => {
    const extension = file.name.split('.').pop()?.toLowerCase() || ''
    return !allowedTypes[extension] ||
      (file.type && !allowedTypes[extension].includes(file.type)) ||
      file.size > 10 * 1024 * 1024
  })

  if (invalidFile) {
    errorMessage.value = `${invalidFile.name} has an unsupported format or exceeds 10 MB.`
    return
  }
  if (selectedFiles.reduce((total, file) => total + file.size, 0) > 100 * 1024 * 1024) {
    errorMessage.value = 'The combined upload size cannot exceed 100 MB.'
    return
  }

  const body = new FormData()
  selectedFiles.forEach(file => body.append('files', file))
  isUploading.value = true

  try {
    const savedFiles = await $fetch<MediaFile[]>('/api/media', { method: 'POST', body })
    uploadedFiles.value = [...savedFiles, ...uploadedFiles.value]
    statusMessage.value = `${savedFiles.length} file${savedFiles.length === 1 ? '' : 's'} uploaded successfully.`
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Could not upload the selected file.'
  } finally {
    isUploading.value = false
  }
}

function handleInputChange(event: Event) {
  const input = event.target as HTMLInputElement
  void handleFileUpload(input.files)
  input.value = ''
}

function handleDrop(event: DragEvent) {
  isDragging.value = false
  void handleFileUpload(event.dataTransfer?.files ?? null)
}

async function deleteFile(file: MediaFile) {
  if (!window.confirm(`Delete "${file.name}"?`)) return

  errorMessage.value = ''
  statusMessage.value = ''
  try {
    await $fetch(`/api/media/${file.id}`, { method: 'DELETE' })
    uploadedFiles.value = uploadedFiles.value.filter(item => item.id !== file.id)
    statusMessage.value = `${file.name} deleted.`
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Could not delete the file.'
  }
}

async function copyLink(url: string) {
  try {
    await navigator.clipboard.writeText(new URL(url, window.location.origin).href)
    statusMessage.value = 'File link copied to clipboard.'
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Could not copy the file link.'
  }
}

async function shareFile(file: MediaFile) {
  const url = new URL(file.url, window.location.origin).href
  if (!navigator.share) {
    await copyLink(file.url)
    return
  }

  try {
    await navigator.share({ title: file.name, url })
    statusMessage.value = 'Share link opened.'
    errorMessage.value = ''
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return
    errorMessage.value = error instanceof Error ? error.message : 'Could not share the file.'
  }
}

function openImage(file: MediaFile) {
  selectedImage.value = file
}

function closeImage() {
  selectedImage.value = null
}

function formatSize(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}
</script>

<template>
  <div class="space-y-6">
    <div class="max-w-6xl mx-auto">
      
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 class="text-2xl font-black text-slate-100">Media & File Manager</h1>
          <p class="text-slate-400 text-sm mt-1">Upload and manage PDFs, PowerPoint presentations, and gallery images.</p>
        </div>
        <div class="text-sm bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-slate-300">
          Total files: <span class="font-bold text-blue-400">{{ uploadedFiles.length }}</span>
        </div>
      </div>

      <!-- Upload Dropzone Area -->
      <div 
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop($event)"
        :class="['border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 mb-6 cursor-pointer flex flex-col items-center justify-center', 
          isDragging ? 'border-blue-500 bg-blue-600/10' : 'border-slate-800 bg-slate-900/50 hover:border-blue-300 hover:bg-slate-900'
        ]"
        @click="fileInput?.click()"
      >
        <input 
          type="file" 
          ref="fileInput"
          multiple
          accept=".pdf,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.webp,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,image/jpeg,image/png,image/gif,image/webp"
          class="hidden" 
          @change="handleInputChange"
        />
        
        <div class="w-14 h-14 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-600 mb-4 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-slate-100 mb-1">Drop files here to add to your gallery</h3>
        <p class="text-xs text-slate-400 max-w-sm mb-4">PDF, PPT, PPTX, JPG, PNG, GIF, or WEBP. Up to 20 files, 10 MB each, and 100 MB total per upload.</p>
        <button type="button" class="bg-blue-600 hover:bg-sky-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/20" @click.stop="fileInput?.click()" :disabled="isUploading">
          {{ isUploading ? 'Uploading...' : 'Browse Files' }}
        </button>
      </div>

      <p v-if="errorMessage" role="alert" class="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{{ errorMessage }}</p>
      <p v-if="statusMessage" role="status" class="mb-4 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm text-blue-600">{{ statusMessage }}</p>

      <!-- Stored Images / Files Grid Section -->
      <div>
        <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>Gallery</span>
            <span class="text-sm font-semibold text-slate-400">({{ filteredFiles.length }})</span>
          </h2>
          <label class="relative block w-full sm:max-w-xs">
            <span class="sr-only">Search uploaded files</span>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search files..."
              class="w-full rounded-xl border border-slate-700 bg-slate-900/60 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path stroke-linecap="round" d="m20 20-4-4" />
            </svg>
          </label>
        </div>

        <div v-if="isLoading" role="status" class="rounded-2xl border border-slate-800 bg-slate-900/30 py-12 text-center text-sm text-slate-400">
          Loading files...
        </div>

        <!-- Empty State -->
        <div v-else-if="uploadedFiles.length === 0" class="text-center py-16 bg-slate-900/30 border border-slate-800/80 rounded-2xl">
          <p class="text-slate-400 text-sm">No files uploaded yet.</p>
        </div>

        <div v-else-if="filteredFiles.length === 0" class="text-center py-16 bg-slate-900/30 border border-slate-800/80 rounded-2xl">
          <p class="text-slate-400 text-sm">No files match “{{ searchQuery }}”.</p>
        </div>

        <!-- Gallery Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="file in filteredFiles" 
            :key="file.id"
            class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700 transition duration-300 shadow-xl flex flex-col justify-between"
          >
            <button v-if="file.kind === 'image'" type="button" class="relative flex h-40 w-full flex-col items-center justify-center gap-3 overflow-hidden bg-slate-950 text-sky-400 transition hover:bg-slate-900" :aria-label="`View ${file.name} full size`" @click="openImage(file)">
              <img :src="file.url" :alt="file.name" class="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
              <span class="absolute left-3 top-3 rounded-md bg-slate-950/75 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">View full image</span>
              <span class="absolute bottom-3 rounded-md border border-white/10 bg-slate-950/80 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">{{ formatSize(file.size) }}</span>
            </button>
            <a v-else :href="file.url" target="_blank" rel="noopener noreferrer" class="relative flex h-40 flex-col items-center justify-center gap-3 overflow-hidden bg-slate-950 text-sky-400 transition hover:bg-slate-900" :aria-label="`Open ${file.name} in a new tab`">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 3.75h7.5L19 8.25v12A1.75 1.75 0 0 1 17.25 22h-10A1.75 1.75 0 0 1 5.5 20.25V5.5A1.75 1.75 0 0 1 7.25 3.75Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 4v5h5M8 15h8M8 18h6" />
              </svg>
              <span class="text-xs font-bold uppercase tracking-widest text-slate-300">{{ file.extension }} document</span>
              <span class="absolute bottom-3 rounded-md border border-white/10 bg-slate-950/80 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">{{ formatSize(file.size) }}</span>
            </a>

            <!-- File Details & Actions -->
            <div class="p-4 flex flex-col gap-3">
              <div class="min-w-0">
                <h4 class="text-sm font-semibold text-slate-100 truncate" :title="file.name">{{ file.name }}</h4>
                <p class="text-[11px] text-slate-400 mt-1">{{ file.extension.toUpperCase() }} · Uploaded: {{ new Date(file.date).toLocaleDateString() }}</p>
              </div>

              <div class="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                <button 
                  type="button"
                  @click="shareFile(file)"
                  class="flex-1 rounded-xl bg-blue-600/10 py-2 text-xs font-medium text-blue-400 transition hover:bg-blue-600/20"
                >
                  Share
                </button>
                <button 
                  type="button"
                  @click="copyLink(file.url)"
                  class="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  Copy link
                </button>
                <button 
                  type="button"
                  @click="deleteFile(file)"
                  class="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium p-2 rounded-xl border border-red-500/20 transition"
                  :aria-label="`Delete ${file.name}`"
                  title="Delete file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div
      v-if="selectedImage"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      :aria-label="`Full-size image: ${selectedImage.name}`"
      @click.self="closeImage"
      @keydown.esc.window="closeImage"
    >
      <div class="relative flex max-h-full w-full max-w-6xl flex-col items-center gap-4">
        <div class="flex w-full items-center justify-between gap-4 text-white">
          <p class="min-w-0 truncate text-sm font-semibold">{{ selectedImage.name }}</p>
          <button type="button" class="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/20" aria-label="Close full-size image" @click="closeImage">
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <img :src="selectedImage.url" :alt="selectedImage.name" class="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl" />
        <div class="flex items-center gap-3">
          <button type="button" class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600" @click="shareFile(selectedImage)">Share image</button>
          <button type="button" class="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20" @click="copyLink(selectedImage.url)">Copy image link</button>
        </div>
      </div>
    </div>
  </div>
</template>