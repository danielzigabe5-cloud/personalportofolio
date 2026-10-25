<script setup lang="ts">
interface Skill {
  id: string
  name: string
  level: number
  category: string
}

const { data: skills, pending, error } = await useFetch<Skill[]>('/api/skills', {
  default: () => []
})
</script>

<template>
  <section id="skills" class="py-20 bg-white border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-6">
      
      <span class="text-blue-600 font-extrabold text-xs tracking-wider uppercase mb-2 block">MY SKILLS</span>
      <h2 class="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Technologies & Tools I Work With</h2>
      <p class="text-slate-600 mb-12 max-w-xl text-sm">
        I use modern technologies to build fast, secure and scalable applications.
      </p>

      <p v-if="pending" class="mb-12 text-sm text-slate-500">Loading skills...</p>
      <p v-else-if="error" class="mb-12 text-sm text-red-600">Skills could not be loaded.</p>
      <p v-else-if="skills.length === 0" class="mb-12 text-sm text-slate-500">No skills have been added yet.</p>

      <div v-else class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        <div
          v-for="skill in skills"
          :key="skill.id"
          class="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm hover:border-blue-400 transition"
        >
          <span class="text-2xl mb-2 font-black text-blue-600">{{ skill.level }}%</span>
          <strong class="text-sm font-bold text-slate-900 block">{{ skill.name }}</strong>
          <span class="text-xs text-slate-400 font-medium">{{ skill.category }}</span>
        </div>
      </div>

      <!-- Skill Level Progress Bars -->
      <h3 class="text-xl font-black text-slate-900 mb-8">Skill Level</h3>
      
      <div class="space-y-6 max-w-4xl">
        <div v-for="skill in skills" :key="skill.id">
          <div class="flex justify-between items-center text-xs font-bold text-slate-800 mb-2">
            <span>{{ skill.name }}</span>
            <span>{{ skill.level }}%</span>
          </div>
          <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-blue-600 rounded-full"
              :style="{ width: `${skill.level}%` }"
            ></div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>