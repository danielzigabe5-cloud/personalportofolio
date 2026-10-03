<script setup lang="ts">
// 🎯 ወሳኝ!
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

// 🎯 SEO
useHead({
  title: 'Dashboard | Admin Panel'
})

// 📊 Statistics
const stats = [
  {
    icon: '🚀',
    label: 'Total Projects',
    value: 12,
    trend: '+2 this month',
    color: 'green'
  },
  {
    icon: '💻',
    label: 'Skills',
    value: 18,
    trend: '+3 new',
    color: 'blue'
  },
  {
    icon: '📬',
    label: 'Messages',
    value: 47,
    trend: '3 unread',
    color: 'purple'
  },
  {
    icon: '👁️',
    label: 'Visitors',
    value: '1.2K',
    trend: '+12%',
    color: 'orange'
  }
]

// 📬 Recent messages
const recentMessages = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    subject: 'Project Collaboration',
    time: '5 min ago',
    unread: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael@example.com',
    subject: 'Job Opportunity',
    time: '2 hours ago',
    unread: true
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    email: 'elena@example.com',
    subject: 'Feedback on Portfolio',
    time: '1 day ago',
    unread: false
  }
]

// 📈 Recent activity
const recentActivity = [
  { icon: '🚀', text: 'Added new project "CombolojoSPORT"', time: '2 hours ago' },
  { icon: '💻', text: 'Updated skills: Nuxt.js to 90%', time: '5 hours ago' },
  { icon: '💼', text: 'Added experience: Frontend Developer', time: '1 day ago' },
  { icon: '🎓', text: 'Updated education info', time: '3 days ago' }
]
</script>

<template>
  <div class="dashboard">

    <!-- 🎉 Welcome Banner -->
    <div class="welcome-banner">
      <div class="welcome-content">
        <h2>Welcome back, Daniel! 👋</h2>
        <p>Here's what's happening with your portfolio today.</p>
      </div>

      <NuxtLink to="/" target="_blank" class="welcome-btn">
        🌐 View Portfolio
      </NuxtLink>
    </div>

    <!-- 📊 Stats Grid -->
    <div class="stats-grid">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="stat-card"
      >
        <div class="stat-header">
          <div class="stat-icon">{{ stat.icon }}</div>
          <span class="stat-trend">{{ stat.trend }}</span>
        </div>
        <p class="stat-value">{{ stat.value }}</p>
        <p class="stat-label">{{ stat.label }}</p>
      </div>
    </div>

    <!-- 📋 Content Grid -->
    <div class="content-grid">

      <!-- 📬 Recent Messages -->
      <div class="dashboard-card">
        <div class="card-header">
          <div>
            <h3>Recent Messages</h3>
            <p>Latest messages from visitors</p>
          </div>
          <NuxtLink to="/admin/messages" class="card-link">
            View All →
          </NuxtLink>
        </div>

        <div class="messages-list">
          <div
            v-for="msg in recentMessages"
            :key="msg.id"
            class="message-item"
            :class="{ 'message-unread': msg.unread }"
          >
            <div class="message-avatar">
              {{ msg.name.charAt(0) }}
            </div>

            <div class="message-body">
              <p class="message-name">{{ msg.name }}</p>
              <p class="message-subject">{{ msg.subject }}</p>
            </div>

            <span class="message-time">{{ msg.time }}</span>
            <span v-if="msg.unread" class="unread-dot"></span>
          </div>
        </div>
      </div>

      <!-- 📈 Recent Activity -->
      <div class="dashboard-card">
        <div class="card-header">
          <div>
            <h3>Recent Activity</h3>
            <p>Your latest updates</p>
          </div>
        </div>

        <div class="activity-list">
          <div
            v-for="(activity, i) in recentActivity"
            :key="i"
            class="activity-item"
          >
            <div class="activity-icon">{{ activity.icon }}</div>
            <div>
              <p class="activity-text">{{ activity.text }}</p>
              <p class="activity-time">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- ⚡ Quick Actions -->
    <div class="dashboard-card">
      <div class="card-header">
        <div>
          <h3>Quick Actions</h3>
          <p>Common tasks you can do</p>
        </div>
      </div>

      <div class="quick-actions">
        <NuxtLink to="/admin/projects" class="quick-action">
          <div class="quick-icon">➕</div>
          <div>
            <p class="quick-title">Add Project</p>
            <p class="quick-desc">Create a new portfolio project</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/admin/skills" class="quick-action">
          <div class="quick-icon">💻</div>
          <div>
            <p class="quick-title">Update Skills</p>
            <p class="quick-desc">Manage your skill levels</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/admin/messages" class="quick-action">
          <div class="quick-icon">📬</div>
          <div>
            <p class="quick-title">Check Messages</p>
            <p class="quick-desc">3 unread messages</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/admin/profile" class="quick-action">
          <div class="quick-icon">👤</div>
          <div>
            <p class="quick-title">Edit Profile</p>
            <p class="quick-desc">Update your personal info</p>
          </div>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ===== Dashboard ===== */
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

