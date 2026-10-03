<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

useHead({ title: 'Projects | Admin' })

const projects = ref([
  { id: 1, title: 'CombolojoSPORT', description: 'Sports venue booking platform', tags: ['Nuxt.js', 'Laravel'], image: '/images/combolojo.jpg' },
  { id: 2, title: 'Internship System', description: 'Student management system', tags: ['Nuxt.js', 'MySQL'], image: '/images/internship.jpg' },
  { id: 3, title: 'Personal Portfolio', description: 'Modern developer portfolio', tags: ['Nuxt.js', 'Vue.js'], image: '/images/portfolio.jpg' }
])

function deleteProject(id: number) {
  if (confirm('Delete this project?')) {
    projects.value = projects.value.filter(p => p.id !== id)
  }
}
</script>

<template>
  <div class="projects-page">
    <!-- Page Header -->
    <div class="page-head">
      <div>
        <h2>Projects</h2>
        <p>{{ projects.length }} total projects</p>
      </div>
      <button class="btn-add">➕ Add Project</button>
    </div>

    <!-- Projects List -->
    <div class="projects-list">
      <div v-for="project in projects" :key="project.id" class="project-item">
        <img :src="project.image" :alt="project.title" class="project-thumb" />

        <div class="project-info">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>

        <div class="project-actions">
          <button class="btn-icon btn-edit" title="Edit">✏️</button>
          <button class="btn-icon btn-delete" title="Delete" @click="deleteProject(project.id)">🗑️</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-page {
  max-width: 1400px;
  margin: 0 auto;
}

.page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.page-head h2 {
  color: #ffffff;
  font-size: 24px;
  font-weight: 800;
  margin: 0;
}

.page-head p {
  color: #6b7280;
  font-size: 13px;
  margin: 4px 0 0;
}

.btn-add {
  padding: 12px 22px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.25s;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(16, 185, 129, 0.4);
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #161b22;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  transition: 0.25s;
}

.project-item:hover {
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateX(4px);
}

.project-thumb {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 10px;
  background: #0d1117;
  flex-shrink: 0;
}

.project-info {
  flex: 1;
  min-width: 0;
}

.project-info h3 {
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 4px;
}

.project-info p {
  color: #9ca3af;
  font-size: 13px;
  margin: 0 0 8px;
}

.project-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.project-tags span {
  padding: 3px 9px;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  font-size: 11px;
  font-weight: 600;
  border-radius: 10px;
}

.project-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.btn-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-edit:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
}

.btn-delete:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: #ef4444;
}

@media (max-width: 768px) {
  .page-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-add {
    width: 100%;
  }

  .project-item {
    flex-wrap: wrap;
  }

  .project-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>