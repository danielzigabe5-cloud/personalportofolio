<template>
  <div class="min-h-screen bg-[#020617] text-slate-200">

    <div class="flex min-h-screen">

      <!-- Sidebar -->
      <AdminSidebar />

      <!-- Main -->
      <div class="flex min-w-0 flex-1 flex-col lg:ml-64">

        <AdminHeader />

        <main class="flex-1 p-4 sm:p-6 lg:p-8">
          <slot />
        </main>

        <footer
          class="border-t border-slate-800 px-6 py-4 text-center
                 text-xs text-slate-500"
        >
          © {{ new Date().getFullYear() }} Daniel Zigabe. All Rights Reserved.
        </footer>

      </div>

    </div>

  </div>
</template>