<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  time: string
  isRead: boolean
}

interface Activity {
  title: string
  description: string
  time: string
  icon: string
}

/* =====================================================
   DYNAMIC STATE (CONNECTED TO OTHER PAGES)
===================================================== */
const { data: profile } = await useProfile()
const adminName = computed(() => profile.value.name.trim().split(/\s+/)[0] || 'Admin')
const projectsCount = ref(0)
const skillsCount = ref(0)
const visitorCount = ref('1.4K')

// Default Sample Messages
const defaultMessages: Message[] = [
  {
    id: '1',
    name: 'Abel Tesfaye',
    email: 'abel@example.com',
    subject: 'Web Development Project',
    message: 'Hello Daniel, I saw your portfolio and would like to discuss building an e-commerce platform for our company.',
    time: '25m ago',
    isRead: false
  },
  {
    id: '2',
    name: 'Mekdes K.',
    email: 'mekdes@company.et',
    subject: 'Job Opportunity',
    message: 'We have an opening for a Full-Stack developer position. Would love to schedule a quick interview.',
    time: '2h ago',
    isRead: false
  },
  {
    id: '3',
    name: 'Thomas S.',
    email: 'thomas@startup.io',
    subject: 'Consultation Request',
    message: 'Hi, I need assistance in architecting a Nuxt 3 and Laravel backend application. Are you available?',
    time: '5h ago',
    isRead: true
  },
  {
    id: '4',
    name: 'John Daniel',
    email: 'john@tech.com',
    subject: 'Collaboration inquiry',
    message: 'Great portfolio! Would you be open to collaborating on an upcoming open-source mobile app?',
    time: 'Yesterday',
    isRead: true
  }
]

const messages = ref<Message[]>([])

const activities = ref<Activity[]>([
  {
    title: 'Project Updated',
    description: 'CombolojoSPORT details were modified.',
    time: '15 minutes ago',
    icon: '🚀'
  },
  {
    title: 'New Message Received',
    description: 'Inquiry from Abel Tesfaye.',
    time: '25 minutes ago',
    icon: '📬'
  },
  {
    title: 'Profile Updated',
    description: 'Profile information was synced.',
    time: 'Yesterday',
    icon: '👤'
  },
  {
    title: 'New Skill Added',
    description: 'Nuxt 4 framework added to skills list.',
    time: '2 days ago',
    icon: '💻'
  }
])

/* =====================================================
   FETCH DATA FROM LOCALSTORAGE
===================================================== */
onMounted(() => {
  // Fetch Projects Count
  const savedProjects = localStorage.getItem('portfolio_projects')
  if (savedProjects) {
    try {
      projectsCount.value = JSON.parse(savedProjects).length
    } catch {
      projectsCount.value = 3
    }
  } else {
    projectsCount.value = 3
  }

  // 3. Fetch Skills Count
  const savedSkills = localStorage.getItem('portfolio_skills')
  if (savedSkills) {
    try {
      skillsCount.value = JSON.parse(savedSkills).length
    } catch {
      skillsCount.value = 8
    }
  } else {
    skillsCount.value = 8
  }

  // 4. Fetch Messages
  const savedMessages = localStorage.getItem('portfolio_messages')
  if (savedMessages) {
    try {
      messages.value = JSON.parse(savedMessages)
    } catch {
      messages.value = defaultMessages
    }
  } else {
    messages.value = defaultMessages
    localStorage.setItem('portfolio_messages', JSON.stringify(defaultMessages))
  }
})

// Unread Messages Count
const unreadCount = computed(() => {
  return messages.value.filter(m => !m.isRead).length
})

/* =====================================================
   MESSAGE VIEW MODAL LOGIC
===================================================== */
const selectedMessage = ref<Message | null>(null)
const isMessageModalOpen = ref(false)

const openMessage = (msg: Message) => {
  selectedMessage.value = msg
  msg.isRead = true // Mark as read
  isMessageModalOpen.value = true

  // Persist updated read status
  if (import.meta.client) {
    localStorage.setItem('portfolio_messages', JSON.stringify(messages.value))
  }
}

const closeMessageModal = () => {
  isMessageModalOpen.value = false
  selectedMessage.value = null
}

const deleteSelectedMessage = () => {
  if (!selectedMessage.value) return
  messages.value = messages.value.filter(m => m.id !== selectedMessage.value?.id)
  localStorage.setItem('portfolio_messages', JSON.stringify(messages.value))
  closeMessageModal()
}
</script>

