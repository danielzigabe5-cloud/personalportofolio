<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { defaultServices, type Service } from '~~/shared/utils/services'

definePageMeta({
  layout: 'admin'
})

const { data: services, error: servicesError, refresh } = await useFetch<Service[]>('/api/services', {
  default: () => defaultServices.map(service => ({ ...service }))
})
const showForm = ref(false)
const editingId = ref<string | null>(null)
const actionError = ref('')
const isSaving = ref(false)

const initialFormState = {
  title: '',
  description: '',
  image: '',
  to: '/contact',
  icon: ''
}

const form = reactive({ ...initialFormState })
const isEditing = computed(() => editingId.value !== null)

const resetForm = () => {
  Object.assign(form, initialFormState)
  editingId.value = null
}

const toggleForm = () => {
  actionError.value = ''
  if (showForm.value) {
    resetForm()
    showForm.value = false
  } else {
    resetForm()
    showForm.value = true
  }
}

const openEdit = (service: Service) => {
  editingId.value = service.id
  form.title = service.title
  form.description = service.description
  form.image = service.image
  form.to = service.to
  form.icon = service.icon
  showForm.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const saveService = async () => {
  actionError.value = ''
  isSaving.value = true

  const body = {
    title: form.title.trim(),
    description: form.description.trim(),
    image: form.image.trim(),
    to: form.to.trim() || '/contact',
    icon: form.icon.trim()
  }

  try {
    if (isEditing.value) {
      await $fetch(`/api/services/${editingId.value}`, { method: 'PUT', body })
    } else {
      await $fetch('/api/services', { method: 'POST', body })
    }
    await refresh()
    resetForm()
    showForm.value = false
  } catch (error) {
    actionError.value = error instanceof Error ? error.message : 'Unable to save service.'
  } finally {
    isSaving.value = false
  }
}

const deleteService = async (service: Service) => {
  if (!confirm(`Delete "${service.title}" from the public Services page?`)) return

  actionError.value = ''
  try {
    await $fetch(`/api/services/${service.id}`, { method: 'DELETE' })
    await refresh()
    if (editingId.value === service.id) {
      resetForm()
      showForm.value = false
    }
  } catch (error) {
    actionError.value = error instanceof Error ? error.message : 'Unable to delete service.'
  }
}
</script>

<template>
  <div class="space-y-6">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-100">Services</h1>
        <p class="mt-1 text-sm text-slate-400">Manage the services shown on your public Services page ({{ services.length }} total).</p>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500"
        @click="toggleForm"
      >
        <span class="text-lg leading-none">{{ showForm ? '×' : '+' }}</span>
        {{ showForm ? 'Cancel' : 'Add Service' }}
      </button>
    </header>

    <p v-if="actionError" role="alert" class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
      {{ actionError }}
    </p>
    <p v-if="servicesError" role="alert" class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
      Services could not be loaded. Please refresh the page and try again.
    </p>

    <form v-if="showForm" class="rounded-2xl border border-slate-700 bg-slate-800/60 p-6 shadow-xl" @submit.prevent="saveService">
      <div class="mb-5 flex items-center justify-between border-b border-slate-700/60 pb-4">
        <h2 class="text-lg font-black text-slate-100">{{ isEditing ? 'Edit Service' : 'Add New Service' }}</h2>
        <span v-if="isEditing" class="rounded-lg bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">Editing</span>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Service title *
          <input v-model="form.title" required maxlength="100" class="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm font-normal normal-case tracking-normal text-slate-100 focus:border-blue-500 focus:outline-none" placeholder="e.g. Website Development">
        </label>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Image URL or public path *
          <input v-model="form.image" required class="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm font-normal normal-case tracking-normal text-slate-100 focus:border-blue-500 focus:outline-none" placeholder="/images/services/website.jpg">
        </label>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Action link
          <input v-model="form.to" class="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm font-normal normal-case tracking-normal text-slate-100 focus:border-blue-500 focus:outline-none" placeholder="/contact">
        </label>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Icon SVG path
          <input v-model="form.icon" class="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm font-normal normal-case tracking-normal text-slate-100 focus:border-blue-500 focus:outline-none" placeholder="Optional SVG path data">
        </label>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 md:col-span-2">
          Description *
          <textarea v-model="form.description" required rows="3" class="mt-1 w-full resize-y rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm font-normal normal-case tracking-normal text-slate-100 focus:border-blue-500 focus:outline-none" placeholder="Describe the service"></textarea>
        </label>
      </div>

      <div class="mt-6 flex justify-end gap-3 border-t border-slate-700/60 pt-4">
        <button type="button" class="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-400 hover:bg-slate-700 hover:text-white" @click="toggleForm">Cancel</button>
        <button type="submit" :disabled="isSaving" class="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60">
          {{ isSaving ? 'Saving...' : isEditing ? 'Update Service' : 'Save Service' }}
        </button>
      </div>
    </form>

    <div v-if="services.length" class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article v-for="service in services" :key="service.id" class="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50">
        <img :src="service.image" :alt="service.title" class="h-40 w-full bg-slate-900 object-cover" loading="lazy">
        <div class="p-5">
          <h2 class="text-lg font-black text-slate-100">{{ service.title }}</h2>
          <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">{{ service.description }}</p>
          <div class="mt-5 flex items-center justify-between border-t border-slate-700/60 pt-4">
            <span class="truncate text-xs text-slate-500">{{ service.to }}</span>
            <div class="flex shrink-0 items-center gap-1">
              <button type="button" class="rounded-lg px-2.5 py-1 text-xs font-bold text-slate-400 transition hover:bg-slate-700 hover:text-white" @click="openEdit(service)">Edit</button>
              <button type="button" class="rounded-lg px-2.5 py-1 text-xs font-bold text-red-400/80 transition hover:bg-red-500/10 hover:text-red-400" @click="deleteService(service)">Delete</button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <div v-else class="rounded-2xl border border-dashed border-slate-700 py-16 text-center text-slate-400">
      <p class="text-base font-semibold text-slate-200">No services found.</p>
      <p class="mt-1 text-sm">Add a service to display it on your public page.</p>
    </div>
  </div>
</template>
