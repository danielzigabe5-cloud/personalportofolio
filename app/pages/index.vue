<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import defaultImg from '~/assets/images/daniel.jpg'

// 1. Page Metadata
definePageMeta({
  layout: 'default'
})

/* =========================================================
   TYPES / INTERFACES
========================================================= */
interface Project {
  slug: string
  number: string
  category: string
  title: string
  description: string
  tags: string[]
  url?: string
}

interface Service {
  number: string
  title: string
  description: string
}

/* =========================================================
   REACTIVE STATE (CONNECTS TO ADMIN DATA)
========================================================= */
const profile = ref({
  name: 'Daniel Zigabe',
  role: 'Frontend Developer',
  bio: 'I design and build modern, responsive web and mobile applications that turn ideas into practical digital solutions.',
  email: 'danielzigabe5@gmail.com',
  avatarUrl: null as string | null
})

const stats = ref({
  projectsCount: 3,
  experienceYears: 1,
  skillsCount: 6
})

const topSkills = ref([
  { name: 'Nuxt.js', short: 'N' },
  { name: 'Laravel', short: 'L' },
  { name: 'Flutter', short: 'F' },
  { name: 'Vue.js', short: 'V' },
  { name: 'Tailwind CSS', short: 'T' },
  { name: 'MySQL', short: 'M' }
])

const featuredProjects = ref<Project[]>([
  {
    slug: 'combolojosport',
    number: '01',
    category: 'WEB & MOBILE PLATFORM',
    title: 'CombolojoSPORT',
    description: 'A sports venue platform designed to help users discover sports facilities, explore events and connect with venue services across Ethiopia.',
    tags: ['Nuxt.js', 'Laravel', 'Flutter'],
    url: 'https://combolojosport.example.com'
  },
  {
    slug: 'internship-attendance-system',
    number: '02',
    category: 'MANAGEMENT SYSTEM',
    title: 'Internship Attendance System',
    description: 'A multi-role internship management platform connecting students, company supervisors, advisors and administrators.',
    tags: ['Nuxt.js', 'Laravel', 'MySQL'],
    url: ''
  }
])

const services: Service[] = [
  {
    number: '01',
    title: 'Frontend Development',
    description: 'Building responsive, accessible, and fast interfaces with modern tools like Nuxt.js, Vue 3, and Tailwind CSS.'
  },
  {
    number: '02',
    title: 'Full-Stack Web Applications',
    description: 'Developing end-to-end web applications with connected REST APIs, robust databases, and secure architecture.'
  },
  {
    number: '03',
    title: 'Mobile Applications',
    description: 'Creating cross-platform mobile experiences using Flutter, integrated with Laravel backends.'
  }
]

// Computed Initials (e.g., DZ)
const initials = computed(() => {
  if (!profile.value.name.trim()) return 'DZ'
  const parts = profile.value.name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return parts[0].slice(0, 2).toUpperCase()
})

// 2. SEO Optimization
useSeoMeta({
  title: () => `${profile.value.name} | ${profile.value.role}`,
  description: () => profile.value.bio,
  ogTitle: () => `${profile.value.name} - Portfolio`,
  ogDescription: () => profile.value.bio
})

/* =========================================================
   LOAD FROM ADMIN STORAGE
========================================================= */
onMounted(() => {
  // A. Load Profile
  const savedProfile = localStorage.getItem('portfolio_profile')
  if (savedProfile) {
    try {
      const parsed = JSON.parse(savedProfile)
      if (parsed.name) profile.value.name = parsed.name
      if (parsed.role) profile.value.role = parsed.role
      if (parsed.bio) profile.value.bio = parsed.bio
      if (parsed.email) profile.value.email = parsed.email
      if (parsed.avatarUrl) profile.value.avatarUrl = parsed.avatarUrl
    } catch (e) {
      console.error(e)
    }
  }

  // B. Load Projects & Stats
  const savedProjects = localStorage.getItem('portfolio_projects')
  if (savedProjects) {
    try {
      const parsedProjects = JSON.parse(savedProjects)
      if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
        stats.value.projectsCount = parsedProjects.length
        // Take top 2 for homepage featured showcase
        featuredProjects.value = parsedProjects.slice(0, 2).map((item: any, i: number) => ({
          slug: item.id || `project-${i + 1}`,
          number: String(i + 1).padStart(2, '0'),
          category: (item.category || 'Web Application').toUpperCase(),
          title: item.title,
          description: item.description || `A modern digital solution engineered using ${item.tech || 'Nuxt & Laravel'}.`,
          tags: item.tech ? item.tech.split(/[+,/|]/).map((t: string) => t.trim()).slice(0, 3) : ['Nuxt.js', 'Vue.js'],
          url: item.url || ''
        }))
      }
    } catch (e) {
      console.error(e)
    }
  }

  // C. Load Skills & Stats
  const savedSkills = localStorage.getItem('portfolio_skills')
  if (savedSkills) {
    try {
      const parsedSkills = JSON.parse(savedSkills)
      if (Array.isArray(parsedSkills) && parsedSkills.length > 0) {
        stats.value.skillsCount = parsedSkills.length
        // Take top 6 skills for the homepage
        topSkills.value = parsedSkills.slice(0, 6).map((s: any) => ({
          name: s.name,
          short: s.name.charAt(0).toUpperCase()
        }))
      }
    } catch (e) {
      console.error(e)
    }
  }

  // D. Load Experience Years
  const savedExp = localStorage.getItem('portfolio_experiences')
  if (savedExp) {
    try {
      const parsedExp = JSON.parse(savedExp)
      if (Array.isArray(parsedExp) && parsedExp.length > 0) {
        stats.value.experienceYears = Math.max(1, parsedExp.length)
      }
    } catch (e) {
      console.error(e)
    }
  }
})
</script>

