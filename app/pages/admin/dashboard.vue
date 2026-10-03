<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

useHead({
  title: 'Dashboard | Admin Panel'
})

const stats = [
  { icon: '🚀', label: 'Total Projects', value: 12, trend: '+2 this month' },
  { icon: '💻', label: 'Skills', value: 18, trend: '+3 new' },
  { icon: '📬', label: 'Messages', value: 47, trend: '3 unread' },
  { icon: '👁️', label: 'Visitors', value: '1.2K', trend: '+12%' }
]

const recentMessages = [
  { id: 1, name: 'Sarah Johnson', subject: 'Project Collaboration', time: '5 min ago', unread: true },
  { id: 2, name: 'Michael Chen', subject: 'Job Opportunity', time: '2 hours ago', unread: true },
  { id: 3, name: 'Elena Rodriguez', subject: 'Feedback on Portfolio', time: '1 day ago', unread: false }
]

const recentActivity = [
  { icon: '🚀', text: 'Added new project "CombolojoSPORT"', time: '2 hours ago' },
  { icon: '💻', text: 'Updated skills: Nuxt.js to 90%', time: '5 hours ago' },
  { icon: '💼', text: 'Added experience: Frontend Developer', time: '1 day ago' },
  { icon: '🎓', text: 'Updated education info', time: '3 days ago' }
]
</script>

<template>
  <div class="dashboard">
    <div class="welcome-banner">
      <div>
        <h2>Welcome back, Daniel! 👋</h2>
        <p>Here's what's happening with your portfolio today.</p>
      </div>
      <NuxtLink to="/" target="_blank" class="welcome-btn">
        🌐 View Portfolio
      </NuxtLink>
    </div>

    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <div class="stat-header">
          <div class="stat-icon">{{ stat.icon }}</div>
          <span class="stat-trend">{{ stat.trend }}</span>
        </div>
        <p class="stat-value">{{ stat.value }}</p>
        <p class="stat-label">{{ stat.label }}</p>
      </div>
    </div>

    <div class="content-grid">
      <div class="dashboard-card">
        <div class="card-header">
          <div>
            <h3>Recent Messages</h3>
            <p>Latest messages from visitors</p>
          </div>
          <NuxtLink to="/admin/messages" class="card-link">View All →</NuxtLink>
        </div>
        <div class="messages-list">
          <div v-for="msg in recentMessages" :key="msg.id" class="message-item">
            <div class="message-avatar">{{ msg.name.charAt(0) }}</div>
            <div class="message-body">
              <p class="message-name">{{ msg.name }}</p>
              <p class="message-subject">{{ msg.subject }}</p>
            </div>
            <span class="message-time">{{ msg.time }}</span>
          </div>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="card-header">
          <div>
            <h3>Recent Activity</h3>
            <p>Your latest updates</p>
          </div>
        </div>
        <div class="activity-list">
          <div v-for="(activity, i) in recentActivity" :key="i" class="activity-item">
            <div class="activity-icon">{{ activity.icon }}</div>
            <div>
              <p class="activity-text">{{ activity.text }}</p>
              <p class="activity-time">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

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
            <p class="quick-desc">Create a new project</p>
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
            <p class="quick-desc">Update personal info</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.welcome-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 28px 32px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 20px;
}

.welcome-banner h2 {
  color: #ffffff;
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 6px;
}

.welcome-banner p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  margin: 0;
}

.welcome-btn {
  padding: 12px 22px;
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
}

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
}

.stat-label {
  color: #6b7280;
  font-size: 13px;
  margin: 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 24px;
}

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
}

.messages-list,
.activity-list {
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
}

.message-subject {
  color: #9ca3af;
  font-size: 13px;
  margin: 0;
}

.message-time {
  color: #6b7280;
  font-size: 11px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
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
  margin: 0 0 2px;
}

.activity-time {
  color: #6b7280;
  font-size: 11px;
  margin: 0;
}

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
}

.quick-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.15);
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

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>