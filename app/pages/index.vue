<script setup lang="ts">

definePageMeta({
  layout: 'default'
})

import profileImg from '~/assets/images/daniel.jpg'

/* =========================================================
   DATA
========================================================= */

const stats = [
  {
    value: '7+',
    label: 'Projects Built'
  },
  {
    value: '1+',
    label: 'Year Experience'
  },
  {
    value: '6+',
    label: 'Technologies'
  }
]

const skills = [
  {
    name: 'Nuxt.js',
    short: 'N'
  },
  {
    name: 'Laravel',
    short: 'L'
  },
  {
    name: 'Flutter',
    short: 'F'
  },
  {
    name: 'Vue.js',
    short: 'V'
  },
  {
    name: 'Tailwind CSS',
    short: 'T'
  },
  {
    name: 'MySQL',
    short: 'M'
  }
]

const projects = [
  {
    slug: 'combolojosport',
    number: '01',
    category: 'WEB & MOBILE PLATFORM',
    title: 'CombolojoSPORT',
    description:
      'A sports venue platform designed to help users discover sports facilities, explore events and connect with venue services across Ethiopia.',
    tags: ['Nuxt.js', 'Laravel', 'Flutter'],
    image: profileImg
  },
  {
    slug: 'internship-attendance-system',
    number: '02',
    category: 'MANAGEMENT SYSTEM',
    title: 'Internship Attendance System',
    description:
      'A multi-role internship management platform connecting students, company supervisors, advisors and administrators.',
    tags: ['Nuxt.js', 'Laravel', 'MySQL'],
    image: profileImg
  }
]

const services = [
  {
    number: '01',
    title: 'Frontend Development',
    description:
      'Building responsive and accessible interfaces with modern frontend technologies.'
  },
  {
    number: '02',
    title: 'Web Applications',
    description:
      'Developing practical web applications that solve real business and user problems.'
  },
  {
    number: '03',
    title: 'Mobile Applications',
    description:
      'Creating cross-platform mobile experiences using Flutter and connected APIs.'
  }
]

</script>


