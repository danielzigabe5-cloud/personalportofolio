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

/* Map prop values to Tailwind class strings */
const iconStyles: Record<string, string> = {
  green:  'bg-emerald-500/15 text-emerald-400',
  blue:   'bg-blue-500/15 text-blue-400',
  purple: 'bg-violet-500/15 text-violet-400',
  orange: 'bg-orange-500/15 text-orange-400'
}

const iconClass = computed(() => iconStyles[colorClass.value])

const trendStyles: Record<string, string> = {
  up:      'bg-emerald-500/15 text-emerald-400',
  down:    'bg-red-500/15 text-red-400',
  neutral: 'bg-slate-500/15 text-slate-400'
}

const trendStyleClass = computed(() => trendStyles[trendClass.value])
</script>

<template>
  <div
    class="
      group relative cursor-pointer overflow-hidden
      rounded-2xl border border-slate-800
      bg-[#0e1420]
      p-5
      transition-all duration-300
      hover:-translate-y-1
      hover:border-emerald-500/30
      hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)]
    "
  >
    <!-- Radial glow on hover -->
    <div
      class="
        pointer-events-none absolute inset-0
        bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_60%)]
        opacity-0 transition-opacity duration-300
        group-hover:opacity-100
      "
    ></div>

    <!-- Header -->
    <div class="relative mb-5 flex items-center justify-between">

      <!-- Icon -->
      <div
        class="
          flex h-12 w-12 items-center justify-center
          rounded-xl text-[22px]
        "
        :class="iconClass"
      >
        {{ icon }}
      </div>

      <!-- Trend Badge -->
      <div
        v-if="trend"
        class="
          rounded-full px-2.5 py-1
          text-[11px] font-bold tracking-wide
        "
        :class="trendStyleClass"
      >
        {{ trend }}
      </div>

    </div>

    <!-- Body -->
    <div class="relative flex flex-col gap-1">

      <p
        class="
          text-3xl font-extrabold leading-none
          tracking-tight text-slate-50
        "
      >
        {{ value }}
      </p>

      <p
        class="
          text-[13px] font-medium tracking-wide
          text-slate-400
        "
      >
        {{ label }}
      </p>

    </div>
  </div>
</template>