<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

/* =====================================================
   DASHBOARD STATS
===================================================== */
const stats = [
  {
    label: 'Projects',
    value: '12',
    icon: '🚀',
    change: '+3 this month'
  },
  {
    label: 'Skills',
    value: '18',
    icon: '💻',
    change: '+2 added'
  },
  {
    label: 'Messages',
    value: '47',
    icon: '📬',
    change: '8 unread'
  },
  {
    label: 'Visitors',
    value: '1.2K',
    icon: '👁️',
    change: '+18% this month'
  }
]

/* =====================================================
   RECENT ACTIVITY
===================================================== */
const activities = [
  {
    title: 'New project added',
    description: 'CombolojoSPORT was added to projects.',
    time: '10 minutes ago',
    icon: '🚀'
  },
  {
    title: 'New message',
    description: 'You received a new contact message.',
    time: '1 hour ago',
    icon: '📬'
  },
  {
    title: 'Profile updated',
    description: 'Your profile information was updated.',
    time: 'Yesterday',
    icon: '👤'
  },
  {
    title: 'Skill updated',
    description: 'Nuxt.js skill was updated.',
    time: '2 days ago',
    icon: '💻'
  }
]
</script>

<template>
  <div class="space-y-8">

    <!-- =================================================
         WELCOME
    ================================================== -->
    <section>
      <h2 class="text-2xl font-black text-slate-100 sm:text-3xl">
        Welcome back, Daniel! 👋
      </h2>
      <p class="mt-2 text-sm text-slate-400">
        Here's what's happening with your portfolio today.
      </p>
    </section>

    <!-- =================================================
         STATS
    ================================================== -->
    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-2xl border border-slate-700 bg-slate-800/50 p-5 transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800"
      >
        <!-- TOP -->
        <div class="flex items-center justify-between">
          <!-- ICON -->
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-xl">
            {{ stat.icon }}
          </div>
          <!-- CHANGE -->
          <span class="text-[10px] font-bold uppercase tracking-wider text-blue-400">
            {{ stat.change }}
          </span>
        </div>

        <!-- VALUE -->
        <div class="mt-5">
          <div class="text-3xl font-black text-slate-100">
            {{ stat.value }}
          </div>
          <div class="mt-1 text-xs text-slate-400">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================
         ACTIVITY SECTION
    ================================================== -->
    <section class="grid grid-cols-1 gap-6 xl:grid-cols-3">

      <!-- =================================================
           RECENT MESSAGES
      ================================================== -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 xl:col-span-2">
        <!-- HEADER -->
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h3 class="font-black text-slate-100">Recent Messages</h3>
            <p class="mt-1 text-xs text-slate-500">Latest contact messages</p>
          </div>
          <!-- VIEW ALL -->
          <NuxtLink to="/admin/messages" class="text-xs font-bold text-blue-400 transition hover:text-blue-300">
            View all →
          </NuxtLink>
        </div>

        <!-- MESSAGES -->
        <div class="space-y-3">
          <div
            v-for="i in 4"
            :key="i"
            class="flex items-center gap-4 rounded-xl bg-slate-900/50 p-4 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-900"
          >
            <!-- AVATAR -->
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600/10 font-bold text-blue-400">
              {{ ['AB', 'MK', 'TS', 'JD'][i - 1] }}
            </div>

            <!-- MESSAGE -->
            <div class="min-w-0 flex-1">
              <div class="font-bold text-slate-100">
                {{ ['Abel Tesfaye', 'Mekdes K.', 'Thomas S.', 'John Daniel'][i - 1] }}
              </div>
              <p class="truncate text-xs text-slate-500">
                I'd like to discuss a possible project...
              </p>
            </div>

            <!-- TIME -->
            <span class="text-[10px] text-slate-500">
              {{ i }}h ago
            </span>
          </div>
        </div>
      </div>

      <!-- =================================================
           ACTIVITY
      ================================================== -->
      <div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
        <!-- TITLE -->
        <h3 class="font-black text-slate-100">Activity</h3>
        <p class="mt-1 text-xs text-slate-500">Recent portfolio activity</p>

        <!-- ACTIVITIES -->
        <div class="mt-6 space-y-6">
          <div v-for="activity in activities" :key="activity.title" class="flex gap-3">
            <!-- ICON -->
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10">
              {{ activity.icon }}
            </div>

            <!-- CONTENT -->
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
          <p class="mt-1 text-xs text-slate-500">Quickly manage your portfolio</p>
        </div>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <!-- PROJECTS -->
          <NuxtLink
            to="/admin/projects"
            class="rounded-xl border border-slate-700 bg-slate-900/50 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-900"
          >
            <div class="text-xl">🚀</div>
            <div class="mt-2 text-sm font-bold text-slate-100">Manage Projects</div>
            <div class="mt-1 text-xs text-slate-500">Add or edit projects</div>
          </NuxtLink>

          <!-- SKILLS -->
          <NuxtLink
            to="/admin/skills"
            class="rounded-xl border border-slate-700 bg-slate-900/50 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-900"
          >
            <div class="text-xl">💻</div>
            <div class="mt-2 text-sm font-bold text-slate-100">Manage Skills</div>
            <div class="mt-1 text-xs text-slate-500">Update your skills</div>
          </NuxtLink>

          <!-- MESSAGES -->
          <NuxtLink
            to="/admin/messages"
            class="rounded-xl border border-slate-700 bg-slate-900/50 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-900"
          >
            <div class="text-xl">📬</div>
            <div class="mt-2 text-sm font-bold text-slate-100">View Messages</div>
            <div class="mt-1 text-xs text-slate-500">Check contact messages</div>
          </NuxtLink>

          <!-- PROFILE -->
          <NuxtLink
            to="/admin/profile"
            class="rounded-xl border border-slate-700 bg-slate-900/50 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-900"
          >
            <div class="text-xl">👤</div>
            <div class="mt-2 text-sm font-bold text-slate-100">Edit Profile</div>
            <div class="mt-1 text-xs text-slate-500">Update your information</div>
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>