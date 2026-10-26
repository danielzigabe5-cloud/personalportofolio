<script setup lang="ts">
// 1. Authentication Token እና Cookies
const token = useCookie('auth_token')
const user = useCookie('user')
const isLoggingOut = ref(false)

// 2. Dynamic Admin Profile State (በቀላሉ በሁሉም ገጽ የሚገናኝ)
const { data: profile } = await useProfile()
const adminProfile = computed(() => ({
  name: profile.value.name,
  email: profile.value.email,
  avatar: profile.value.avatarUrl
}))

onMounted(() => {
  if (import.meta.client) window.addEventListener('click', handleClickOutside)
})

// የስም የመጀመሪያ ፊደላትን በራሱ ማውጣት (ለምሳሌ "Daniel Zigabe" ከሆነ "DZ" ይሆናል)
const userInitials = computed(() => {
  if (!adminProfile.value?.name) return 'DZ'
  return adminProfile.value.name
    .split(' ')
    .filter(Boolean)
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

// 3. Dropdown State
const isProfileOpen = ref(false)
const profileDropdownRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (profileDropdownRef.value && !profileDropdownRef.value.contains(event.target as Node)) {
    isProfileOpen.value = false
  }
}

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('click', handleClickOutside)
  }
})

// 4. Logout Function (ወደ Public Page '/' የሚወስድ)
const handleLogout = async () => {
  isLoggingOut.value = true
  isProfileOpen.value = false

  try {
    await $fetch('/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: 'application/json'
      }
    }).catch(() => {})
  } finally {
    // Token እና Auth Cookies ማጥፋት
    token.value = null
    user.value = null

    if (import.meta.client) {
      sessionStorage.clear()
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    }

    isLoggingOut.value = false

    // ✅ ወደ ዋናው Public Page (Home) መመለስ
    await navigateTo('/', { replace: true })
  }
}

// Sidebar Links
const navItems = [
  { name: 'Dashboard', to: '/admin', icon: '📊' },
  { name: 'Projects', to: '/admin/projects', icon: '🚀' },
  { name: 'Services', to: '/admin/services', icon: '🛠️' },
  { name: 'Skills', to: '/admin/skills', icon: '💻' },
  { name: 'Experience', to: '/admin/experience', icon: '💼' },
  { name: 'Education', to: '/admin/education', icon: '🎓' },
  { name: 'Messages', to: '/admin/messages', icon: '📬' },
]
</script>