<template>
  <main class="portfolio-page">

    <!-- BACKGROUND DECORATION -->
    <div class="background-grid" aria-hidden="true"></div>
    <div class="blue-glow glow-one" aria-hidden="true"></div>
    <div class="blue-glow glow-two" aria-hidden="true"></div>

    <!-- =====================================================
         HERO
    ====================================================== -->
    <section class="hero-section" aria-label="Introduction">
      <div class="hero-container">

        <!-- LEFT CONTENT -->
        <div class="hero-content">
          <div class="availability" role="status">
            <span class="availability-dot" aria-hidden="true"></span>
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          <span class="hello-text">HELLO, I'M</span>

          <h1 class="hero-title">
            {{ profile.name.split(' ')[0] }}
            <span>{{ profile.name.split(' ').slice(1).join(' ') || '.' }}</span>
          </h1>

          <div class="hero-role-wrapper">
            <span class="role-line" aria-hidden="true"></span>
            <h2 class="hero-role">{{ profile.role }}</h2>
          </div>

          <p class="hero-description">
            {{ profile.bio }}
          </p>

          <!-- BUTTONS -->
          <div class="hero-buttons">
            <NuxtLink to="/projects" class="primary-button">
              <span>Explore My Work</span>
              <span class="button-arrow" aria-hidden="true">→</span>
            </NuxtLink>

            <NuxtLink to="/contact" class="secondary-button">
              <span>Let's Talk</span>
            </NuxtLink>
          </div>

          <!-- STATS (CONNECTED TO REAL COUNTERS) -->
          <div class="stats-container">
            <div class="stat">
              <strong>{{ stats.projectsCount }}+</strong>
              <span>Projects Built</span>
            </div>
            <div class="stat">
              <strong>{{ stats.experienceYears }}+</strong>
              <span>Years Experience</span>
            </div>
            <div class="stat">
              <strong>{{ stats.skillsCount }}+</strong>
              <span>Technologies</span>
            </div>
          </div>
        </div>

        <!-- RIGHT PROFILE PHOTO -->
        <div class="profile-section" aria-hidden="true">
          <div class="profile-background"></div>
          <div class="profile-ring ring-one"></div>
          <div class="profile-ring ring-two"></div>

          <div class="profile-circle">
            <img
              :src="profile.avatarUrl || defaultImg"
              :alt="profile.name"
              loading="eager"
              width="330"
              height="330"
            />
          </div>

          <!-- CODE CARD -->
          <div class="floating-card code-card">
            <span class="code-icon">&lt;/&gt;</span>
            <div>
              <strong>{{ initials }}</strong>
              <small>Building with code</small>
            </div>
          </div>

          <!-- TECH CARD -->
          <div class="floating-card tech-card">
            <span class="tech-symbol">⚡</span>
            <div>
              <strong>{{ topSkills[0]?.name || 'Nuxt.js' }}</strong>
              <small>Specialized</small>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- =====================================================
         INTRO STRIP
    ====================================================== -->
    <section class="intro-strip" aria-label="Brief Intro">
      <div class="container">
        <div class="intro-content">
          <span class="intro-label">WHAT I DO</span>
          <p>
            I combine clean design, full-stack architecture, and problem solving to create useful digital products.
          </p>
        </div>
      </div>
    </section>

    <!-- =====================================================
         SERVICES
    ====================================================== -->
    <section class="services-section" aria-labelledby="services-title">
      <div class="container">
        <div class="section-header left">
          <span>WHAT I BUILD</span>
          <h2 id="services-title">
            Turning ideas into
            <strong>digital products.</strong>
          </h2>
          <p>
            My focus is on engineering scalable, responsive, and user-friendly software using modern technology stacks.
          </p>
        </div>

        <div class="services-grid" role="list">
          <article
            v-for="service in services"
            :key="service.number"
            class="service-card"
            role="listitem"
          >
            <span class="service-number" aria-hidden="true">{{ service.number }}</span>
            <div class="service-icon" aria-hidden="true">+</div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <span class="service-arrow" aria-hidden="true">→</span>
          </article>
        </div>
      </div>
    </section>

    <!-- =====================================================
         SKILLS (REAL TOP TECHNOLOGIES)
    ====================================================== -->
    <section class="skills-section" aria-labelledby="skills-title">
      <div class="container">
        <div class="section-header">
          <span>TECHNOLOGIES</span>
          <h2 id="skills-title">
            Tools I use to
            <strong>build.</strong>
          </h2>
          <p>
            A curated selection of modern technologies and frameworks I use for frontend, backend, and mobile development.
          </p>
        </div>

        <div class="skills-grid" role="list">
          <div
            v-for="skill in topSkills"
            :key="skill.name"
            class="skill-card"
            role="listitem"
          >
            <div class="skill-icon" aria-hidden="true">{{ skill.short }}</div>
            <div class="skill-info">
              <h3>{{ skill.name }}</h3>
              <span>Technology</span>
            </div>
            <span class="skill-arrow" aria-hidden="true">→</span>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         FEATURED PROJECTS (CONNECTED TO REAL PROJECTS)
    ====================================================== -->
    <section class="projects-section" aria-labelledby="projects-title">
      <div class="container">
        <div class="projects-heading">
          <div class="section-header left">
            <span>SELECTED WORK</span>
            <h2 id="projects-title">
              Projects I'm
              <strong>proud of.</strong>
            </h2>
          </div>

          <NuxtLink to="/projects" class="all-projects-link">
            View all projects
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>

        <div class="projects-grid">
          <article
            v-for="project in featuredProjects"
            :key="project.slug"
            class="project-card"
          >
            <!-- REFINED PROJECT VISUAL (Clean App Mockup, no broken image) -->
            <div class="project-visual">
              <div class="project-number" aria-hidden="true">{{ project.number }}</div>
              
              <!-- Clean Browser Mockup -->
              <div class="mockup-frame">
                <div class="mockup-header">
                  <div class="mockup-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div class="mockup-url">{{ project.title.toLowerCase().replace(/\s+/g, '-') }}.app</div>
                </div>
                <div class="mockup-content">
                  <div class="mockup-badge">{{ project.category }}</div>
                  <h4>{{ project.title }}</h4>
                  <div class="mockup-bars">
                    <span class="bar-long"></span>
                    <span class="bar-med"></span>
                  </div>
                </div>
              </div>

              <div class="project-overlay" aria-hidden="true"></div>
            </div>

            <!-- PROJECT CONTENT -->
            <div class="project-content">
              <span class="project-label">{{ project.category }}</span>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>

              <div class="project-footer">
                <div class="project-tags">
                  <span v-for="tag in project.tags" :key="tag">
                    {{ tag }}
                  </span>
                </div>

                <a
                  v-if="project.url"
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link"
                  title="Visit Project Link"
                >
                  <span aria-hidden="true">↗</span>
                </a>
                <NuxtLink
                  v-else
                  to="/projects"
                  class="project-link"
                  title="View Projects"
                >
                  <span aria-hidden="true">→</span>
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- =====================================================
         CAREER CTA
    ====================================================== -->
    <section class="career-section" aria-label="Career Information">
      <div class="container">
        <div class="career-card">
          <div class="career-content">
            <span>A LITTLE MORE ABOUT ME</span>
            <h2>
              Curious about my
              <strong>journey?</strong>
            </h2>
            <p>
              Learn more about my computer science education, professional internship experience, technical stack, and design philosophy.
            </p>

            <div class="career-buttons">
              <NuxtLink to="/about" class="dark-button">
                About Me
                <span aria-hidden="true">→</span>
              </NuxtLink>

              <NuxtLink to="/experience" class="outline-button">
                Experience
                <span aria-hidden="true">💼</span>
              </NuxtLink>
            </div>
          </div>
          <div class="career-mark" aria-hidden="true">{{ initials }}</div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         CONTACT CTA
    ====================================================== -->
    <section class="contact-section" aria-label="Contact Information">
      <div class="container">
        <div class="contact-box">
          <div class="contact-content">
            <span>GET IN TOUCH</span>
            <h2>
              Have a project
              <strong>in mind?</strong>
            </h2>
            <p>
              I am open to software development opportunities, freelance work, and innovative collaborations.
            </p>
          </div>

          <NuxtLink to="/contact" class="contact-button">
            <span>Start a Conversation</span>
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

  </main>
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
    linear-gradient(to right, rgba(15, 23, 42, 0.025) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(15, 23, 42, 0.025) 1px, transparent 1px);
  background-size: 55px 55px;
  mask-image: linear-gradient(to bottom, black, transparent);
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
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
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
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.12);
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