<template>
  <div class="space-y-8">

    <!-- =================================================
         WELCOME
    ================================================== -->
    <section class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-2xl font-black text-slate-100 sm:text-3xl">
          Welcome back, {{ adminName }}! 👋
        </h2>
        <p class="mt-1 text-sm text-slate-400">
          Here is your live portfolio overview and incoming client activity.
        </p>
      </div>

      <!-- LIVE SYSTEM STATUS -->
      <div class="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 w-fit">
        <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="text-xs font-bold text-emerald-400">All Systems Active</span>
      </div>
    </section>

    <!-- =================================================
         STATS (CONNECTED TO REAL DATA)
    ================================================== -->
    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      <!-- PROJECTS STAT -->
      <NuxtLink
        to="/admin/projects"
        class="group rounded-2xl border border-slate-700 bg-slate-800/50 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-800"
      >
        <div class="flex items-center justify-between">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-xl text-blue-400 border border-blue-500/20">
            🚀
          </div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-blue-400">
            Active Works
          </span>
        </div>
        <div class="mt-5">
          <div class="text-3xl font-black text-slate-100">{{ projectsCount }}</div>
          <div class="mt-1 text-xs text-slate-400">Total Projects</div>
        </div>
      </NuxtLink>

      <!-- SKILLS STAT -->
      <NuxtLink
        to="/admin/skills"
        class="group rounded-2xl border border-slate-700 bg-slate-800/50 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-800"
      >
        <div class="flex items-center justify-between">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-xl text-blue-400 border border-blue-500/20">
            ⚡
          </div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-blue-400">
            Proficiencies
          </span>
        </div>
        <div class="mt-5">
          <div class="text-3xl font-black text-slate-100">{{ skillsCount }}</div>
          <div class="mt-1 text-xs text-slate-400">Technologies Listed</div>
        </div>
      </NuxtLink>

      <!-- MESSAGES STAT -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
        <div class="flex items-center justify-between">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-xl text-amber-400 border border-amber-500/20">
            📬
          </div>
          <span
            v-if="unreadCount > 0"
            class="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300"
          >
            {{ unreadCount }} Unread
          </span>
          <span v-else class="text-[10px] font-bold text-slate-400">
            All Read
          </span>
        </div>
        <div class="mt-5">
          <div class="text-3xl font-black text-slate-100">{{ messages.length }}</div>
          <div class="mt-1 text-xs text-slate-400">Total Inquiries</div>
        </div>
      </div>

      <!-- VISITORS STAT -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
        <div class="flex items-center justify-between">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-xl text-emerald-400 border border-emerald-500/20">
            👁️
          </div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            +18% this month
          </span>
        </div>
        <div class="mt-5">
          <div class="text-3xl font-black text-slate-100">{{ visitorCount }}</div>
          <div class="mt-1 text-xs text-slate-400">Portfolio Visitors</div>
        </div>
      </div>

    </section>

    <!-- =================================================
         ACTIVITY & MESSAGES SECTION
    ================================================== -->
    <section class="grid grid-cols-1 gap-6 xl:grid-cols-3">

      <!-- =================================================
           RECENT MESSAGES (INTERACTIVE)
      ================================================== -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 xl:col-span-2">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-black text-slate-100">Recent Messages</h3>
              <span
                v-if="unreadCount > 0"
                class="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white"
              >
                {{ unreadCount }} new
              </span>
            </div>
            <p class="mt-1 text-xs text-slate-500">Click any message to read full details</p>
          </div>

          <NuxtLink to="/admin/messages" class="text-xs font-bold text-blue-400 transition hover:text-blue-300">
            View all →
          </NuxtLink>
        </div>

        <!-- MESSAGES LIST -->
        <div v-if="messages.length > 0" class="space-y-3">
          <div
            v-for="msg in messages.slice(0, 4)"
            :key="msg.id"
            @click="openMessage(msg)"
            class="group flex cursor-pointer items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-900/40 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-900"
          >
            <!-- AVATAR -->
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-xs"
              :class="!msg.isRead ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'"
            >
              {{ msg.name.slice(0, 2).toUpperCase() }}
            </div>

            <!-- MESSAGE INFO -->
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-100 truncate text-sm">{{ msg.name }}</span>
                <span v-if="!msg.isRead" class="h-2 w-2 rounded-full bg-blue-500"></span>
              </div>
              <p class="truncate text-xs text-slate-400 mt-0.5 font-medium">
                {{ msg.subject }}
              </p>
              <p class="truncate text-xs text-slate-500">
                {{ msg.message }}
              </p>
            </div>

            <!-- TIME -->
            <span class="text-[10px] text-slate-500 whitespace-nowrap">
              {{ msg.time }}
            </span>
          </div>
        </div>

        <div v-else class="py-10 text-center text-xs text-slate-500">
          No messages received yet.
        </div>
      </div>

      <!-- =================================================
           ACTIVITY
      ================================================== -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
        <h3 class="font-black text-slate-100">Activity</h3>
        <p class="mt-1 text-xs text-slate-500">Recent portfolio milestones</p>

        <div class="mt-6 space-y-6">
          <div v-for="activity in activities" :key="activity.title" class="flex gap-3">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-base border border-blue-500/20">
              {{ activity.icon }}
            </div>
            <div>
              <p class="text-sm font-bold text-slate-100">{{ activity.title }}</p>
              <p class="mt-1 text-xs text-slate-400">{{ activity.description }}</p>
              <p class="mt-1 text-[10px] text-slate-500">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- =================================================
         QUICK ACTIONS
    ================================================== -->
    <section>
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
        <div class="mb-5">
          <h3 class="text-lg font-black text-slate-100">Quick Actions</h3>
          <p class="mt-1 text-xs text-slate-500">Shortcuts to manage your portfolio</p>
        </div>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <!-- PROJECTS -->
          <NuxtLink
            to="/admin/projects"
            class="rounded-xl border border-slate-700 bg-slate-900/50 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-900"
          >
            <div class="text-xl">🚀</div>
            <div class="mt-2 text-sm font-bold text-slate-100">Manage Projects</div>
            <div class="mt-1 text-xs text-slate-500">Add or edit showcase works</div>
          </NuxtLink>

          <!-- SKILLS -->
          <NuxtLink
            to="/admin/skills"
            class="rounded-xl border border-slate-700 bg-slate-900/50 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-900"
          >
            <div class="text-xl">💻</div>
            <div class="mt-2 text-sm font-bold text-slate-100">Manage Skills</div>
            <div class="mt-1 text-xs text-slate-500">Update proficiency levels</div>
          </NuxtLink>

          <!-- EDUCATION -->
          <NuxtLink
            to="/admin/education"
            class="rounded-xl border border-slate-700 bg-slate-900/50 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-900"
          >
            <div class="text-xl">🎓</div>
            <div class="mt-2 text-sm font-bold text-slate-100">Manage Education</div>
            <div class="mt-1 text-xs text-slate-500">Academic background</div>
          </NuxtLink>

          <!-- PROFILE -->
          <NuxtLink
            to="/admin/profile"
            class="rounded-xl border border-slate-700 bg-slate-900/50 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-900"
          >
            <div class="text-xl">👤</div>
            <div class="mt-2 text-sm font-bold text-slate-100">Edit Profile</div>
            <div class="mt-1 text-xs text-slate-500">Update personal bio & photo</div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- =================================================
         MODAL: READ MESSAGE DETAIL
    ================================================== -->
    <Teleport to="body">
      <div
        v-if="isMessageModalOpen && selectedMessage"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      >
        <div class="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span class="text-xs uppercase font-bold text-blue-400">Contact Inquiry</span>
              <h3 class="text-lg font-bold text-slate-100 mt-0.5">
                {{ selectedMessage.subject }}
              </h3>
            </div>
            <button
              @click="closeMessageModal"
              class="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div class="mt-4 space-y-4">
            <!-- Sender details -->
            <div class="flex items-center justify-between rounded-xl bg-slate-800/60 p-3">
              <div>
                <p class="text-xs font-bold text-slate-200">{{ selectedMessage.name }}</p>
                <p class="text-xs text-slate-400">{{ selectedMessage.email }}</p>
              </div>
              <span class="text-[10px] text-slate-500 font-semibold">{{ selectedMessage.time }}</span>
            </div>

            <!-- Message content -->
            <div class="rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-300 leading-relaxed">
              {{ selectedMessage.message }}
            </div>

            <!-- Actions -->
            <div class="mt-6 flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                @click="deleteSelectedMessage"
                class="rounded-xl px-4 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/10"
              >
                Delete Message
              </button>

              <div class="flex gap-2">
                <a
                  :href="`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`"
                  class="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-500"
                >
                  Reply via Email ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>