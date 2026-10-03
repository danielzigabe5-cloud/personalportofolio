<script setup lang="ts">
const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="admin-layout">

    <!-- 🎨 Sidebar -->
    <AdminSidebar
      :open="sidebarOpen"
      @close="closeSidebar"
    />

    <!-- 📱 Overlay (ሞባይል ሲከፈት) -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        class="sidebar-overlay"
        @click="closeSidebar"
      ></div>
    </Transition>

    <!-- 🎯 Main Content -->
    <div class="admin-main">

      <!-- Header -->
      <AdminHeader @toggle-sidebar="toggleSidebar" />

      <!-- Page Content -->
      <main class="admin-content">
        <slot />
      </main>

      <!-- 🦶 Footer -->
      <footer class="admin-footer">
        <span>© {{ new Date().getFullYear() }} Daniel Zigabe Minda</span>
        <span class="footer-sep">·</span>
        <span>Admin Panel v1.0.0</span>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #0d1117;
  color: #e2e8f0;
}

/* ===== Main Area ===== */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-x: hidden;
}

.admin-content {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}

/* ===== Footer ===== */
.admin-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  background: #161b22;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #6b7280;
  font-size: 12px;
  letter-spacing: 0.3px;
}

.footer-sep {
  color: #30363d;
}

/* ===== Overlay ===== */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 998;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .admin-content {
    padding: 20px 16px;
  }

  .admin-footer {
    padding: 12px 16px;
    font-size: 11px;
  }
}
</style>