<script setup lang="ts">

const route = useRoute()

const menuItems = [
  {
    name: 'Dashboard',
    icon: '📊',
    path: '/admin'
  },
  {
    name: 'Projects',
    icon: '🚀',
    path: '/admin/projects'
  },
  {
    name: 'Skills',
    icon: '💻',
    path: '/admin/skills'
  },
  {
    name: 'Experience',
    icon: '💼',
    path: '/admin/experience'
  },
  {
    name: 'Education',
    icon: '🎓',
    path: '/admin/education'
  },
  {
    name: 'Messages',
    icon: '📬',
    path: '/admin/messages'
  },
  {
    name: 'Profile',
    icon: '👤',
    path: '/admin/profile'
  },
  {
    name: 'Settings',
    icon: '⚙️',
    path: '/admin/settings'
  }
]

const isActive = (path: string) => {
  if (path === '/admin') {
    return route.path === '/admin'
  }

  return route.path.startsWith(path)
}

</script>

<template>

  <aside
    class="
      fixed inset-y-0 left-0 z-50
      hidden w-64 flex-col
      border-r border-indigo-900/40
      bg-slate-950
      lg:flex
    "
  >

    <!-- Logo -->
    <div class="flex h-20 items-center border-b border-indigo-900/40 px-6">

      <NuxtLink
        to="/admin"
        class="flex items-center gap-3"
      >

        <div
          class="
            flex h-10 w-10 items-center justify-center
            rounded-xl bg-violet-600
            font-black text-white
            ring-2 ring-violet-400/30
            shadow-[0_0_12px_rgba(139,92,246,0.35)]
          "
        >
          DZ
        </div>

        <div>
          <div class="font-black text-slate-100">
            DZ Admin
          </div>

          <div class="text-xs text-indigo-300/70">
            Panel
          </div>
        </div>

      </NuxtLink>

    </div>


    <!-- Navigation -->
    <nav class="flex-1 space-y-1 overflow-y-auto px-4 py-6">

      <div
        class="
          mb-4 px-3 text-[10px] font-bold
          uppercase tracking-[0.2em]
          text-indigo-300/60
        "
      >
        Management
      </div>

      <NuxtLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="
          group flex items-center gap-3 rounded-xl
          px-3 py-3 text-sm font-semibold
          transition
        "
        :class="
          isActive(item.path)
            ? 'bg-violet-600/15 text-violet-400 ring-1 ring-violet-500/30'
            : 'text-slate-400 hover:bg-indigo-950/50 hover:text-slate-100'
        "
      >

        <span class="text-lg">
          {{ item.icon }}
        </span>

        <span>
          {{ item.name }}
        </span>

      </NuxtLink>

    </nav>


    <!-- Bottom -->
    <div class="border-t border-indigo-900/40 p-4">

      <NuxtLink
        to="/"
        class="
          mb-2 flex items-center gap-3 rounded-xl
          px-3 py-3 text-sm text-slate-400
          transition
          hover:bg-indigo-950/50 hover:text-slate-100
        "
      >
        <span>🌐</span>
        View Site
      </NuxtLink>

      <button
        class="
          flex w-full items-center gap-3 rounded-xl
          px-3 py-3 text-sm text-red-400
          transition
          hover:bg-red-500/10 hover:text-red-300
        "
      >
        <span>🚪</span>
        Logout
      </button>

    </div>

  </aside>

</template>