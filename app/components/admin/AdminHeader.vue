<script setup lang="ts">
const emit = defineEmits<{
  'toggle-sidebar': []
}>()

const route = useRoute()

// 📄 የገጹ ስም
const pageTitle = computed(() => {
  const path = route.path.split('/').pop()
  if (!path) return 'Dashboard'
  return path.charAt(0).toUpperCase() + path.slice(1)
})

// 🕐 ሰዓት
const now = ref(new Date())
let timer: NodeJS.Timeout

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const currentTime = computed(() => {
  return now.value.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

const currentDate = computed(() => {
  return now.value.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
})
</script>

<template>
  <header class="admin-header">
    <!-- Left: Menu Toggle + Title -->
    <div class="header-left">
      <button
        class="menu-toggle"
        @click="emit('toggle-sidebar')"
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <div class="header-title">
        <h1>{{ pageTitle }}</h1>
        <p>{{ currentDate }}</p>
      </div>
    </div>

    <!-- Right: Clock + Notification + Profile -->
    <div class="header-right">

      <!-- 🕐 Clock -->
      <div class="header-clock">
        <span class="clock-icon">🕐</span>
        <span class="clock-time">{{ currentTime }}</span>
      </div>

      <!-- 🔔 Notifications -->
      <button class="header-icon-btn" aria-label="Notifications">
        🔔
        <span class="notification-dot"></span>
      </button>

      <!-- 👤 Profile -->
      <div class="header-profile">
        <div class="profile-avatar">DZ</div>
        <div class="profile-info">
          <p class="profile-name">Daniel Zigabe</p>
          <p class="profile-role">Administrator</p>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 32px;
  background: #161b22;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

/* ===== Left ===== */
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.menu-toggle {
  display: none;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s;
}

.menu-toggle:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: #10b981;
  color: #10b981;
}

.header-title h1 {
  color: #ffffff;
  font-size: 20px;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.4px;
}

.header-title p {
  color: #6b7280;
  font-size: 12px;
  margin: 2px 0 0;
}

/* ===== Right ===== */
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-clock {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #9ca3af;
  font-size: 13px;
  font-weight: 600;
}

.clock-icon {
  font-size: 14px;
}

/* Header Icons */
.header-icon-btn {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
}

.header-icon-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: #10b981;
}

.notification-dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid #161b22;
}

/* Profile */
.header-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px 6px 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s;
}

.header-profile:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(16, 185, 129, 0.3);
}

.profile-avatar {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #0d1117;
  font-size: 13px;
  font-weight: 800;
  border-radius: 10px;
  letter-spacing: 0.5px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.profile-name {
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
}

.profile-role {
  color: #6b7280;
  font-size: 11px;
  margin: 0;
  line-height: 1.3;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .admin-header {
    padding: 12px 16px;
  }

  .menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-clock,
  .profile-info {
    display: none;
  }

  .header-title h1 {
    font-size: 17px;
  }

  .header-profile {
    padding: 4px;
  }
}
</style>