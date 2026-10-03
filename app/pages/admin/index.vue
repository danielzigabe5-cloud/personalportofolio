<script setup lang="ts">

definePageMeta({
  layout: 'admin'
})

const stats = [
  {
    label: 'Projects',
    value: '12',
    icon: '🚀',
    change: '+3 this month'
  },
  {
    label: 'Skills',
    value: '18',
    icon: '💻',
    change: '+2 added'
  },
  {
    label: 'Messages',
    value: '47',
    icon: '📬',
    change: '8 unread'
  },
  {
    label: 'Visitors',
    value: '1.2K',
    icon: '👁️',
    change: '+18% this month'
  }
]

const activities = [
  {
    title: 'New project added',
    description: 'CombolojoSPORT was added to projects.',
    time: '10 minutes ago',
    icon: '🚀'
  },
  {
    title: 'New message',
    description: 'You received a new contact message.',
    time: '1 hour ago',
    icon: '📬'
  },
  {
    title: 'Profile updated',
    description: 'Your profile information was updated.',
    time: 'Yesterday',
    icon: '👤'
  },
  {
    title: 'Skill updated',
    description: 'Nuxt.js skill was updated.',
    time: '2 days ago',
    icon: '💻'
  }
]

</script>

<template>

  <div class="space-y-8">

    <!-- Welcome -->
    <section>

      <h2 class="text-2xl font-black text-white sm:text-3xl">
        Welcome back, Daniel! 👋
      </h2>

      <p class="mt-2 text-sm text-slate-500">
        Here's what's happening with your portfolio today.
      </p>

    </section>


    <!-- Stats -->
    <section
      class="
        grid grid-cols-1 gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >

      <div
        v-for="stat in stats"
        :key="stat.label"
        class="
          rounded-2xl border border-slate-800
          bg-[#050b14] p-5
          transition hover:-translate-y-1
          hover:border-slate-700
        "
      >

        <div class="flex items-center justify-between">

          <div
            class="
              flex h-11 w-11 items-center
              justify-center rounded-xl
              bg-slate-900 text-xl
            "
          >
            {{ stat.icon }}
          </div>

          <span
            class="
              text-[10px] font-bold
              uppercase tracking-wider
              text-[#39ff14]
            "
          >
            {{ stat.change }}
          </span>

        </div>

        <div class="mt-5">

          <div class="text-3xl font-black text-white">
            {{ stat.value }}
          </div>

          <div class="mt-1 text-xs text-slate-500">
            {{ stat.label }}
          </div>

        </div>

      </div>

    </section>


    <!-- Activity -->
    <section
      class="
        grid grid-cols-1 gap-6
        xl:grid-cols-3
      "
    >

      <!-- Messages -->
      <div
        class="
          rounded-2xl border border-slate-800
          bg-[#050b14] p-6
          xl:col-span-2
        "
      >

        <div class="mb-6 flex items-center justify-between">

          <div>
            <h3 class="font-black text-white">
              Recent Messages
            </h3>

            <p class="mt-1 text-xs text-slate-500">
              Latest contact messages
            </p>
          </div>

          <NuxtLink
            to="/admin/messages"
            class="text-xs font-bold text-[#39ff14]"
          >
            View all →
          </NuxtLink>

        </div>

        <div class="space-y-3">

          <div
            v-for="i in 4"
            :key="i"
            class="
              flex items-center gap-4
              rounded-xl bg-slate-900/60
              p-4
            "
          >

            <div
              class="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-full bg-slate-800
                font-bold text-[#39ff14]
              "
            >
              {{ ['AB', 'MK', 'TS', 'JD'][i - 1] }}
            </div>

            <div class="min-w-0 flex-1">

              <div class="font-bold text-white">
                {{ ['Abel Tesfaye', 'Mekdes K.', 'Thomas S.', 'John Daniel'][i - 1] }}
              </div>

              <p class="truncate text-xs text-slate-500">
                I'd like to discuss a possible project...
              </p>

            </div>

            <span class="text-[10px] text-slate-600">
              {{ i }}h ago
            </span>

          </div>

        </div>

      </div>


      <!-- Activity -->
      <div
        class="
          rounded-2xl border border-slate-800
          bg-[#050b14] p-6
        "
      >

        <h3 class="font-black text-white">
          Activity
        </h3>

        <p class="mt-1 text-xs text-slate-500">
          Recent portfolio activity
        </p>

        <div class="mt-6 space-y-6">

          <div
            v-for="activity in activities"
            :key="activity.title"
            class="flex gap-3"
          >

            <div
              class="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-lg bg-slate-900
              "
            >
              {{ activity.icon }}
            </div>

            <div>

              <p class="text-sm font-bold text-white">
                {{ activity.title }}
              </p>

              <p class="mt-1 text-xs text-slate-500">
                {{ activity.description }}
              </p>

              <p class="mt-1 text-[10px] text-slate-600">
                {{ activity.time }}
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  </div>

</template>