<template>

  <div class="portfolio-page">

    <!-- =====================================================
         BACKGROUND DECORATION
    ====================================================== -->

    <div class="background-grid"></div>

    <div class="blue-glow glow-one"></div>
    <div class="blue-glow glow-two"></div>


    <!-- =====================================================
         HERO
    ====================================================== -->

    <section class="hero-section">

      <div class="hero-container">

        <!-- LEFT CONTENT -->

        <div class="hero-content">

          <div class="availability">

            <span class="availability-dot"></span>

            <span>
              AVAILABLE FOR OPPORTUNITIES
            </span>

          </div>


          <span class="hello-text">
            HELLO, I'M
          </span>


          <h1 class="hero-title">

            Daniel

            <span>
              Zigabe.
            </span>

          </h1>


          <div class="hero-role-wrapper">

            <span class="role-line"></span>

            <h2 class="hero-role">
              Frontend Developer
            </h2>

          </div>


          <p class="hero-description">
            I design and build modern, responsive web and mobile
            applications that turn ideas into practical digital
            solutions.
          </p>


          <!-- BUTTONS -->

          <div class="hero-buttons">

            <NuxtLink
              to="/projects"
              class="primary-button"
            >

              <span>
                Explore My Work
              </span>

              <span class="button-arrow">
                →
              </span>

            </NuxtLink>


            <NuxtLink
              to="/contact"
              class="secondary-button"
            >

              <span>
                Let's Talk
              </span>

            </NuxtLink>

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

          <div class="profile-background"></div>

          <div class="profile-ring ring-one"></div>
          <div class="profile-ring ring-two"></div>


          <div class="profile-circle">

            <img
              :src="profileImg"
              alt="Daniel Zigabe - Frontend Developer"
            />

          </div>


          <!-- CODE CARD -->

          <div class="floating-card code-card">

            <span class="code-icon">
              &lt;/&gt;
            </span>

            <div>
              <strong>
                Developer
              </strong>

              <small>
                Building with code
              </small>
            </div>

          </div>


          <!-- TECH CARD -->

          <div class="floating-card tech-card">

            <span class="tech-symbol">
              N
            </span>

            <div>
              <strong>
                Nuxt.js
              </strong>

              <small>
                Frontend
              </small>
            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         INTRO STRIP
    ====================================================== -->

    <section class="intro-strip">

      <div class="container">

        <div class="intro-content">

          <span class="intro-label">
            WHAT I DO
          </span>

          <p>
            I combine design, development and problem solving to
            create useful digital experiences.
          </p>

        </div>

      </div>

    </section>


    <!-- =====================================================
         SERVICES
    ====================================================== -->

    <section class="services-section">

      <div class="container">

        <div class="section-header left">

          <span>
            WHAT I BUILD
          </span>

          <h2>
            Turning ideas into
            <strong>digital products.</strong>
          </h2>

          <p>
            My focus is on building practical, scalable and
            user-friendly applications using modern technologies.
          </p>

        </div>


        <div class="services-grid">

          <article
            v-for="service in services"
            :key="service.number"
            class="service-card"
          >

            <span class="service-number">
              {{ service.number }}
            </span>

            <div class="service-icon">
              +
            </div>

            <h3>
              {{ service.title }}
            </h3>

            <p>
              {{ service.description }}
            </p>

            <span class="service-arrow">
              →
            </span>

          </article>

        </div>

      </div>

    </section>


    <!-- =====================================================
         SKILLS
    ====================================================== -->

    <section class="skills-section">

      <div class="container">

        <div class="section-header">

          <span>
            TECHNOLOGIES
          </span>

          <h2>
            Tools I use to
            <strong>build.</strong>
          </h2>

          <p>
            A selection of technologies I use for web, backend
            and mobile application development.
          </p>

        </div>


        <div class="skills-grid">

          <div
            v-for="skill in skills"
            :key="skill.name"
            class="skill-card"
          >

            <div class="skill-icon">
              {{ skill.short }}
            </div>

            <div class="skill-info">

              <h3>
                {{ skill.name }}
              </h3>

              <span>
                Technology
              </span>

            </div>

            <span class="skill-arrow">
              →
            </span>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         FEATURED PROJECTS
    ====================================================== -->

    <section class="projects-section">

      <div class="container">

        <div class="projects-heading">

          <div class="section-header left">

            <span>
              SELECTED WORK
            </span>

            <h2>
              Projects I'm
              <strong>proud of.</strong>
            </h2>

          </div>


          <NuxtLink
            to="/projects"
            class="all-projects-link"
          >
            View all projects
            <span>→</span>
          </NuxtLink>

        </div>


        <div class="projects-grid">

          <article
            v-for="project in projects"
            :key="project.slug"
            class="project-card"
          >

            <!-- PROJECT VISUAL -->

            <div class="project-visual">

              <div class="project-number">
                {{ project.number }}
              </div>

              <div class="project-pattern">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <img
                :src="project.image"
                :alt="project.title"
              />

              <div class="project-overlay"></div>

            </div>


            <!-- PROJECT CONTENT -->

            <div class="project-content">

              <span class="project-label">
                {{ project.category }}
              </span>

              <h3>
                {{ project.title }}
              </h3>

              <p>
                {{ project.description }}
              </p>


              <div class="project-footer">

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
                  :aria-label="`View ${project.title}`"
                >
                  →
                </NuxtLink>

              </div>

            </div>

          </article>

        </div>

      </div>

    </section>


    <!-- =====================================================
         CV / ABOUT CTA
    ====================================================== -->

    <section class="career-section">

      <div class="container">

        <div class="career-card">

          <div class="career-content">

            <span>
              A LITTLE MORE ABOUT ME
            </span>

            <h2>
              Curious about my
              <strong>journey?</strong>
            </h2>

            <p>
              Learn more about my education, professional experience,
              technical skills and the projects I have worked on.
            </p>


            <div class="career-buttons">

              <NuxtLink
                to="/about"
                class="dark-button"
              >
                About Me
                <span>→</span>
              </NuxtLink>


              <a
                href="/cv/Daniel-Zigabe-CV.pdf"
                download
                class="outline-button"
              >
                Download CV
                <span>↓</span>
              </a>

            </div>

          </div>


          <div class="career-mark">
            DZ
          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         CONTACT CTA
    ====================================================== -->

    <section class="contact-section">

      <div class="container">

        <div class="contact-box">

          <div class="contact-content">

            <span>
              GET IN TOUCH
            </span>

            <h2>
              Have a project
              <strong>in mind?</strong>
            </h2>

            <p>
              Let's discuss your idea and see how we can turn it
              into a useful digital product.
            </p>

          </div>


          <NuxtLink
            to="/contact"
            class="contact-button"
          >

            <span>
              Start a Conversation
            </span>

            <span>
              →
            </span>

          </NuxtLink>

        </div>

      </div>

    </section>

  </div>

