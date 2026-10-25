<script setup lang="ts">
// 1. የ Authentication Token እና Cookies እናገኛለን
const token = useCookie('auth_token') // ወይም በፕሮጀክትዎ 'token' ከሆነ
const user = useCookie('user')
const isLoggingOut = ref(false)

// 2. Logout የማድረጊያ Function
const handleLogout = async () => {
  isLoggingOut.value = true

  try {
    // Backend API ካለ ጥሪ እናደርጋለን (ባይኖርም እንዳይቋረጥ catch ተደርጓል)
    await $fetch('/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: 'application/json'
      }
    }).catch(() => {})
  } finally {
    // Token እና User መረጃን ማጥፋት
    token.value = null
    user.value = null

    if (import.meta.client) {
      localStorage.clear()
      sessionStorage.clear()
    }

    isLoggingOut.value = false

    // በቀጥታ ወደ Login ገጽ መመለስ
    await navigateTo('/login')
  }
}

// የ Sidebar ሊንኮች ዝርዝር (View Site ሙሉ በሙሉ ተወግዷል)
const navItems = [
  { name: 'Dashboard', to: '/admin', icon: '📊' },
  { name: 'Projects', to: '/admin/projects', icon: '🚀' },
  { name: 'Skills', to: '/admin/skills', icon: '💻' },
  { name: 'Experience', to: '/admin/experience', icon: '💼' },
  { name: 'Education', to: '/admin/education', icon: '🎓' },
  { name: 'Messages', to: '/admin/messages', icon: '📬' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-200">

    <div class="flex min-h-screen">

      <!-- ================= SIDEBAR (View Site የተወገደበት እና Logout የሚሰራበት) ================= -->
      <aside class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between border-r border-indigo-900/40 bg-slate-950/95 p-4 backdrop-blur">
        
        <div>
          <!-- Brand / Logo -->
          <div class="flex items-center gap-3 px-2 py-3 mb-6">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 font-bold text-white shadow-lg shadow-purple-600/30">
              DZ
            </div>
            <div>
              <h1 class="text-sm font-bold text-white tracking-wide">DZ Admin</h1>
              <p class="text-[11px] text-slate-400">Panel</p>
            </div>
          </div>

          <!-- Section Label -->
          <div class="px-3 mb-2">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">MANAGEMENT</span>
          </div>

          <!-- Nav Items -->
          <nav class="space-y-1">
            <NuxtLink
              v-for="item in navItems"
              :key="item.name"
              :to="item.to"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-300 transition hover:bg-indigo-950/60 hover:text-white"
              active-class="bg-indigo-900/50 text-purple-300 font-semibold border border-indigo-500/30"
            >
              <span class="text-base">{{ item.icon }}</span>
              <span>{{ item.name }}</span>
            </NuxtLink>
          </nav>
        </div>

        <!-- ================= SIDEBAR ግርጌ (View Site የተሰረዘበት እና Logout ብቻ የቀረበት) ================= -->
        <div class="border-t border-indigo-900/40 pt-4 px-2">
          <button
            @click="handleLogout"
            :disabled="isLoggingOut"
            type="button"
            class="flex w-full items-center gap-3 px-3 py-2.5 text-xs font-medium text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 rounded-xl transition cursor-pointer disabled:opacity-50"
          >
            <!-- Logout Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>{{ isLoggingOut ? 'Logging out...' : 'Logout' }}</span>
          </button>
        </div>

      </aside>

      <!-- ================= MAIN CONTENT ================= -->
      <div class="flex min-w-0 flex-1 flex-col lg:ml-64">

        <AdminHeader />

        <main class="flex-1 p-4 sm:p-6 lg:p-8">
          <slot />
        </main>

        <footer
          class="border-t border-indigo-900/40 px-6 py-4 text-center
                 text-xs text-indigo-300/60"
        >
          © {{ new Date().getFullYear() }} Daniel Zigabe. All Rights Reserved.
        </footer>

      </div>

    </div>

  </div>
</template>