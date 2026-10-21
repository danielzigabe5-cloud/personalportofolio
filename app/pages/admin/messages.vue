<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

definePageMeta({
  layout: 'admin'
})

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  isRead: boolean
}

/* =====================================================
   DEFAULT DATA & LOCAL STORAGE
===================================================== */
const defaultMessages: ContactMessage[] = [
  {
    id: '1',
    name: 'Abel Tesfaye',
    email: 'abel@techsolutions.et',
    subject: 'E-commerce Web Application Project',
    message: 'Hello Daniel, I saw your portfolio and was really impressed by your Nuxt & Tailwind projects. We are looking for a frontend developer to build a modern dashboard for our client. Are you available for a freelance contract?',
    createdAt: '10 minutes ago',
    isRead: false
  },
  {
    id: '2',
    name: 'Mekdes Kassa',
    email: 'mekdes@company.et',
    subject: 'Full Stack Developer Opportunity',
    message: 'Dear Daniel, our recruitment team reviewed your GitHub and portfolio. We would love to schedule a 20-minute introductory call this week if you are open to new opportunities.',
    createdAt: '2 hours ago',
    isRead: false
  },
  {
    id: '3',
    name: 'Thomas Samuel',
    email: 'thomas@startup.io',
    subject: 'Nuxt 3 Consultation',
    message: 'Hi, I need assistance in architecting an SSR project with Pinia and Laravel backend. Could you please share your hourly consulting rate?',
    createdAt: 'Yesterday',
    isRead: true
  },
  {
    id: '4',
    name: 'John Daniel',
    email: 'john@creativeagency.com',
    subject: 'Mobile App with Flutter',
    message: 'Hey Daniel, we have a Flutter UI that needs integration with a Laravel REST API. Let us know if you have bandwidth to take on this project next month.',
    createdAt: '3 days ago',
    isRead: true
  }
]

const messages = ref<ContactMessage[]>([])
const activeFilter = ref<'all' | 'unread' | 'read'>('all')
const searchQuery = ref('')

// Load from LocalStorage (Syncs with Dashboard)
onMounted(() => {
  const saved = localStorage.getItem('portfolio_messages')
  if (saved) {
    try {
      messages.value = JSON.parse(saved)
    } catch {
      messages.value = defaultMessages
    }
  } else {
    messages.value = defaultMessages
  }
})

// Auto-sync to LocalStorage
watch(
  messages,
  (newVal) => {
    if (import.meta.client) {
      localStorage.setItem('portfolio_messages', JSON.stringify(newVal))
    }
  },
  { deep: true }
)

/* =====================================================
   COMPUTED COUNTERS & FILTERING
===================================================== */
const unreadCount = computed(() => messages.value.filter(m => !m.isRead).length)
const readCount = computed(() => messages.value.filter(m => m.isRead).length)

const filteredMessages = computed(() => {
  return messages.value.filter(msg => {
    // 1. Status Filter
    if (activeFilter.value === 'unread' && msg.isRead) return false
    if (activeFilter.value === 'read' && !msg.isRead) return false

    // 2. Search Query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const matchName = msg.name.toLowerCase().includes(q)
      const matchEmail = msg.email.toLowerCase().includes(q)
      const matchSubject = msg.subject.toLowerCase().includes(q)
      const matchBody = msg.message.toLowerCase().includes(q)
      return matchName || matchEmail || matchSubject || matchBody
    }

    return true
  })
})

/* =====================================================
   MESSAGE ACTIONS
===================================================== */
const selectedMessage = ref<ContactMessage | null>(null)
const isModalOpen = ref(false)

const openMessage = (msg: ContactMessage) => {
  selectedMessage.value = msg
  msg.isRead = true // Automatically mark as read when opened
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedMessage.value = null
}

const toggleReadStatus = (msg: ContactMessage, event?: Event) => {
  if (event) event.stopPropagation()
  msg.isRead = !msg.isRead
}

