<script setup lang="ts">

definePageMeta({
  layout: 'default'
})

import profileImg from '~/assets/images/daniel.jpg'


// =========================================
// DATA
// =========================================

const stats = [
  {
    value: '7+',
    label: 'Projects Completed'
  },
  {
    value: '1+',
    label: 'Year Experience'
  },
  {
    value: '100%',
    label: 'Passion'
  }
]

const skills = [
  'Nuxt.js',
  'Laravel',
  'Flutter',
  'Vue.js',
  'Tailwind CSS',
  'MySQL'
]

const projects = [
  {
    slug: 'combolojosport',
    title: 'CombolojoSPORT',
    description:
      'A sports venue booking platform designed to help users discover and book sports venues across Ethiopia.',
    image: profileImg,
    tags: ['Nuxt.js', 'Laravel', 'Flutter']
  },
  {
    slug: 'internship-attendance-system',
    title: 'Internship Attendance System',
    description:
      'A management system connecting students, company supervisors, advisors, and administrators.',
    image: profileImg,
    tags: ['Nuxt.js', 'Laravel', 'MySQL']
  }
]

</script>


<template>

  <div class="portfolio-page">

    <!-- =========================================
         BACKGROUND DECORATION
    ========================================== -->

    <div class="blue-glow glow-one"></div>
    <div class="blue-glow glow-two"></div>


    <!-- =========================================
         HERO
    ========================================== -->

    <section class="hero-section">

      <div class="hero-container">

        <!-- LEFT -->

        <div class="hero-content">

          <span class="hello-text">
            HELLO, I'M
          </span>


          <h1 class="hero-title">
            Daniel
            <span>Zigabe</span>
          </h1>


          <h2 class="hero-role">
            Frontend Developer
          </h2>


          <p class="hero-description">
            I build modern, responsive and user-friendly web applications
            that solve real problems and create great user experiences.
          </p>


          <!-- BUTTONS -->

          <div class="hero-buttons">

            <NuxtLink
              to="/projects"
              class="primary-button"
            >
              View My Projects
              <span>→</span>
            </NuxtLink>


            <a
              href="/cv/Daniel-Zigabe-CV.pdf"
              download
              class="secondary-button"
            >
              <span>↓</span>
              Download CV
            </a>

          </div>


          <!-- STATS -->

          <div class="stats-container">

            <div
              v-for="stat in stats"
              :key="stat.label"
              class="stat"
            >

              <strong>
                {{ stat.value }}
              </strong>

              <span>
                {{ stat.label }}
              </span>

            </div>

          </div>

        </div>


        <!-- RIGHT PROFILE -->

        <div class="profile-section">

          <div class="profile-glow"></div>


          <div class="profile-circle">

            <img
              :src="profileImg"
              alt="Daniel Zigabe"
            />

          </div>


          <!-- CODE BADGE -->

          <div class="code-badge">
            &lt;/&gt;
          </div>


          <!-- NUXT BADGE -->

          <div class="tech-badge">
            Nuxt
          </div>

        </div>

      </div>

    </section>


    <!-- =========================================
         SKILLS
    ========================================== -->

    <section class="skills-section">

      <div class="container">

        <div class="section-header">

          <span>
            TECHNOLOGIES
          </span>

          <h2>
            My Main Skills
          </h2>

          <p>
            Technologies and tools I use to build modern web and mobile
            applications.
          </p>

        </div>


        <div class="skills-grid">

          <div
            v-for="skill in skills"
            :key="skill"
            class="skill-card"
          >

            <div class="skill-icon">
              &lt;/&gt;
            </div>

            <h3>
              {{ skill }}
            </h3>

          </div>

        </div>

      </div>

    </section>


    <!-- =========================================
         PROJECTS
    ========================================== -->

    <section class="projects-section">

      <div class="container">

        <div class="section-header">

          <span>
            MY WORK
          </span>

          <h2>
            Featured Projects
          </h2>

          <p>
            Some of the projects I have designed and developed using
            modern technologies.
          </p>

        </div>


        <div class="projects-grid">

          <article
            v-for="project in projects"
            :key="project.slug"
            class="project-card"
          >

            <div class="project-image">

              <img
                :src="project.image"
                :alt="project.title"
              />

            </div>


            <div class="project-content">

              <span class="project-label">
                FEATURED PROJECT
              </span>

              <h3>
                {{ project.title }}
              </h3>

              <p>
                {{ project.description }}
              </p>


              <div class="project-tags">

                <span
                  v-for="tag in project.tags"
                  :key="tag"
                >
                  {{ tag }}
                </span>

              </div>


              <NuxtLink
                :to="`/projects/${project.slug}`"
                class="project-link"
              >
                View Project
                <span>→</span>
              </NuxtLink>

            </div>

          </article>

        </div>


        <div class="view-all">

          <NuxtLink to="/projects">
            View All Projects
            <span>→</span>
          </NuxtLink>

        </div>

      </div>

    </section>


    <!-- =========================================
         CONTACT
    ========================================== -->

    <section class="contact-section">

      <div class="contact-box">

        <div>

          <span>
            GET IN TOUCH
          </span>

          <h2>
            Let's work together!
          </h2>

          <p>
            I'm always open to new opportunities, collaborations,
            and exciting projects.
          </p>

        </div>


        <NuxtLink
          to="/contact"
          class="contact-button"
        >
          Contact Me
          <span>→</span>
        </NuxtLink>

      </div>

    </section>

  </div>