</template>


<style scoped>

/* =========================================================
   BASE
========================================================= */

.portfolio-page {
  position: relative;

  min-height: 100vh;

  overflow: hidden;

  background: #ffffff;

  color: #0f172a;
}

.container {
  width: 100%;

  max-width: 1180px;

  margin: 0 auto;

  padding: 0 28px;
}


/* =========================================================
   BACKGROUND
========================================================= */

.background-grid {
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 700px;

  pointer-events: none;

  opacity: 0.35;

  background-image:
    linear-gradient(
      to right,
      rgba(15, 23, 42, 0.025) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      rgba(15, 23, 42, 0.025) 1px,
      transparent 1px
    );

  background-size: 55px 55px;

  mask-image:
    linear-gradient(
      to bottom,
      black,
      transparent
    );
}

.blue-glow {
  position: absolute;

  width: 400px;
  height: 400px;

  border-radius: 50%;

  background: rgba(37, 99, 235, 0.07);

  filter: blur(100px);

  pointer-events: none;
}

.glow-one {
  top: 70px;
  right: -180px;
}

.glow-two {
  top: 950px;
  left: -200px;
}


/* =========================================================
   HERO
========================================================= */

.hero-section {
  position: relative;

  padding: 105px 24px 95px;

  background:
    linear-gradient(
      180deg,
      #ffffff 0%,
      #f8fafc 100%
    );
}

.hero-container {
  position: relative;

  max-width: 1250px;

  margin: 0 auto;

  display: grid;

  grid-template-columns: 1.1fr 0.9fr;

  align-items: center;

  gap: 70px;
}


/* =========================================================
   HERO CONTENT
========================================================= */

.hero-content {
  position: relative;

  z-index: 2;

  max-width: 680px;
}

.availability {
  display: inline-flex;

  align-items: center;

  gap: 9px;

  margin-bottom: 28px;

  padding: 7px 12px;

  border: 1px solid #dcfce7;

  border-radius: 999px;

  background: #f0fdf4;

  color: #15803d;

  font-size: 9px;

  font-weight: 900;

  letter-spacing: 1.3px;
}

.availability-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #22c55e;

  box-shadow:
    0 0 0 4px rgba(34, 197, 94, 0.12);
}

.hello-text {
  display: block;

  margin-bottom: 12px;

  color: #2563eb;

  font-size: 12px;

  font-weight: 900;

  letter-spacing: 3px;
}

.hero-title {
  margin: 0;

  color: #0f172a;

  font-size: clamp(52px, 7vw, 84px);

  line-height: 0.98;

  font-weight: 900;

  letter-spacing: -4px;
}

.hero-title span {
  display: block;

  color: #2563eb;
}

.hero-role-wrapper {
  display: flex;

  align-items: center;

  gap: 13px;

  margin-top: 26px;
}

.role-line {
  width: 32px;
  height: 3px;

  border-radius: 999px;

  background: #2563eb;
}