const deleteMessage = (id: string, event?: Event) => {
  if (event) event.stopPropagation()
  if (confirm('ይህንን መልዕክት ማጥፋት እርግጠኛ ነዎት?')) {
    messages.value = messages.value.filter(m => m.id !== id)
    if (selectedMessage.value?.id === id) {
      closeModal()
    }
  }
}

const markAllAsRead = () => {
  messages.value.forEach(m => (m.isRead = true))
}
</script>

<template>
  <div class="space-y-6">

    <!-- =================================================
         PAGE HEADER
    ================================================== -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-100 flex items-center gap-3">
          Messages
          <span
            v-if="unreadCount > 0"
            class="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30"
          >
            {{ unreadCount }} new
          </span>
        </h1>
        <p class="mt-1 text-sm text-slate-400">
          Client inquiries and contact form submissions.
        </p>
      </div>

      <!-- BULK ACTION -->
      <button
        v-if="unreadCount > 0"
        type="button"
        @click="markAllAsRead"
        class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-bold text-slate-300 transition duration-300 hover:border-blue-500 hover:text-white"
      >
        <span>✓✓</span>
        Mark all as read
      </button>
    </div>

    <!-- =================================================
         SUMMARY STATS
    ================================================== -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <!-- Total Messages -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Messages</p>
        <p class="mt-2 text-3xl font-black text-slate-100">{{ messages.length }}</p>
      </div>

      <!-- Unread Messages -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Unread</p>
        <p class="mt-2 text-3xl font-black text-amber-400">{{ unreadCount }}</p>
      </div>

      <!-- Read Messages -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Read & Processed</p>
        <p class="mt-2 text-3xl font-black text-emerald-400">{{ readCount }}</p>
      </div>
    </div>

    <!-- =================================================
         SEARCH & FILTER BAR
    ================================================== -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <!-- TABS -->
      <div class="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 p-1 w-fit">
        <button
          type="button"
          @click="activeFilter = 'all'"
          :class="[
            'rounded-lg px-4 py-1.5 text-xs font-bold transition',
            activeFilter === 'all'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200'
          ]"
        >
          All ({{ messages.length }})
        </button>

        <button
          type="button"
          @click="activeFilter = 'unread'"
          :class="[
            'rounded-lg px-4 py-1.5 text-xs font-bold transition',
            activeFilter === 'unread'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200'
          ]"
        >
          Unread ({{ unreadCount }})
        </button>

        <button
          type="button"
          @click="activeFilter = 'read'"
          :class="[
            'rounded-lg px-4 py-1.5 text-xs font-bold transition',
            activeFilter === 'read'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200'
          ]"
        >
          Read ({{ readCount }})
        </button>
      </div>

      <!-- SEARCH INPUT -->
      <div class="relative w-full sm:w-72">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by sender, email, keyword..."
          class="w-full rounded-xl border border-slate-700 bg-slate-800/80 pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <span class="absolute left-3 top-2.5 text-xs text-slate-500">🔍</span>
      </div>
    </div>

    <!-- =================================================
         MESSAGES LIST
    ================================================== -->
    <div v-if="filteredMessages.length > 0" class="space-y-3">
      <div
        v-for="msg in filteredMessages"
        :key="msg.id"
        @click="openMessage(msg)"
        class="group relative flex cursor-pointer flex-col gap-4 rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between"
        :class="[
          !msg.isRead
            ? 'border-blue-500/30 bg-slate-800/90 shadow-md shadow-blue-950/20'
            : 'border-slate-700 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-800/70'
        ]"
      >
        <div class="flex items-start gap-4 min-w-0 flex-1">
          <!-- AVATAR -->
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-black text-sm shadow-inner"
            :class="!msg.isRead ? 'bg-blue-600 text-white' : 'bg-slate-700/60 text-slate-400'"
          >
            {{ msg.name.slice(0, 2).toUpperCase() }}
          </div>

          <!-- SENDER & SUBJECT -->
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-100 text-sm truncate">{{ msg.name }}</span>
              <span v-if="!msg.isRead" class="h-2 w-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></span>
              <span class="text-xs text-slate-400 truncate">· {{ msg.email }}</span>
            </div>

            <h3 class="mt-1 text-xs font-bold text-slate-200 truncate">
              {{ msg.subject }}
            </h3>

            <p class="mt-1 text-xs text-slate-400 line-clamp-1">
              {{ msg.message }}
            </p>
          </div>
        </div>

        <!-- TIME & ACTION CONTROLS -->
        <div class="flex items-center justify-between gap-3 border-t border-slate-700/60 pt-3 sm:border-0 sm:pt-0">
          <span class="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
            {{ msg.createdAt }}
          </span>

          <div class="flex items-center gap-1 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
            <!-- TOGGLE READ STATUS -->
            <button
              type="button"
              @click="toggleReadStatus(msg, $event)"
              class="rounded-lg p-2 text-xs font-bold text-slate-400 hover:bg-slate-700 hover:text-white"
              :title="msg.isRead ? 'Mark as Unread' : 'Mark as Read'"
            >
              {{ msg.isRead ? '📩' : '✉️' }}
            </button>

            <!-- DELETE -->
            <button
              type="button"
              @click="deleteMessage(msg.id, $event)"
              class="rounded-lg p-2 text-xs font-bold text-red-400/80 hover:bg-red-500/10 hover:text-red-400"
              title="Delete Message"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- =================================================
         EMPTY STATE
    ================================================== -->
    <div
      v-else
      class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-800/20 py-16 text-center"
    >
      <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-2xl text-slate-400">
        📬
      </div>
      <h3 class="mt-4 text-base font-bold text-slate-200">ምንም መልዕክት አልተገኘም</h3>
      <p class="mt-1 text-xs text-slate-400">
        {{ searchQuery ? 'ከፈለግከው ቃል ጋር የሚዛመድ መልዕክት የለም።' : 'በአሁኑ ሰዓት ምንም የመጣ አዲስ መልዕክት የለም።' }}
      </p>
      <button
        v-if="searchQuery || activeFilter !== 'all'"
        type="button"
        @click="searchQuery = ''; activeFilter = 'all'"
        class="mt-4 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-blue-400 hover:bg-slate-700"
      >
        Clear filters
      </button>
    </div>

    <!-- =================================================
         MODAL: READ MESSAGE DETAIL
    ================================================== -->
    <Teleport to="body">
      <div
        v-if="isModalOpen && selectedMessage"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      >
        <div class="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
          <!-- TOP -->
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span class="text-xs uppercase font-bold text-blue-400">Client Inquiry</span>
              <h3 class="text-lg font-black text-slate-100 mt-0.5">
                {{ selectedMessage.subject }}
              </h3>
            </div>
            <button
              @click="closeModal"
              class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              ✕
            </button>
          </div>

          <!-- SENDER DETAILS -->
          <div class="mt-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/40 p-4">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-sm font-bold text-blue-400">
                {{ selectedMessage.name.slice(0, 2).toUpperCase() }}
              </div>
              <div>
                <p class="text-sm font-bold text-slate-100">{{ selectedMessage.name }}</p>
                <p class="text-xs text-slate-400">{{ selectedMessage.email }}</p>
              </div>
            </div>
            <span class="text-xs text-slate-500 font-semibold">{{ selectedMessage.createdAt }}</span>
          </div>

          <!-- MESSAGE BODY -->
          <div class="mt-4 rounded-xl border border-slate-800 bg-slate-950/40 p-5 text-sm text-slate-200 leading-relaxed max-h-64 overflow-y-auto">
            {{ selectedMessage.message }}
          </div>

          <!-- ACTIONS -->
          <div class="mt-6 flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              @click="deleteMessage(selectedMessage.id)"
              class="rounded-xl px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/10 transition"
            >
              Delete
            </button>

            <div class="flex items-center gap-3">
              <button
                type="button"
                @click="closeModal"
                class="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                Close
              </button>

              <a
                :href="`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`"
                class="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition"
              >
                <span>✉️</span>
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>