<template>
  <div class="admin-shell min-h-screen text-slate-200">

    <div class="flex min-h-screen">

      <!-- ================= SIDEBAR ================= -->
      <aside class="admin-sidebar fixed inset-y-0 left-0 z-40 flex w-64 flex-col justify-between border-r border-indigo-900/40 bg-slate-950/95 p-4 backdrop-blur">
        
        <div>
          <!-- Brand Logo -->
          <div class="flex items-center gap-3 px-2 py-3 mb-6">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 font-bold text-white shadow-lg shadow-purple-600/30">
              {{ userInitials }}
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

          <!-- Navigation -->
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

        <!-- Sidebar Bottom Logout -->
        <div class="border-t border-indigo-900/40 pt-4 px-2">
          <button
            @click="handleLogout"
            :disabled="isLoggingOut"
            type="button"
            class="flex w-full items-center gap-3 px-3 py-2.5 text-xs font-medium text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 rounded-xl transition cursor-pointer disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>{{ isLoggingOut ? 'Logging out...' : 'Logout' }}</span>
          </button>
        </div>

      </aside>

      <!-- ================= MAIN SECTION ================= -->
      <div class="flex min-w-0 flex-1 flex-col lg:ml-64">

        <!-- HEADER WITH DYNAMIC PROFILE -->
        <header class="admin-topbar sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b px-4 backdrop-blur sm:px-6">
          <p class="min-w-0 truncate text-sm font-bold text-[#174b45] sm:text-base">
            Welcome to {{ adminProfile.name }}'s Portfolio Admin Page
          </p>

          <div class="flex shrink-0 items-center gap-2 sm:gap-3">
            <NuxtLink
              to="/"
              class="admin-topbar-control flex h-9 items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition hover:-translate-y-0.5 sm:px-4"
              aria-label="View public portfolio site"
              title="View Site"
            >
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 3h7v7m-1-6L10 14" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
              </svg>
              <span class="hidden sm:inline">View Site</span>
            </NuxtLink>


            <!-- Notification -->
            <button class="admin-topbar-control relative flex h-9 w-9 items-center justify-center rounded-xl border transition">
              <span>🔔</span>
              <span class="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500"></span>
            </button>

            <!-- DYNAMIC PROFILE DROPDOWN -->
            <div class="relative" ref="profileDropdownRef">
              <!-- Avatar Button -->
              <button
                @click.stop="isProfileOpen = !isProfileOpen"
                type="button"
                class="admin-avatar flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl font-bold text-white ring-2 transition hover:scale-105 active:scale-95"
                title="User Menu"
              >
                <img
                  v-if="adminProfile.avatar"
                  :src="adminProfile.avatar"
                  alt="Profile"
                  class="h-full w-full object-cover"
                />
                <span v-else>{{ userInitials }}</span>
              </button>

              <!-- Dropdown Content -->
              <transition
                enter-active-class="transition ease-out duration-150"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="isProfileOpen"
                  class="admin-profile-menu absolute right-0 z-50 mt-3 w-56 divide-y rounded-2xl border p-2 shadow-xl backdrop-blur-xl"
                >
                  <!-- Dynamic User Info -->
                  <div class="px-3 py-2.5">
                    <p class="truncate text-xs font-bold text-white">{{ adminProfile.name }}</p>
                    <p class="truncate text-[11px] text-slate-400">{{ adminProfile.email }}</p>
                  </div>

                  <!-- Dropdown Actions -->
                  <div class="py-1">
                    <NuxtLink
                      to="/admin"
                      @click="isProfileOpen = false"
                      class="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-indigo-950/80 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 13h8V3H3v10Zm0 8h8v-5H3v5Zm10 0h8V11h-8v10Zm0-18v5h8V3h-8Z" />
                      </svg>
                      <span>Admin Dashboard</span>
                    </NuxtLink>
                    <NuxtLink
                      to="/admin/profile"
                      @click="isProfileOpen = false"
                      class="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-indigo-950/80 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Profile Settings</span>
                    </NuxtLink>
                  </div>

                  <!-- Logout -> Redirects to '/' -->
                  <div class="pt-1">
                    <button
                      @click="handleLogout"
                      :disabled="isLoggingOut"
                      type="button"
                      class="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-400 transition hover:bg-rose-500/10 hover:text-rose-300 disabled:opacity-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>{{ isLoggingOut ? 'Logging out...' : 'Logout' }}</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>

          </div>
        </header>

        <!-- Main Page Content -->
        <main class="flex-1 p-4 sm:p-6 lg:p-8">
          <slot />
        </main>

        <!-- Footer -->
        <footer class="admin-footer border-t border-indigo-900/40 px-6 py-4 text-center text-xs text-indigo-300/60">
          © {{ new Date().getFullYear() }} Daniel Zigabe. All Rights Reserved.
        </footer>

      </div>

    </div>

  </div>
</template>

<style scoped>
.admin-shell {
  --admin-canvas: #dcefed;
  --admin-surface: #f3f9f8;
  --admin-surface-raised: #e8f4f2;
  --admin-border: #c2ded9;
  --admin-ink: #174b45;
  --admin-muted: #66827e;
  --admin-accent: #168b7d;
  background: var(--admin-canvas);
  color: var(--admin-ink);
}