/* BUTTONS */
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
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.primary-button {
  background: #2563eb;
  color: #ffffff;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.2);
}

.primary-button:hover {
  transform: translateY(-3px);
  background: #1d4ed8;
  box-shadow: 0 15px 30px rgba(37, 99, 235, 0.27);
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
  transition: transform 0.25s ease;
}

.primary-button:hover .button-arrow {
  transform: translateX(4px);
}

/* STATS */
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

/* PROFILE SECTION */
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
  background: radial-gradient(circle, rgba(37, 99, 235, 0.12), rgba(37, 99, 235, 0.025) 60%, transparent 70%);
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
  box-shadow: 0 25px 65px rgba(37, 99, 235, 0.17);
  overflow: hidden;
}

.profile-circle img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
  object-fit: cover;
}

/* FLOATING CARDS */
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
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.09);
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

/* INTRO STRIP */
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

/* SERVICES */
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
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  border-color: #bfdbfe;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.07);
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
  transition: transform 0.25s ease;
}

.service-card:hover .service-arrow {
  transform: translateX(5px);
}

/* SKILLS */
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
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.skill-card:hover {
  transform: translateY(-3px);
  border-color: #bfdbfe;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
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
  transition: color 0.2s ease, transform 0.2s ease;
}

.skill-card:hover .skill-arrow {
  color: #2563eb;
  transform: translateX(3px);
}