</template>


<style scoped>

/* =========================================
   PAGE
========================================= */

.portfolio-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  background-color: rgb(255, 255, 255);

  color: rgb(15, 23, 42);
}


/* =========================================
   BACKGROUND GLOW
========================================= */

.blue-glow {
  position: absolute;

  width: 350px;
  height: 350px;

  border-radius: 50%;

  background-color: rgba(37, 99, 235, 0.06);

  filter: blur(90px);

  pointer-events: none;
}

.glow-one {
  top: 100px;
  right: -150px;
}

.glow-two {
  top: 700px;
  left: -180px;
}


/* =========================================
   HERO
========================================= */

.hero-section {
  position: relative;

  padding: 100px 24px 90px;

  background-color: rgb(255, 255, 255);
}

.hero-container {
  max-width: 1250px;

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 80px;
}


/* =========================================
   HERO CONTENT
========================================= */

.hero-content {
  flex: 1;
  max-width: 680px;
}

.hello-text {
  display: inline-block;

  margin-bottom: 18px;

  color: rgb(37, 99, 235);

  font-size: 13px;
  font-weight: 800;

  letter-spacing: 0.2em;
}


.hero-title {
  margin: 0;

  color: rgb(15, 23, 42);

  font-size: clamp(52px, 7vw, 82px);

  font-weight: 900;

  line-height: 1.05;

  letter-spacing: -0.05em;
}

.hero-title span {
  display: block;

  color: rgb(37, 99, 235);
}


.hero-role {
  margin-top: 22px;

  color: rgb(51, 65, 85);

  font-size: 30px;

  font-weight: 700;
}


.hero-description {
  max-width: 650px;

  margin-top: 20px;

  color: rgb(100, 116, 139);

  font-size: 17px;

  line-height: 1.9;
}


/* =========================================
   BUTTONS
========================================= */

.hero-buttons {
  display: flex;

  flex-wrap: wrap;

  gap: 16px;

  margin-top: 32px;
}

.primary-button,
.secondary-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 10px;

  min-height: 54px;

  padding: 0 25px;

  border-radius: 14px;

  text-decoration: none;

  font-size: 15px;

  font-weight: 700;

  transition: all 0.3s ease;
}


.primary-button {
  background-color: rgb(37, 99, 235);

  color: white;

  box-shadow:
    0 12px 30px rgba(37, 99, 235, 0.20);
}

.primary-button:hover {
  transform: translateY(-4px);

  background-color: rgb(29, 78, 216);

  box-shadow:
    0 18px 35px rgba(37, 99, 235, 0.28);
}


.secondary-button {
  border: 1px solid rgb(191, 219, 254);

  background-color: white;

  color: rgb(37, 99, 235);
}

.secondary-button:hover {
  transform: translateY(-4px);

  border-color: rgb(37, 99, 235);

  background-color: rgb(239, 246, 255);
}


/* =========================================
   STATS
========================================= */

.stats-container {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  max-width: 700px;

  margin-top: 55px;

  padding-top: 30px;

  border-top: 1px solid rgb(226, 232, 240);
}

.stat {
  position: relative;

  padding-right: 30px;
}

.stat:not(:last-child)::after {
  content: '';

  position: absolute;

  top: 5px;
  right: 15px;

  width: 1px;
  height: 48px;

  background-color: rgb(226, 232, 240);
}

.stat strong {
  display: block;

  color: rgb(37, 99, 235);

  font-size: 34px;

  font-weight: 800;
}

.stat span {
  display: block;

  margin-top: 5px;

  color: rgb(100, 116, 139);

  font-size: 13px;
}


/* =========================================
   PROFILE
========================================= */

.profile-section {
  position: relative;

  flex: 1;

  min-height: 480px;

  display: flex;

  align-items: center;
  justify-content: center;
}

.profile-glow {
  position: absolute;

  width: 390px;
  height: 390px;

  border-radius: 50%;

  background-color: rgba(37, 99, 235, 0.10);

  filter: blur(70px);
}