/* ===== Welcome Banner ===== */
.welcome-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 28px 32px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.welcome-banner::before {
  content: '';
  position: absolute;
  top: -80px;
  right: -80px;
  width: 240px;
  height: 240px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
}

.welcome-content h2 {
  color: #ffffff;
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 6px;
  letter-spacing: -0.5px;
}

.welcome-content p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  margin: 0;
}

.welcome-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: 0.25s;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
  white-space: nowrap;
}

.welcome-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* ===== Stats Grid ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.stat-card {
  background: #161b22;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 22px;
  transition: 0.3s;
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.15);
  border-radius: 12px;
  font-size: 22px;
}

.stat-trend {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 9px;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border-radius: 20px;
}

.stat-value {
  color: #ffffff;
  font-size: 30px;
  font-weight: 800;
  margin: 0 0 4px;
  letter-spacing: -1px;
  line-height: 1;
}

.stat-label {
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
  margin: 0;
}

/* ===== Content Grid ===== */
.content-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 24px;
}

/* ===== Dashboard Card ===== */
.dashboard-card {
  background: #161b22;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.card-header h3 {
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  margin: 0;
}

.card-header p {
  color: #6b7280;
  font-size: 12px;
  margin: 3px 0 0;
}

.card-link {
  color: #10b981;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.2s;
  white-space: nowrap;
}

.card-link:hover {
  color: #34d399;
}

/* ===== Messages ===== */
.messages-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.message-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border-radius: 12px;
  transition: 0.25s;
  cursor: pointer;
  position: relative;
}

.message-item:hover {
  background: rgba(255, 255, 255, 0.03);
}

.message-unread {
  background: rgba(16, 185, 129, 0.04);
}

.message-avatar {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  border-radius: 12px;
  flex-shrink: 0;
}

.message-body {
  flex: 1;
  min-width: 0;
}

.message-name {
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-subject {
  color: #9ca3af;
  font-size: 13px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-time {
  color: #6b7280;
  font-size: 11px;
  white-space: nowrap;
  flex-shrink: 0;
}

.unread-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}

/* ===== Activity ===== */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  transition: 0.2s;
}

.activity-item:hover {
  background: rgba(255, 255, 255, 0.03);
}

.activity-icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 10px;
  font-size: 15px;
  flex-shrink: 0;
}

.activity-text {
  color: #e2e8f0;
  font-size: 13px;
  font-weight: 500;
  margin: 0 0 2px;
  line-height: 1.4;
}

.activity-time {
  color: #6b7280;
  font-size: 11px;
  margin: 0;
}

/* ===== Quick Actions ===== */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}

.quick-action {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  text-decoration: none;
  transition: 0.25s;
}

.quick-action:hover {
  background: rgba(16, 185, 129, 0.06);
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateY(-2px);
}

.quick-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.15));
  border-radius: 12px;
  font-size: 18px;
  flex-shrink: 0;
}

.quick-title {
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 2px;
}

.quick-desc {
  color: #6b7280;
  font-size: 12px;
  margin: 0;
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .welcome-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 22px;
  }

  .welcome-btn {
    width: 100%;
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .dashboard-card {
    padding: 20px 16px;
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .welcome-content h2 {
    font-size: 18px;
  }

  .card-header {
    flex-direction: column;
  }
}
</style>