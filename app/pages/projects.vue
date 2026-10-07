<script setup lang="ts">
import profileImg from '~/assets/images/daniel.jpg'

definePageMeta({
  layout: 'default'
})

const projects = [
  {
    title: 'CombolojoSPORT',
    description: 'Sports venue booking platform for Ethiopia.',
    image: profileImg,
    tags: ['Nuxt.js', 'Laravel', 'Flutter'],
    demo: '#',
    github: '#'
  },
  {
    title: 'Internship Attendance System',
    description: 'Student, Advisor and Company management system.',
    image: profileImg,
    tags: ['Nuxt.js', 'Laravel', 'MySQL'],
    demo: '#',
    github: '#'
  },
  {
    title: 'Personal Portfolio',
    description: 'Modern developer portfolio website.',
    image: profileImg,
    tags: ['Nuxt.js', 'Vue.js', 'CSS'],
    demo: '#',
    github: '#'
  }
]
</script>

<template>
  <div class="projects-page">

    <!-- HEADER -->
    <section class="page-header">
      <div class="page-container">

        <span class="eyebrow">
          MY WORK
        </span>

        <h1>
          My <strong>Projects</strong>
        </h1>

        <p>
          Some of the projects I have worked on.
        </p>

      </div>
    </section>

    <!-- PROJECTS -->
    <section class="projects-section">
      <div class="page-container">

        <div class="projects-grid">

          <article
            v-for="project in projects"
            :key="project.title"
            class="project-card"
          >

            <div class="project-image">
              <img
                :src="project.image"
                :alt="project.title"
                loading="lazy"
              />
            </div>

            <div class="project-card-body">

              <h2>
                {{ project.title }}
              </h2>

              <p>
                {{ project.description }}
              </p>

              <ul class="project-tags">
                <li
                  v-for="tag in project.tags"
                  :key="tag"
                >
                  {{ tag }}
                </li>
              </ul>

              <div class="project-buttons">

                <a
                  :href="project.demo"
                  class="blue-button"
                >
                  ↗ Live Demo
                </a>

                <a
                  :href="project.github"
                  class="github-button"
                >
                  GitHub
                </a>

              </div>

            </div>

          </article>

        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
.projects-page {
  min-height: 100vh;
  background: #ffffff;
}

/* CONTAINER */

.page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* HEADER */

.page-header {
  padding: 85px 20px 65px;
  text-align: center;
  background: linear-gradient(
    135deg,
    #ffffff,
    #f8fafc
  );
  border-bottom: 1px solid #e2e8f0;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 12px;
  color: #2563eb;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 3px;
}

.page-header h1 {
  margin: 0 0 14px;
  color: #0f172a;
  font-size: 48px;
  font-weight: 800;
}

.page-header h1 strong {
  color: #2563eb;
}

.page-header p {
  margin: 0;
  color: #64748b;
  font-size: 17px;
}

/* PROJECT SECTION */

.projects-section {
  padding: 80px 20px;
  background: #f8fafc;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(320px, 1fr)
  );
  gap: 30px;
}

/* CARD */

.project-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.06);
  transition: 0.35s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: #93c5fd;
  box-shadow: 0 20px 45px rgba(37, 99, 235, 0.12);
}

/* IMAGE */

.project-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #eff6ff;
}

.project-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

/* BODY */

.project-card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 13px;
  padding: 26px 28px 28px;
}

.project-card-body h2 {
  margin: 0;
  color: #0f172a;
  font-size: 21px;
  font-weight: 800;
}

.project-card-body p {
  flex: 1;
  margin: 0;
  color: #64748b;
  font-size: 15px;
  line-height: 1.6;
}

/* TAGS */

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
}

.project-tags li {
  padding: 6px 12px;
  border-radius: 20px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
  transition: 0.25s ease;
}

.project-tags li:hover {
  background: #2563eb;
  color: #ffffff;
  transform: translateY(-2px);
}

/* BUTTONS */

.project-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.blue-button,
.github-button {
  flex: 1;
  padding: 11px 16px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  transition: 0.3s ease;
}

.blue-button {
  background: #2563eb;
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.22);
}

.blue-button:hover {
  background: #1d4ed8;
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.30);
}

.github-button {
  background: #ffffff;
  color: #334155;
  border: 1px solid #cbd5e1;
}

.github-button:hover {
  background: #f8fafc;
  color: #2563eb;
  border-color: #2563eb;
  transform: translateY(-3px);
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .page-header h1 {
    font-size: 40px;
  }

  .projects-grid {
    grid-template-columns: repeat(
      auto-fit,
      minmax(290px, 1fr)
    );
  }
}

@media (max-width: 600px) {
  .page-header {
    padding: 60px 16px 45px;
  }

  .page-header h1 {
    font-size: 32px;
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

  .project-image {
    height: 190px;
  }

  .project-card-body {
    padding: 22px;
  }

  .project-buttons {
    flex-direction: column;
  }
}
</style>