.admin-sidebar {
  background: linear-gradient(180deg, #1d6b65 0%, #2b9d8c 58%, #42bca3 100%);
  border-color: rgb(222 255 248 / 24%);
  color: #f1fffb;
}

.admin-shell .admin-sidebar :deep([class*="text-slate-"]),
.admin-shell .admin-sidebar :deep([class*="text-indigo-"]) {
  color: rgb(241 255 251 / 82%) !important;
}

.admin-sidebar :deep(a.router-link-active) {
  border-color: rgb(225 255 248 / 24%);
  background: rgb(225 255 248 / 20%);
  color: #ffffff !important;
}

.admin-sidebar :deep(a:hover) {
  background: rgb(225 255 248 / 14%);
  color: #ffffff !important;
}

.admin-topbar {
  border-color: #eab308;
  background: #facc15;
  color: var(--admin-ink);
}

.admin-topbar-control {
  border-color: var(--admin-border);
  background: var(--admin-surface);
  color: var(--admin-ink);
}

.admin-topbar-control:hover {
  background: var(--admin-surface-raised);
}

.admin-avatar {
  background: var(--admin-accent);
  --tw-ring-color: rgb(22 139 125 / 24%);
  box-shadow: 0 6px 16px rgb(22 139 125 / 18%);
}

.admin-profile-menu {
  border-color: var(--admin-border);
  background: var(--admin-surface);
  color: var(--admin-ink);
  --tw-divide-opacity: 1;
  --tw-divide-color: var(--admin-border);
}

.admin-footer {
  border-color: var(--admin-border);
  color: var(--admin-muted);
}

.admin-shell :deep([class~="bg-slate-800/50"]),
.admin-shell :deep([class~="bg-slate-800/60"]),
.admin-shell :deep([class~="bg-slate-900/40"]),
.admin-shell :deep([class~="bg-slate-900/50"]),
.admin-shell :deep([class~="bg-slate-900/95"]),
.admin-shell :deep([class~="bg-slate-900"]) {
  background-color: var(--admin-surface) !important;
}

.admin-shell :deep([class~="bg-slate-800"]),
.admin-shell :deep([class~="bg-indigo-950/30"]),
.admin-shell :deep([class~="bg-indigo-950/40"]) {
  background-color: var(--admin-surface-raised) !important;
}

.admin-shell :deep([class~="bg-blue-600"]),
.admin-shell :deep([class~="bg-purple-600"]),
.admin-shell :deep([class~="bg-violet-600"]) {
  background-color: var(--admin-accent) !important;
}

.admin-shell :deep([class~="bg-blue-600/10"]),
.admin-shell :deep([class~="bg-amber-500/10"]),
.admin-shell :deep([class~="bg-emerald-500/10"]),
.admin-shell :deep([class~="bg-indigo-900/50"]),
.admin-shell :deep([class~="bg-indigo-950/80"]) {
  background-color: rgb(22 139 125 / 10%) !important;
}

.admin-shell :deep([class*="border-slate-"]),
.admin-shell :deep([class*="border-indigo-"]),
.admin-shell :deep([class*="border-blue-"]) {
  border-color: var(--admin-border) !important;
}

.admin-shell :deep([class~="text-slate-50"]),
.admin-shell :deep([class~="text-slate-100"]),
.admin-shell :deep([class~="text-slate-200"]),
.admin-shell :deep([class~="text-slate-300"]) {
  color: var(--admin-ink) !important;
}

.admin-shell :deep([class~="text-slate-400"]),
.admin-shell :deep([class~="text-slate-500"]),
.admin-shell :deep([class*="text-indigo-"]),
.admin-shell :deep([class*="text-violet-"]),
.admin-shell :deep([class*="text-purple-"]) {
  color: var(--admin-muted) !important;
}

.admin-shell :deep([class*="text-blue-"]),
.admin-shell :deep([class*="text-emerald-"]),
.admin-shell :deep([class*="text-amber-"]) {
  color: var(--admin-accent) !important;
}

.admin-shell :deep([class*="shadow-purple-"]),
.admin-shell :deep([class*="shadow-violet-"]) {
  box-shadow: 0 8px 20px rgb(22 139 125 / 16%) !important;
}
</style>