.hero-role {
  margin: 0;

  color: #334155;

  font-size: 25px;

  font-weight: 800;
}

.hero-description {
  max-width: 620px;

  margin: 22px 0 0;

  color: #64748b;

  font-size: 16px;

  line-height: 1.9;
}


/* =========================================================
   HERO BUTTONS
========================================================= */

.hero-buttons {
  display: flex;

  flex-wrap: wrap;

  gap: 12px;

  margin-top: 31px;
}

.primary-button,
.secondary-button {
  min-height: 50px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 11px;

  padding: 0 20px;

  border-radius: 10px;

  text-decoration: none;

  font-size: 12px;

  font-weight: 800;

  transition:
    transform 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.primary-button {
  background: #2563eb;

  color: #ffffff;

  box-shadow:
    0 10px 25px rgba(37, 99, 235, 0.2);
}

.primary-button:hover {
  transform: translateY(-3px);

  background: #1d4ed8;

  box-shadow:
    0 15px 30px rgba(37, 99, 235, 0.27);
}

.secondary-button {
  border: 1px solid #cbd5e1;

  background: #ffffff;

  color: #334155;
}

.secondary-button:hover {
  transform: translateY(-3px);

  border-color: #93c5fd;

  color: #2563eb;

  background: #eff6ff;
}

.button-arrow {
  font-size: 17px;

  transition:
    transform 0.25s ease;
}

.primary-button:hover .button-arrow {
  transform: translateX(4px);
}


/* =========================================================
   STATS
========================================================= */

.stats-container {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  max-width: 650px;

  margin-top: 48px;

  padding-top: 26px;

  border-top: 1px solid #e2e8f0;
}

.stat {
  position: relative;

  padding-right: 25px;
}

.stat:not(:last-child)::after {
  content: '';

  position: absolute;

  top: 3px;
  right: 15px;

  width: 1px;
  height: 42px;

  background: #e2e8f0;
}

.stat strong {
  display: block;

  color: #0f172a;

  font-size: 26px;

  font-weight: 900;
}

.stat span {
  display: block;

  margin-top: 4px;

  color: #94a3b8;

  font-size: 10px;

  font-weight: 700;
}


/* =========================================================
   PROFILE
========================================================= */

.profile-section {
  position: relative;

  min-height: 490px;

  display: flex;

  align-items: center;

  justify-content: center;
}

.profile-background {
  position: absolute;

  width: 360px;
  height: 360px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(37, 99, 235, 0.12),
      rgba(37, 99, 235, 0.025) 60%,
      transparent 70%
    );

  filter: blur(2px);
}

.profile-ring {
  position: absolute;

  border: 1px solid #dbeafe;

  border-radius: 50%;
}

.ring-one {
  width: 410px;
  height: 410px;

  opacity: 0.8;
}

.ring-two {
  width: 470px;
  height: 470px;

  border-style: dashed;

  opacity: 0.45;
}

.profile-circle {
  position: relative;

  z-index: 2;

  width: 330px;
  height: 330px;

  padding: 7px;

  border: 1px solid #bfdbfe;

  border-radius: 50%;

  background: #ffffff;

  box-shadow:
    0 25px 65px rgba(37, 99, 235, 0.17);

  overflow: hidden;
}

.profile-circle::after {
  content: '';

  position: absolute;

  inset: 7px;

  border: 1px solid rgba(255, 255, 255, 0.5);

  border-radius: 50%;

  pointer-events: none;
}

.profile-circle img {
  width: 100%;
  height: 100%;

  display: block;

  border-radius: 50%;

  object-fit: cover;
}


/* =========================================================
   FLOATING CARDS
========================================================= */

.floating-card {
  position: absolute;

  z-index: 4;

  display: flex;

  align-items: center;

  gap: 10px;

  padding: 10px 13px;

  border: 1px solid #e2e8f0;

  border-radius: 12px;

  background: rgba(255, 255, 255, 0.95);

  box-shadow:
    0 15px 35px rgba(15, 23, 42, 0.09);

  backdrop-filter: blur(10px);
}

