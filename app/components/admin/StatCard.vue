<script setup lang="ts">
const props = defineProps<{
  icon: string
  label: string
  value: string | number
  trend?: string
  trendType?: 'up' | 'down' | 'neutral'
  color?: 'green' | 'blue' | 'purple' | 'orange'
}>()

const colorClass = computed(() => props.color || 'green')
const trendClass = computed(() => props.trendType || 'neutral')
</script>

<template>
  <div class="stat-card">
    <div class="stat-header">
      <div class="stat-icon" :class="`icon-${colorClass}`">
        {{ icon }}
      </div>

      <div v-if="trend" class="stat-trend" :class="`trend-${trendClass}`">
        {{ trend }}
      </div>
    </div>

    <div class="stat-body">
      <p class="stat-value">{{ value }}</p>
      <p class="stat-label">{{ label }}</p>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  background: #161b22;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 22px 22px 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.08), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.stat-card:hover::before {
  opacity: 1;
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
  font-size: 22px;
  border-radius: 12px;
}

.icon-green {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.icon-blue {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.icon-purple {
  background: rgba(139, 92, 246, 0.15);
  color: #8b5cf6;
}

.icon-orange {
  background: rgba(249, 115, 22, 0.15);
  color: #f97316;
}

.stat-trend {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 9px;
  border-radius: 20px;
  letter-spacing: 0.3px;
}

.trend-up {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.trend-down {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
}

.trend-neutral {
  background: rgba(156, 163, 175, 0.15);
  color: #9ca3af;
}

.stat-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  color: #ffffff;
  font-size: 30px;
  font-weight: 800;
  margin: 0;
  line-height: 1;
  letter-spacing: -1px;
}

.stat-label {
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.3px;
}
</style>