<script setup lang="ts">

definePageMeta({
  layout: 'admin'
})


/* =====================================================
   DASHBOARD STATS
===================================================== */

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


/* =====================================================
   RECENT ACTIVITY
===================================================== */

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


    <!-- =================================================
         WELCOME
    ================================================== -->

    <section>

      <h2
        class="text-2xl font-black sm:text-3xl"
        style="color: rgb(248, 250, 252);"
      >
        Welcome back, Daniel! 👋
      </h2>


      <p
        class="mt-2 text-sm"
        style="color: rgb(148, 163, 184);"
      >
        Here's what's happening with your portfolio today.
      </p>

    </section>


    <!-- =================================================
         STATS
    ================================================== -->

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
          rounded-2xl border p-5
          transition duration-300
          hover:-translate-y-1
        "
        style="
          background-color: rgb(20, 30, 50);
          border-color: rgb(51, 65, 85);
        "
      >

        <!-- TOP -->

        <div class="flex items-center justify-between">

          <!-- ICON -->

          <div
            class="
              flex h-11 w-11 items-center
              justify-center rounded-xl text-xl
            "
            style="
              background-color: rgba(37, 99, 235, 0.12);
            "
          >
            {{ stat.icon }}
          </div>


          <!-- CHANGE -->

          <span
            class="
              text-[10px] font-bold
              uppercase tracking-wider
            "
            style="color: rgb(96, 165, 250);"
          >
            {{ stat.change }}
          </span>

        </div>


        <!-- VALUE -->

        <div class="mt-5">

          <div
            class="text-3xl font-black"
            style="color: rgb(248, 250, 252);"
          >
            {{ stat.value }}
          </div>


          <div
            class="mt-1 text-xs"
            style="color: rgb(148, 163, 184);"
          >
            {{ stat.label }}
          </div>

        </div>

      </div>

    </section>


    <!-- =================================================
         ACTIVITY SECTION
    ================================================== -->

    <section
      class="
        grid grid-cols-1 gap-6
        xl:grid-cols-3
      "
    >


      <!-- =================================================
           RECENT MESSAGES
      ================================================== -->

      <div
        class="
          rounded-2xl border p-6
          xl:col-span-2
        "
        style="
          background-color: rgb(20, 30, 50);
          border-color: rgb(51, 65, 85);
        "
      >

        <!-- HEADER -->

        <div
          class="mb-6 flex items-center justify-between"
        >

          <div>

            <h3
              class="font-black"
              style="color: rgb(248, 250, 252);"
            >
              Recent Messages
            </h3>


            <p
              class="mt-1 text-xs"
              style="color: rgb(100, 116, 139);"
            >
              Latest contact messages
            </p>

          </div>


          <!-- VIEW ALL -->

          <NuxtLink
            to="/admin/messages"
            class="text-xs font-bold transition"
            style="color: rgb(96, 165, 250);"
          >
            View all →
          </NuxtLink>

        </div>


        <!-- MESSAGES -->

        <div class="space-y-3">

          <div
            v-for="i in 4"
            :key="i"
            class="
              flex items-center gap-4
              rounded-xl p-4
              transition duration-300
              hover:-translate-y-0.5
            "
            style="
              background-color: rgb(15, 23, 42);
            "
          >

            <!-- AVATAR -->

            <div
              class="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-full font-bold
              "
              style="
                background-color: rgba(37, 99, 235, 0.12);
                color: rgb(96, 165, 250);
              "
            >
              {{ ['AB', 'MK', 'TS', 'JD'][i - 1] }}
            </div>


            <!-- MESSAGE -->

            <div class="min-w-0 flex-1">

              <div
                class="font-bold"
                style="color: rgb(248, 250, 252);"
              >
                {{
                  [
                    'Abel Tesfaye',
                    'Mekdes K.',
                    'Thomas S.',
                    'John Daniel'
                  ][i - 1]
                }}
              </div>


              <p
                class="truncate text-xs"
                style="color: rgb(100, 116, 139);"
              >
                I'd like to discuss a possible project...
              </p>

            </div>


            <!-- TIME -->

            <span
              class="text-[10px]"
              style="color: rgb(100, 116, 139);"
            >
              {{ i }}h ago
            </span>

          </div>

        </div>

      </div>


      <!-- =================================================
           ACTIVITY
      ================================================== -->

      <div
        class="
          rounded-2xl border p-6
        "
        style="
          background-color: rgb(20, 30, 50);
          border-color: rgb(51, 65, 85);
        "
      >

        <!-- TITLE -->

        <h3
          class="font-black"
          style="color: rgb(248, 250, 252);"
        >
          Activity
        </h3>


        <p
          class="mt-1 text-xs"
          style="color: rgb(100, 116, 139);"
        >
          Recent portfolio activity
        </p>


        <!-- ACTIVITIES -->

        <div class="mt-6 space-y-6">

          <div
            v-for="activity in activities"
            :key="activity.title"
            class="flex gap-3"
          >

            <!-- ICON -->

            <div
              class="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-lg
              "
              style="
                background-color: rgba(37, 99, 235, 0.12);
              "
            >
              {{ activity.icon }}
            </div>


            <!-- CONTENT -->

            <div>

              <p
                class="text-sm font-bold"
                style="color: rgb(248, 250, 252);"
              >
                {{ activity.title }}
              </p>


              <p
                class="mt-1 text-xs"
                style="color: rgb(148, 163, 184);"
              >
                {{ activity.description }}
              </p>


              <p
                class="mt-1 text-[10px]"
                style="color: rgb(100, 116, 139);"
              >
                {{ activity.time }}
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =================================================
         QUICK ACTIONS
    ================================================== -->

    <section>

      <div
        class="
          rounded-2xl border p-6
        "
        style="
          background-color: rgb(20, 30, 50);
          border-color: rgb(51, 65, 85);
        "
      >

        <div class="mb-5">

          <h3
            class="text-lg font-black"
            style="color: rgb(248, 250, 252);"
          >
            Quick Actions
          </h3>

          <p
            class="mt-1 text-xs"
            style="color: rgb(100, 116, 139);"
          >
            Quickly manage your portfolio
          </p>

        </div>


        <div
          class="
            grid grid-cols-1 gap-3
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          <!-- PROJECTS -->

          <NuxtLink
            to="/admin/projects"
            class="
              rounded-xl border p-4
              transition duration-300
              hover:-translate-y-1
            "
            style="
              border-color: rgb(51, 65, 85);
              background-color: rgb(15, 23, 42);
            "
          >

            <div class="text-xl">
              🚀
            </div>

            <div
              class="mt-2 text-sm font-bold"
              style="color: rgb(248, 250, 252);"
            >
              Manage Projects
            </div>

            <div
              class="mt-1 text-xs"
              style="color: rgb(100, 116, 139);"
            >
              Add or edit projects
            </div>

          </NuxtLink>


          <!-- SKILLS -->

          <NuxtLink
            to="/admin/skills"
            class="
              rounded-xl border p-4
              transition duration-300
              hover:-translate-y-1
            "
            style="
              border-color: rgb(51, 65, 85);
              background-color: rgb(15, 23, 42);
            "
          >

            <div class="text-xl">
              💻
            </div>

            <div
              class="mt-2 text-sm font-bold"
              style="color: rgb(248, 250, 252);"
            >
              Manage Skills
            </div>

            <div
              class="mt-1 text-xs"
              style="color: rgb(100, 116, 139);"
            >
              Update your skills
            </div>

          </NuxtLink>


          <!-- MESSAGES -->

          <NuxtLink
            to="/admin/messages"
            class="
              rounded-xl border p-4
              transition duration-300
              hover:-translate-y-1
            "
            style="
              border-color: rgb(51, 65, 85);
              background-color: rgb(15, 23, 42);
            "
          >

            <div class="text-xl">
              📬
            </div>

            <div
              class="mt-2 text-sm font-bold"
              style="color: rgb(248, 250, 252);"
            >
              View Messages
            </div>

            <div
              class="mt-1 text-xs"
              style="color: rgb(100, 116, 139);"
            >
              Check contact messages
            </div>

          </NuxtLink>


          <!-- PROFILE -->

          <NuxtLink
            to="/admin/profile"
            class="
              rounded-xl border p-4
              transition duration-300
              hover:-translate-y-1
            "
            style="
              border-color: rgb(51, 65, 85);
              background-color: rgb(15, 23, 42);
            "
          >

            <div class="text-xl">
              👤
            </div>

            <div
              class="mt-2 text-sm font-bold"
              style="color: rgb(248, 250, 252);"
            >
              Edit Profile
            </div>

            <div
              class="mt-1 text-xs"
              style="color: rgb(100, 116, 139);"
            >
              Update your information
            </div>

          </NuxtLink>

        </div>

      </div>

    </section>

  </div>

</template>