.floating-card strong {
  display: block;

  color: #0f172a;

  font-size: 10px;

  font-weight: 900;
}

.floating-card small {
  display: block;

  margin-top: 2px;

  color: #94a3b8;

  font-size: 8px;
}

.code-card {
  left: 0;

  bottom: 75px;
}

.tech-card {
  right: -5px;

  top: 95px;
}

.code-icon,
.tech-symbol {
  width: 34px;
  height: 34px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: #eff6ff;

  color: #2563eb;

  font-family: monospace;

  font-size: 12px;

  font-weight: 900;
}

.tech-symbol {
  background: #0f172a;

  color: #ffffff;
}


/* =========================================================
   INTRO STRIP
========================================================= */

.intro-strip {
  padding: 24px 20px;

  border-top: 1px solid #e2e8f0;

  border-bottom: 1px solid #e2e8f0;

  background: #ffffff;
}

.intro-content {
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 20px;

  text-align: center;
}

.intro-label {
  color: #2563eb;

  font-size: 9px;

  font-weight: 900;

  letter-spacing: 2px;
}

.intro-content p {
  margin: 0;

  color: #64748b;

  font-size: 12px;

  font-weight: 600;
}


/* =========================================================
   SERVICES
========================================================= */

.services-section {
  padding: 100px 20px;

  background: #ffffff;
}

.section-header {
  max-width: 680px;

  margin: 0 auto 55px;

  text-align: center;
}

.section-header.left {
  margin-left: 0;

  text-align: left;
}

.section-header > span {
  color: #2563eb;

  font-size: 9px;

  font-weight: 900;

  letter-spacing: 2.5px;
}

.section-header h2 {
  margin: 13px 0 15px;

  color: #0f172a;

  font-size: 39px;

  line-height: 1.2;

  font-weight: 900;

  letter-spacing: -1px;
}

.section-header h2 strong {
  color: #2563eb;

  font-weight: 900;
}

.section-header p {
  max-width: 610px;

  margin: 0;

  color: #64748b;

  font-size: 13px;

  line-height: 1.8;
}

.section-header:not(.left) p {
  margin-left: auto;
  margin-right: auto;
}

.services-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 15px;
}

.service-card {
  position: relative;

  min-height: 250px;

  padding: 28px;

  overflow: hidden;

  border: 1px solid #e2e8f0;

  border-radius: 18px;

  background: #ffffff;

  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);

  border-color: #bfdbfe;

  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.07);
}

.service-number {
  position: absolute;

  top: 22px;
  right: 25px;

  color: #cbd5e1;

  font-size: 10px;

  font-weight: 900;
}

.service-icon {
  width: 42px;
  height: 42px;

  display: flex;

  align-items: center;
  justify-content: center;

  margin-bottom: 40px;

  border-radius: 10px;

  background: #eff6ff;

  color: #2563eb;

  font-size: 22px;

  font-weight: 400;
}

.service-card h3 {
  margin: 0 0 10px;

  color: #0f172a;

  font-size: 17px;

  font-weight: 900;
}

.service-card p {
  margin: 0;

  color: #64748b;

  font-size: 12px;

  line-height: 1.8;
}

.service-arrow {
  position: absolute;

  right: 27px;
  bottom: 24px;

  color: #2563eb;

  font-size: 18px;

  transition:
    transform 0.25s ease;
}

.service-card:hover .service-arrow {
  transform: translateX(5px);
}


/* =========================================================
   SKILLS
========================================================= */

.skills-section {
  padding: 100px 20px;

  background: #f8fafc;

  border-top: 1px solid #e2e8f0;

  border-bottom: 1px solid #e2e8f0;
}

.skills-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 12px;
}

