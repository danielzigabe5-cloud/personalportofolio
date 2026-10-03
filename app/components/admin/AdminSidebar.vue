<template>
  <aside class="admin-sidebar">
    <!-- Logo -->
    <div class="sidebar-header">
      <NuxtLink to="/admin/dashboard" class="sidebar-brand">
        <span class="brand-badge">DZ</span>
        <span class="brand-text">Admin Panel</span>
      </NuxtLink>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <NuxtLink to="/admin/dashboard" class="nav-link" active-class="nav-active">
        <span class="nav-icon">📊</span>
        <span>Dashboard</span>
      </NuxtLink>

      <NuxtLink to="/admin/projects" class="nav-link" active-class="nav-active">
        <span class="nav-icon">🚀</span>
        <span>Projects</span>
      </NuxtLink>

      <NuxtLink to="/admin/skills" class="nav-link" active-class="nav-active">
        <span class="nav-icon">💻</span>
        <span>Skills</span>
      </NuxtLink>

      <NuxtLink to="/admin/experience" class="nav-link" active-class="nav-active">
        <span class="nav-icon">💼</span>
        <span>Experience</span>
      </NuxtLink>

      <NuxtLink to="/admin/education" class="nav-link" active-class="nav-active">
        <span class="nav-icon">🎓</span>
        <span>Education</span>
      </NuxtLink>

      <NuxtLink to="/admin/messages" class="nav-link" active-class="nav-active">
        <span class="nav-icon">📬</span>
        <span>Messages</span>
        <span class="nav-badge">3</span>
      </NuxtLink>

      <NuxtLink to="/admin/profile" class="nav-link" active-class="nav-active">
        <span class="nav-icon">👤</span>
        <span>Profile</span>
      </NuxtLink>

      <NuxtLink to="/admin/settings" class="nav-link" active-class="nav-active">
        <span class="nav-icon">⚙️</span>
        <span>Settings</span>
      </NuxtLink>
    </nav>

    <!-- Footer -->
    <div class="sidebar-footer">
      <NuxtLink to="/" target="_blank" class="view-site-btn">
        🌐 View Site
      </NuxtLink>

      <button class="logout-btn" @click="handleLogout">
        🚪 Logout
      </button>

      <div class="sidebar-version">
        <p>© {{ new Date().getFullYear() }} Daniel Zigabe</p>
        <p class="version-text">v1.0.0</p>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
async function handleLogout() {
  const token = useCookie('auth_token')
  token.value = null
  await navigateTo('/admin/login')
}
</script>

<style scoped>
.admin-sidebar {
  width: 260px;
  background: #161b22;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
}

/* Header */
.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.brand-badge {
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
  letter-spacing: 1px;
}

.brand-text {
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  color: #9ca3af;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

.nav-link.nav-active {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  font-weight: 600;
}

.nav-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.nav-badge {
  margin-left: auto;
  background: #ef4444;
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 10px;
}

/* Footer */
.sidebar-footer {
  padding: 16px 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.view-site-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
}

.view-site-btn:hover {
  background: #10b981;
  color: #ffffff;
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}

.sidebar-version {
  text-align: center;
  padding-top: 8px;
}

.sidebar-version p {
  margin: 0;
  color: #4b5563;
  font-size: 10px;
  line-height: 1.5;
}

.version-text {
  color: #30363d !important;
}
</style>