/* PROJECTS */
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
  transition: transform 0.2s ease;
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
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.04);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: #bfdbfe;
  box-shadow: 0 20px 45px rgba(37, 99, 235, 0.08);
}

/* REFINED MOCKUP VISUAL */
.project-visual {
  position: relative;
  height: 240px;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.mockup-frame {
  width: 100%;
  max-width: 380px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.mockup-header {
  height: 28px;
  background: rgba(2, 6, 23, 0.7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.mockup-dots {
  display: flex;
  gap: 5px;
}

.mockup-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #475569;
}

.mockup-dots span:nth-child(1) { background: #ef4444; }
.mockup-dots span:nth-child(2) { background: #f59e0b; }
.mockup-dots span:nth-child(3) { background: #10b981; }

.mockup-url {
  color: #94a3b8;
  font-size: 8px;
  font-family: monospace;
}

.mockup-content {
  padding: 24px 20px;
  text-align: left;
}

.mockup-badge {
  display: inline-block;
  padding: 2px 7px;
  border-radius: 5px;
  background: rgba(37, 99, 235, 0.25);
  color: #60a5fa;
  font-size: 7px;
  font-weight: 800;
  margin-bottom: 8px;
}

.mockup-content h4 {
  margin: 0;
  color: #ffffff;
  font-size: 16px;
  font-weight: 900;
}

.mockup-bars {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mockup-bars span {
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.12);
}

.bar-long { width: 75%; }
.bar-med { width: 45%; }

.project-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, transparent 45%, rgba(15, 23, 42, 0.22));
}

.project-number {
  position: absolute;
  z-index: 3;
  top: 14px;
  left: 18px;
  color: #94a3b8;
  font-size: 10px;
  font-weight: 900;
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
  transition: background 0.2s ease, transform 0.2s ease;
}

.project-link:hover {
  transform: translateX(3px);
  background: #2563eb;
}

/* CAREER CTA */
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
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.15);
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
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
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
  color: rgba(96, 165, 250, 0.08);
  font-size: 150px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: -15px;
  pointer-events: none;
}

/* CONTACT */
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
  background: linear-gradient(135deg, #eff6ff, #ffffff);
  box-shadow: 0 18px 45px rgba(37, 99, 235, 0.07);
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
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.2);
  transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}

.contact-button:hover {
  transform: translateY(-3px);
  background: #1d4ed8;
  box-shadow: 0 15px 30px rgba(37, 99, 235, 0.27);
}

/* RESPONSIVE */
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
    height: 200px;
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

a:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.3);
  outline-offset: 4px;
}
</style>