.skill-card {
  display: flex;

  align-items: center;

  gap: 13px;

  padding: 16px;

  border: 1px solid #e2e8f0;

  border-radius: 13px;

  background: #ffffff;

  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.skill-card:hover {
  transform: translateY(-3px);

  border-color: #bfdbfe;

  box-shadow:
    0 12px 28px rgba(15, 23, 42, 0.06);
}

.skill-icon {
  width: 42px;
  height: 42px;

  display: flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 10px;

  background: #eff6ff;

  color: #2563eb;

  font-size: 13px;

  font-weight: 900;
}

.skill-info {
  flex: 1;
}

.skill-info h3 {
  margin: 0;

  color: #334155;

  font-size: 12px;

  font-weight: 900;
}

.skill-info span {
  display: block;

  margin-top: 3px;

  color: #94a3b8;

  font-size: 9px;
}

.skill-arrow {
  color: #cbd5e1;

  font-size: 14px;

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.skill-card:hover .skill-arrow {
  color: #2563eb;

  transform: translateX(3px);
}


/* =========================================================
   PROJECTS
========================================================= */

.projects-section {
  padding: 100px 20px;

  background: #ffffff;
}

.projects-heading {
  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 30px;

  margin-bottom: 45px;
}

.projects-heading .section-header {
  margin-bottom: 0;
}

.all-projects-link {
  display: inline-flex;

  align-items: center;

  gap: 8px;

  margin-bottom: 7px;

  color: #2563eb;

  text-decoration: none;

  font-size: 11px;

  font-weight: 900;
}

.all-projects-link span {
  font-size: 16px;

  transition:
    transform 0.2s ease;
}

.all-projects-link:hover span {
  transform: translateX(4px);
}

.projects-grid {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 22px;
}

.project-card {
  overflow: hidden;

  border: 1px solid #e2e8f0;

  border-radius: 20px;

  background: #ffffff;

  box-shadow:
    0 8px 30px rgba(15, 23, 42, 0.04);

  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-6px);

  border-color: #bfdbfe;

  box-shadow:
    0 20px 45px rgba(37, 99, 235, 0.08);
}


/* PROJECT VISUAL */

.project-visual {
  position: relative;

  height: 270px;

  overflow: hidden;

  background:
    linear-gradient(
      135deg,
      #eff6ff,
      #dbeafe
    );
}

.project-visual img {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  opacity: 0.75;

  transition:
    transform 0.5s ease;
}

.project-card:hover .project-visual img {
  transform: scale(1.04);
}

.project-overlay {
  position: absolute;

  inset: 0;

  background:
    linear-gradient(
      180deg,
      transparent 45%,
      rgba(15, 23, 42, 0.22)
    );
}

.project-number {
  position: absolute;

  z-index: 3;

  top: 18px;
  left: 20px;

  color: #ffffff;

  font-size: 11px;

  font-weight: 900;

  text-shadow:
    0 2px 5px rgba(15, 23, 42, 0.2);
}

.project-pattern {
  position: absolute;

  z-index: 2;

  right: -30px;
  bottom: -50px;

  width: 170px;
  height: 170px;

  border: 1px solid rgba(255, 255, 255, 0.6);

  border-radius: 50%;
}

.project-pattern span {
  position: absolute;

  border: 1px solid rgba(255, 255, 255, 0.5);

  border-radius: 50%;
}

.project-pattern span:nth-child(1) {
  inset: 20px;
}

.project-pattern span:nth-child(2) {
  inset: 45px;
}

.project-pattern span:nth-child(3) {
  inset: 70px;
}


/* PROJECT CONTENT */

.project-content {
  padding: 25px;
}

.project-label {
  color: #2563eb;

  font-size: 8px;

  font-weight: 900;

  letter-spacing: 1.8px;
}

.project-content h3 {
  margin: 9px 0 9px;

  color: #0f172a;

  font-size: 22px;

  font-weight: 900;
}

.project-content > p {
  margin: 0;

  color: #64748b;

  font-size: 12px;

  line-height: 1.8;
}

.project-footer {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 15px;

  margin-top: 21px;

  padding-top: 18px;

  border-top: 1px solid #f1f5f9;
}

.project-tags {
  display: flex;

  flex-wrap: wrap;

  gap: 6px;
}

.project-tags span {
  padding: 5px 8px;

  border: 1px solid #dbeafe;

  border-radius: 6px;

  background: #eff6ff;

  color: #2563eb;

  font-size: 8px;

  font-weight: 800;
}

.project-link {
  width: 36px;
  height: 36px;

  display: flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 9px;

  background: #0f172a;

  color: #ffffff;

  text-decoration: none;

  font-size: 16px;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.project-link:hover {
  transform: translateX(3px);

  background: #2563eb;
}


/* =========================================================
   CAREER CTA
========================================================= */

.career-section {
  padding: 0 20px 100px;

  background: #ffffff;
}

.career-card {
  position: relative;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 40px;

  min-height: 300px;

  padding: 50px;

  overflow: hidden;

  border-radius: 24px;

  background: #0f172a;

  box-shadow:
    0 25px 60px rgba(15, 23, 42, 0.15);
}

.career-card::before {
  content: '';

  position: absolute;

  width: 280px;
  height: 280px;

  right: 120px;
  top: -130px;

  border: 1px solid rgba(96, 165, 250, 0.16);

  border-radius: 50%;
}

.career-card::after {
  content: '';

  position: absolute;

  width: 200px;
  height: 200px;

  right: 160px;
  top: -90px;

  border: 1px solid rgba(96, 165, 250, 0.12);

  border-radius: 50%;
}

.career-content {
  position: relative;

  z-index: 2;

  max-width: 700px;
}

.career-content > span {
  color: #60a5fa;

  font-size: 9px;

  font-weight: 900;

  letter-spacing: 2.5px;
}

.career-content h2 {
  margin: 13px 0;

  color: #ffffff;

  font-size: 34px;

  font-weight: 900;
}

.career-content h2 strong {
  color: #60a5fa;
}

.career-content p {
  max-width: 620px;

  margin: 0;

  color: #94a3b8;

  font-size: 13px;

  line-height: 1.8;
}

.career-buttons {
  display: flex;

  flex-wrap: wrap;

  gap: 10px;

  margin-top: 25px;
}

.dark-button,
.outline-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 9px;

  min-height: 43px;

  padding: 0 16px;

  border-radius: 9px;

  text-decoration: none;

  font-size: 11px;

  font-weight: 800;

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.dark-button {
  background: #ffffff;

  color: #0f172a;
}

.dark-button:hover {
  transform: translateY(-2px);

  background: #eff6ff;

  color: #2563eb;
}

.outline-button {
  border: 1px solid rgba(255, 255, 255, 0.18);

  color: #e2e8f0;
}

.outline-button:hover {
  transform: translateY(-2px);

  border-color: #60a5fa;

  color: #ffffff;
}

.career-mark {
  position: absolute;

  right: 55px;

  color: rgba(96, 165, 250, 0.1);

  font-size: 150px;

  line-height: 1;

  font-weight: 900;

  letter-spacing: -15px;
}


/* =========================================================
   CONTACT
========================================================= */

.contact-section {
  padding: 0 20px 100px;

  background: #ffffff;
}

.contact-box {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 35px;

  padding: 48px;

  border: 1px solid #bfdbfe;

  border-radius: 22px;

  background:
    linear-gradient(
      135deg,
      #eff6ff,
      #ffffff
    );

  box-shadow:
    0 18px 45px rgba(37, 99, 235, 0.07);
}

.contact-content > span {
  color: #2563eb;

  font-size: 9px;

  font-weight: 900;

  letter-spacing: 2px;
}

.contact-content h2 {
  margin: 12px 0;

  color: #0f172a;

  font-size: 34px;

  font-weight: 900;
}

.contact-content h2 strong {
  color: #2563eb;
}

.contact-content p {
  max-width: 600px;

  margin: 0;

  color: #64748b;

  font-size: 13px;

  line-height: 1.8;
}

.contact-button {
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 12px;

  min-width: 190px;

  min-height: 48px;

  padding: 0 18px;

  border-radius: 10px;

  background: #2563eb;

  color: #ffffff;

  text-decoration: none;

  font-size: 11px;

  font-weight: 900;

  box-shadow:
    0 10px 25px rgba(37, 99, 235, 0.2);

  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}

.contact-button:hover {
  transform: translateY(-3px);

  background: #1d4ed8;

  box-shadow:
    0 15px 30px rgba(37, 99, 235, 0.27);
}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 1050px) {

  .hero-container {
    grid-template-columns: 1fr;

    text-align: center;
  }

  .hero-content {
    max-width: 800px;

    margin: 0 auto;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-role-wrapper {
    justify-content: center;
  }

  .hero-buttons {
    justify-content: center;
  }

  .stats-container {
    margin-left: auto;
    margin-right: auto;

    text-align: left;
  }

  .profile-section {
    min-height: 430px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 700px) {

  .container {
    padding: 0 20px;
  }

  .hero-section {
    padding: 75px 18px 70px;
  }

  .availability {
    font-size: 8px;
  }

  .hero-title {
    font-size: 53px;

    letter-spacing: -2.5px;
  }

  .hero-role {
    font-size: 22px;
  }

  .hero-description {
    font-size: 14px;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }

  .stats-container {
    gap: 5px;

    margin-top: 40px;
  }

  .stat {
    padding-right: 15px;
  }

  .stat:not(:last-child)::after {
    right: 7px;
  }

  .stat strong {
    font-size: 22px;
  }

  .stat span {
    font-size: 8px;
  }

  .profile-section {
    min-height: 390px;
  }

  .profile-circle {
    width: 270px;
    height: 270px;
  }

  .profile-ring.ring-one {
    width: 330px;
    height: 330px;
  }

  .profile-ring.ring-two {
    width: 380px;
    height: 380px;
  }

  .code-card {
    left: 0;

    bottom: 45px;
  }

  .tech-card {
    right: 0;

    top: 55px;
  }

  .intro-content {
    flex-direction: column;

    gap: 7px;
  }

  .services-section,
  .skills-section,
  .projects-section {
    padding: 75px 18px;
  }

  .section-header h2 {
    font-size: 31px;
  }

  .services-grid {
    gap: 12px;
  }

  .service-card {
    min-height: 220px;
  }

  .skills-grid {
    grid-template-columns: 1fr 1fr;

    gap: 10px;
  }

  .skill-card {
    padding: 13px;
  }

  .skill-info h3 {
    font-size: 10px;
  }

  .skill-arrow {
    display: none;
  }

  .projects-heading {
    align-items: flex-start;

    flex-direction: column;

    gap: 15px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-visual {
    height: 230px;
  }

  .career-section,
  .contact-section {
    padding-left: 18px;
    padding-right: 18px;
  }

  .career-card {
    padding: 35px 24px;

    border-radius: 18px;
  }

  .career-content h2 {
    font-size: 28px;
  }

  .career-mark {
    right: 15px;

    font-size: 90px;
  }

  .contact-box {
    padding: 35px 24px;

    flex-direction: column;

    align-items: flex-start;
  }

  .contact-content h2 {
    font-size: 28px;
  }

  .contact-button {
    width: 100%;
  }

}


/* =========================================================
   EXTRA SMALL
========================================================= */

@media (max-width: 400px) {

  .hero-title {
    font-size: 45px;
  }

  .hero-role {
    font-size: 20px;
  }

  .profile-circle {
    width: 240px;
    height: 240px;
  }

  .profile-ring.ring-one {
    width: 295px;
    height: 295px;
  }

  .profile-ring.ring-two {
    width: 340px;
    height: 340px;
  }

  .floating-card {
    padding: 8px 10px;
  }

  .floating-card small {
    display: none;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .stat strong {
    font-size: 19px;
  }

}


/* =========================================================
   ACCESSIBILITY
========================================================= */

a:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.3);

  outline-offset: 4px;
}

</style>