.profile-circle {
  position: relative;

  width: 340px;
  height: 340px;

  padding: 7px;

  border-radius: 50%;

  background-color: white;

  border: 7px solid rgb(219, 234, 254);

  box-shadow:
    0 20px 60px rgba(37, 99, 235, 0.18);

  overflow: hidden;
}

.profile-circle img {
  width: 100%;
  height: 100%;

  display: block;

  border-radius: 50%;

  object-fit: cover;
}


/* =========================================
   CODE BADGE
========================================= */

.code-badge {
  position: absolute;

  right: 70px;
  bottom: 55px;

  width: 68px;
  height: 68px;

  display: flex;

  align-items: center;
  justify-content: center;

  border: 5px solid white;

  border-radius: 50%;

  background-color: rgb(37, 99, 235);

  color: white;

  font-family: monospace;

  font-size: 16px;

  font-weight: 800;

  box-shadow:
    0 10px 25px rgba(37, 99, 235, 0.25);
}


/* =========================================
   TECH BADGE
========================================= */

.tech-badge {
  position: absolute;

  right: -10px;
  bottom: 90px;

  padding: 12px 20px;

  border: 1px solid rgb(191, 219, 254);

  border-radius: 12px;

  background-color: white;

  color: rgb(37, 99, 235);

  font-size: 14px;

  font-weight: 700;

  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.08);
}


/* =========================================
   SECTIONS
========================================= */

.skills-section,
.projects-section {
  position: relative;

  padding: 100px 24px;
}

.skills-section {
  border-top: 1px solid rgb(226, 232, 240);
  border-bottom: 1px solid rgb(226, 232, 240);

  background-color: rgb(248, 250, 252);
}


.container {
  max-width: 1250px;

  margin: 0 auto;
}


/* =========================================
   SECTION HEADER
========================================= */

.section-header {
  max-width: 700px;

  margin: 0 auto 55px;

  text-align: center;
}

.section-header span {
  color: rgb(37, 99, 235);

  font-size: 12px;

  font-weight: 800;

  letter-spacing: 0.25em;
}

.section-header h2 {
  margin-top: 12px;

  color: rgb(15, 23, 42);

  font-size: 42px;

  font-weight: 800;

  letter-spacing: -0.03em;
}

.section-header p {
  margin-top: 15px;

  color: rgb(100, 116, 139);

  font-size: 15px;

  line-height: 1.8;
}


/* =========================================
   SKILLS
========================================= */

.skills-grid {
  display: grid;

  grid-template-columns: repeat(6, 1fr);

  gap: 18px;
}

.skill-card {
  min-height: 155px;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 15px;

  border: 1px solid rgb(226, 232, 240);

  border-radius: 18px;

  background-color: white;

  box-shadow:
    0 5px 20px rgba(15, 23, 42, 0.04);

  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-8px);

  border-color: rgb(147, 197, 253);

  box-shadow:
    0 15px 35px rgba(37, 99, 235, 0.10);
}


.skill-icon {
  width: 52px;
  height: 52px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 14px;

  background-color: rgb(239, 246, 255);

  color: rgb(37, 99, 235);

  font-family: monospace;

  font-size: 17px;

  font-weight: 800;
}

.skill-card h3 {
  color: rgb(30, 41, 59);

  font-size: 14px;

  font-weight: 700;
}


/* =========================================
   PROJECTS
========================================= */

.projects-grid {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 30px;
}

.project-card {
  overflow: hidden;

  border: 1px solid rgb(226, 232, 240);

  border-radius: 22px;

  background-color: white;

  box-shadow:
    0 8px 30px rgba(15, 23, 42, 0.05);

  transition: all 0.35s ease;
}

.project-card:hover {
  transform: translateY(-8px);

  border-color: rgb(147, 197, 253);

  box-shadow:
    0 20px 45px rgba(37, 99, 235, 0.10);
}


/* =========================================
   PROJECT IMAGE
========================================= */

.project-image {
  height: 270px;

  overflow: hidden;

  background-color: rgb(239, 246, 255);
}

.project-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.06);
}


/* =========================================
   PROJECT CONTENT
========================================= */

.project-content {
  padding: 28px;
}

.project-label {
  color: rgb(37, 99, 235);

  font-size: 11px;

  font-weight: 800;

  letter-spacing: 0.15em;
}

.project-content h3 {
  margin-top: 10px;

  color: rgb(15, 23, 42);

  font-size: 24px;

  font-weight: 800;
}

.project-content p {
  margin-top: 12px;

  color: rgb(100, 116, 139);

  font-size: 14px;

  line-height: 1.8;
}


/* =========================================
   PROJECT TAGS
========================================= */

.project-tags {
  display: flex;

  flex-wrap: wrap;

  gap: 8px;

  margin-top: 20px;
}

