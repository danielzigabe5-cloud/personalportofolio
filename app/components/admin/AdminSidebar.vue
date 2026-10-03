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
      border-r border-slate-800
      bg-[#050b14]
      lg:flex
    "
  >

    <!-- Logo -->
    <div class="flex h-20 items-center border-b border-slate-800 px-6">

      <NuxtLink
        to="/admin"
        class="flex items-center gap-3"
      >

        <div
          class="
            flex h-10 w-10 items-center justify-center
            rounded-xl bg-[#39ff14]
            font-black text-[#020617]
          "
        >
          DZ
        </div>

        <div>
          <div class="font-black text-white">
            DZ Admin
          </div>

          <div class="text-xs text-slate-500">
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
          text-slate-600
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
            ? 'bg-[#39ff14]/10 text-[#39ff14]'
            : 'text-slate-400 hover:bg-slate-900 hover:text-white'
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
    <div class="border-t border-slate-800 p-4">

      <NuxtLink
        to="/"
        class="
          mb-2 flex items-center gap-3 rounded-xl
          px-3 py-3 text-sm text-slate-400
          hover:bg-slate-900 hover:text-white
        "
      >
        <span>🌐</span>
        View Site
      </NuxtLink>

      <button
        class="
          flex w-full items-center gap-3 rounded-xl
          px-3 py-3 text-sm text-red-400
          hover:bg-red-500/10
        "
      >
        <span>🚪</span>
        Logout
      </button>

    </div>

  </aside>

</template>