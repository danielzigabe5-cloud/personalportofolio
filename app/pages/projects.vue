<script setup lang="ts">
const projects = [
  {
    title: 'CombolojoSPORT',
    description: 'Sports venue booking platform for Ethiopia.',
    image: '/images/combolojo.jpg',
    tags: ['Nuxt.js', 'Laravel', 'Flutter']
  },
  {
    title: 'Internship Attendance System',
    description: 'Student, Advisor and Company management system.',
    image: '/images/internship.jpg',
    tags: ['Nuxt.js', 'Laravel', 'MySQL']
  },
  {
    title: 'Personal Portfolio',
    description: 'Modern developer portfolio website.',
    image: '/images/portfolio.jpg',
    tags: ['Nuxt.js', 'Vue.js', 'CSS']
  }
]
</script>

<template>
  <div>
    <section class="page-header">
      <div class="page-container">
        <span>MY WORK</span>
        <h1>My <strong>Projects</strong></h1>
        <p>Some of the projects I have worked on.</p>
      </div>
    </section>

    <section class="projects-section">
      <div class="page-container projects-grid">
        <article
          v-for="project in projects"
          :key="project.title"
          class="project-card-large"
        >
          <img :src="project.image" :alt="project.title" />

          <div class="project-card-body">
            <h2>{{ project.title }}</h2>
            <p>{{ project.description }}</p>

            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag">
                {{ tag }}
              </span>
            </div>

            <div class="project-buttons">
              <a href="#" class="green-small-button">↗ Live Demo</a>
              <a href="#" class="dark-small-button">GitHub</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== Base Container ===== */
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ===== Page Header ===== */
.page-header {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #fff;
  padding: 80px 20px 60px;
  text-align: center;
  border-bottom: 3px solid #42b883;
}

.page-header span {
  display: inline-block;
  color: #42b883;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.page-header h1 {
  font-size: 48px;
  font-weight: 800;
  margin: 0 0 14px;
  color: #ffffff;
}

.page-header h1 strong {
  color: #42b883;
}

.page-header p {
  color: #94a3b8;
  font-size: 17px;
  margin: 0;
}

/* ===== Projects Section ===== */
.projects-section {
  background: #f8fafc;
  padding: 80px 20px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 32px;
}

/* ===== Project Card ===== */
.project-card-large {
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.06);
  transition: 0.35s;
  display: flex;
  flex-direction: column;
}

.project-card-large:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(66, 184, 131, 0.18);
  border-color: #42b883;
}

/* ===== Project Image ===== */
.project-card-large img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  transition: 0.5s;
  display: block;
}

.project-card-large:hover img {
  transform: scale(1.05);
}

/* ===== Card Body ===== */
.project-card-body {
  padding: 26px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.project-card-body h2 {
  color: #0f172a;
  font-size: 21px;
  font-weight: 800;
  margin: 0;
  line-height: 1.3;
}

.project-card-body p {
  color: #64748b;
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

/* ===== Tags ===== */
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.project-tags span {
  display: inline-block;
  padding: 5px 12px;
  background: rgba(66, 184, 131, 0.1);
  color: #42b883;
  font-size: 12px;
  font-weight: 700;
  border-radius: 20px;
  letter-spacing: 0.4px;
  border: 1px solid rgba(66, 184, 131, 0.2);
  transition: 0.25s;
}

.project-tags span:hover {
  background: #42b883;
  color: #ffffff;
  transform: translateY(-2px);
}

/* ===== Buttons ===== */
.project-buttons {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.green-small-button,
.dark-small-button {
  flex: 1;
  padding: 11px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;
  letter-spacing: 0.3px;
}

.green-small-button {
  background: linear-gradient(135deg, #42b883, #347474);
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(66, 184, 131, 0.3);
}

.green-small-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(66, 184, 131, 0.45);
}

.dark-small-button {
  background: #0f172a;
  color: #e2e8f0;
  border: 1px solid #334155;
}

.dark-small-button:hover {
  background: #1e293b;
  color: #42b883;
  border-color: #42b883;
  transform: translateY(-3px);
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .page-header h1 {
    font-size: 38px;
  }
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }
  .project-card-large img {
    height: 200px;
  }
}

@media (max-width: 600px) {
  .page-header {
    padding: 60px 16px 40px;
  }
  .page-header h1 {
    font-size: 30px;
  }
  .page-header p {
    font-size: 15px;
  }
  .projects-section {
    padding: 50px 16px;
  }
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .project-card-large img {
    height: 190px;
  }
  .project-card-body {
    padding: 22px 22px 24px;
  }
  .project-card-body h2 {
    font-size: 18px;
  }
  .project-buttons {
    flex-direction: column;
  }
}
</style>