.project-tags span {
  padding: 7px 12px;

  border: 1px solid rgb(191, 219, 254);

  border-radius: 8px;

  background-color: rgb(239, 246, 255);

  color: rgb(37, 99, 235);

  font-size: 11px;

  font-weight: 700;
}


/* =========================================
   PROJECT LINK
========================================= */

.project-link {
  display: inline-flex;

  align-items: center;

  gap: 8px;

  margin-top: 23px;

  color: rgb(37, 99, 235);

  text-decoration: none;

  font-size: 14px;

  font-weight: 800;
}

.project-link span {
  transition: transform 0.3s ease;
}

.project-link:hover span {
  transform: translateX(5px);
}


/* =========================================
   VIEW ALL
========================================= */

.view-all {
  display: flex;

  justify-content: center;

  margin-top: 45px;
}

.view-all a {
  display: inline-flex;

  align-items: center;

  gap: 10px;

  padding: 13px 22px;

  border: 1px solid rgb(191, 219, 254);

  border-radius: 12px;

  background-color: white;

  color: rgb(37, 99, 235);

  text-decoration: none;

  font-size: 14px;

  font-weight: 700;

  transition: all 0.3s ease;
}

.view-all a:hover {
  transform: translateY(-3px);

  background-color: rgb(239, 246, 255);

  border-color: rgb(37, 99, 235);
}


/* =========================================
   CONTACT
========================================= */

.contact-section {
  padding: 0 24px 100px;

  background-color: white;
}

.contact-box {
  position: relative;

  max-width: 1050px;

  margin: 0 auto;

  padding: 55px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 40px;

  border: 1px solid rgb(191, 219, 254);

  border-radius: 28px;

  background:
    linear-gradient(
      135deg,
      rgb(239, 246, 255),
      rgb(255, 255, 255)
    );

  box-shadow:
    0 20px 50px rgba(37, 99, 235, 0.08);
}

.contact-box > div span {
  color: rgb(37, 99, 235);

  font-size: 12px;

  font-weight: 800;

  letter-spacing: 0.2em;
}

.contact-box h2 {
  margin-top: 12px;

  color: rgb(15, 23, 42);

  font-size: 36px;

  font-weight: 800;
}

.contact-box p {
  max-width: 600px;

  margin-top: 12px;

  color: rgb(100, 116, 139);

  font-size: 14px;

  line-height: 1.8;
}


.contact-button {
  flex-shrink: 0;

  display: inline-flex;

  align-items: center;

  gap: 10px;

  padding: 15px 24px;

  border-radius: 13px;

  background-color: rgb(37, 99, 235);

  color: white;

  text-decoration: none;

  font-size: 14px;

  font-weight: 800;

  box-shadow:
    0 12px 30px rgba(37, 99, 235, 0.20);

  transition: all 0.3s ease;
}

.contact-button:hover {
  transform: translateY(-4px);

  background-color: rgb(29, 78, 216);

  box-shadow:
    0 18px 35px rgba(37, 99, 235, 0.28);
}


/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 1100px) {

  .hero-container {
    gap: 40px;
  }

  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
  }

}


@media (max-width: 900px) {

  .hero-container {
    flex-direction: column;

    text-align: center;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-buttons {
    justify-content: center;
  }

  .stats-container {
    margin-left: auto;
    margin-right: auto;
  }

  .profile-section {
    width: 100%;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .contact-box {
    flex-direction: column;

    text-align: center;
  }

}


@media (max-width: 650px) {

  .hero-section {
    padding: 70px 18px;
  }

  .hero-title {
    font-size: 50px;
  }

  .hero-role {
    font-size: 24px;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }

  .stats-container {
    gap: 10px;
  }

  .stat strong {
    font-size: 25px;
  }

  .stat span {
    font-size: 11px;
  }

  .profile-circle {
    width: 270px;
    height: 270px;
  }

  .profile-glow {
    width: 300px;
    height: 300px;
  }

  .code-badge {
    right: 20px;
    bottom: 40px;

    width: 58px;
    height: 58px;
  }

  .tech-badge {
    right: 0;
    bottom: 80px;
  }

  .skills-section,
  .projects-section {
    padding: 75px 18px;
  }

  .section-header h2 {
    font-size: 32px;
  }

  .skills-grid {
    grid-template-columns: repeat(2, 1fr);

    gap: 12px;
  }

  .skill-card {
    min-height: 135px;
  }

  .project-image {
    height: 220px;
  }

  .contact-section {
    padding: 0 18px 75px;
  }

  .contact-box {
    padding: 35px 22px;
  }

  .contact-box h2 {
    font-size: 28px;
  }

  .contact-button {
    width: 100%;

    justify-content: center;
  }

}


@media (max-width: 400px) {

  .hero-title {
    font-size: 43px;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

}


/* =========================================
   ACCESSIBILITY
========================================= */

a:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.35);

  outline-offset: 4px;
}

</style>