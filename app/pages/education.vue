<script setup lang="ts">
interface Education {
  id: number
  institution: string
  degree: string
  field: string
  period: string
  isCurrent: boolean
}

const { data: education, pending, error } = await useFetch<Education[]>('/api/education', {
  default: () => []
})

const educationDetails = {
  courses: [
    'Data Structures',
    'Database Systems',
    'Web Development',
    'Software Engineering'
  ],
  certificates: [
    'Responsive Web Design',
    'JavaScript Algorithms'
  ]
}
</script>

<template>
  <section id="education" class="py-20 bg-white border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-6">
      
      <!-- Section Header -->
      <div class="mb-12">
        <span class="text-blue-600 font-extrabold text-xs tracking-wider uppercase mb-2 block">ACADEMIC BACKGROUND</span>
        <h2 class="text-3xl sm:text-4xl font-black text-slate-900">Education & Certificates</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- LEFT: EDUCATION RECORDS (Col 7) -->
        <div class="lg:col-span-7">
          <p v-if="pending" class="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            Loading education records...
          </p>
          <p v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
            Education records could not be loaded.
          </p>
          <p v-else-if="education.length === 0" class="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            No education records have been added yet.
          </p>

          <div v-else class="space-y-4">
            <article
              v-for="item in education"
              :key="item.id"
              class="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span class="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700">
                  {{ item.period }}
                </span>
                <span v-if="item.isCurrent" class="text-xs font-bold uppercase tracking-wider text-emerald-600">Current</span>
              </div>
              <h3 class="text-xl font-black text-slate-900">{{ item.degree }}</h3>
              <p class="mt-2 font-bold text-blue-600">{{ item.institution }}</p>
              <p v-if="item.field" class="mt-1 text-sm text-slate-500">{{ item.field }}</p>
            </article>
          </div>

          <!-- Relevant Coursework -->
          <div class="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <h4 class="text-xs font-black tracking-wider text-slate-400 uppercase mb-3">
              Relevant Coursework
            </h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="course in educationDetails.courses"
                :key="course"
                class="bg-white border border-slate-200 text-slate-700 font-semibold text-xs px-3.5 py-2 rounded-xl shadow-xs"
              >
                {{ course }}
              </span>
            </div>
          </div>
        </div>

        <!-- RIGHT: CERTIFICATES CARD (Col 5) -->
        <div class="lg:col-span-5 bg-blue-50/50 border border-blue-100 rounded-3xl p-8 shadow-sm">
          <div class="flex items-center gap-3 mb-6">
            <span class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">🎓</span>
            <div>
              <h3 class="text-xl font-black text-slate-900">Certificates & Skills</h3>
              <p class="text-xs text-slate-500">Professional credentials attained</p>
            </div>
          </div>

          <div class="space-y-3">
            <div
              v-for="cert in educationDetails.certificates"
              :key="cert"
              class="bg-white border border-blue-100 p-4 rounded-2xl shadow-xs flex items-center gap-3"
            >
              <span class="text-blue-600 font-bold">✓</span>
              <span class="font-bold text-slate-800 text-sm">{{ cert }}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>