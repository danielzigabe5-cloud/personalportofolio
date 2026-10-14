<script setup lang="ts">
// 1. Page Metadata
definePageMeta({
  layout: 'default'
})

// 2. SEO Optimization
useSeoMeta({
  title: 'Projects | Daniel Zigabe',
  description: 'Explore my selected work including web applications, mobile platforms, and management systems.',
  ogTitle: 'Projects - Daniel Zigabe',
  ogDescription: 'A selection of web, mobile and management systems developed using modern technologies.',
})

/* =========================================================
   TYPES / INTERFACES
========================================================= */
interface Project {
  number: string
  title: string
  category: string
  description: string
  tags: string[]
  status: string
  type: 'sports' | 'management' | 'portfolio'
  demo: string
  github: string
}

/* =========================================================
   DATA
========================================================= */
const projects: Project[] = [
  {
    number: '01',
    title: 'CombolojoSPORT',
    category: 'Sports Venue Platform',
    description: 'A modern sports venue platform designed to help users discover sports facilities and manage venue bookings across Ethiopia.',
    tags: ['Nuxt.js', 'Laravel', 'Flutter', 'MySQL'],
    status: 'Featured Project',
    type: 'sports',
    demo: '/projects/combolojosport',
    github: '#'
  },
  {
    number: '02',
    title: 'Internship Attendance & Advisor System',
    category: 'Management System',
    description: 'A digital management platform connecting students, company supervisors, advisors and administrators in one system.',
    tags: ['Nuxt.js', 'Laravel', 'MySQL'],
    status: 'Academic Project',
    type: 'management',
    demo: '/projects/internship-attendance-system',
    github: '#'
  },
  {
    number: '03',
    title: 'Personal Portfolio',
    category: 'Portfolio Website',
    description: 'A responsive developer portfolio built to showcase professional experience, technical skills, education and selected projects.',
    tags: ['Nuxt.js', 'Vue.js', 'TypeScript', 'CSS'],
    status: 'Personal Project',
    type: 'portfolio',
    demo: '#',
    github: '#'
  }
]
</script>

<template>
  <!-- Changed to <main> for better semantic HTML -->
  <main class="projects-page">

    <!-- =====================================================
         PAGE HERO
    ====================================================== -->
    <section class="page-header" aria-labelledby="page-title">
      <div class="page-container">
        <div class="header-content">
          <span class="eyebrow">SELECTED WORK</span>
          <h1 id="page-title">
            Projects I've <strong>Built</strong>
          </h1>
          <p>
            A selection of web, mobile and management systems
            developed using modern technologies.
          </p>
        </div>

        <div class="header-meta">
          <div class="meta-line" aria-hidden="true"></div>
          <span>{{ projects.length < 10 ? '0' + projects.length : projects.length }} PROJECTS</span>
        </div>
      </div>
    </section>

    <!-- =====================================================
         PROJECTS
    ====================================================== -->
    <section class="projects-section" aria-label="Project List">
      <div class="page-container">
        <div class="projects-grid">

          <article
            v-for="project in projects"
            :key="project.number"
            class="project-card"
          >
            <!-- PROJECT VISUAL (Hidden from screen readers to prevent noise, since real info is below) -->
            <div
              class="project-visual"
              :class="`visual-${project.type}`"
              aria-hidden="true"
            >
              <div class="visual-topbar">
                <span class="browser-dot"></span>
                <span class="browser-dot"></span>
                <span class="browser-dot"></span>
                <span class="visual-number">{{ project.number }}</span>
              </div>

              <!-- SPORTS VISUAL -->
              <div v-if="project.type === 'sports'" class="sports-preview">
                <div class="preview-sidebar">
                  <span class="sidebar-logo">C</span>
                  <span class="sidebar-line active"></span>
                  <span class="sidebar-line"></span>
                  <span class="sidebar-line"></span>
                  <span class="sidebar-line"></span>
                </div>
                <div class="preview-main">
                  <div class="preview-heading">
                    <div>
                      <small>WELCOME BACK</small>
                      <strong>Find Your Venue</strong>
                    </div>
                    <span class="mini-avatar">D</span>
                  </div>
                  <div class="search-preview">
                    <span>⌕</span>
                    <span>Search sports venues...</span>
                  </div>
                  <div class="venue-preview-grid">
                    <div class="mini-card">
                      <div class="mini-image football"></div>
                      <span>Football Arena</span>
                      <small>Addis Ababa</small>
                    </div>
                    <div class="mini-card">
                      <div class="mini-image basketball"></div>
                      <span>Basketball Court</span>
                      <small>Addis Ababa</small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- MANAGEMENT VISUAL -->
              <div v-else-if="project.type === 'management'" class="management-preview">
                <div class="dashboard-sidebar">
                  <span class="dashboard-logo">DZ</span>
                  <span class="dashboard-item active">Dashboard</span>
                  <span class="dashboard-item">Students</span>
                  <span class="dashboard-item">Attendance</span>
                  <span class="dashboard-item">Reports</span>
                </div>
                <div class="dashboard-main">
                  <div class="dashboard-title">
                    <div>
                      <small>ADMINISTRATION</small>
                      <strong>Dashboard Overview</strong>
                    </div>
                    <span class="dashboard-user">D</span>
                  </div>
                  <div class="stats-preview">
                    <div class="small-stat">
                      <small>Students</small>
                      <strong>128</strong>
                      <span>+12%</span>
                    </div>
                    <div class="small-stat">
                      <small>Attendance</small>
                      <strong>94%</strong>
                      <span>+4.2%</span>
                    </div>
                    <div class="small-stat">
                      <small>Reports</small>
                      <strong>24</strong>
                      <span>+6</span>
                    </div>
                  </div>
                  <div class="chart-preview">
                    <div class="chart-heading">
                      <span>Attendance Overview</span>
                      <small>Last 7 days</small>
                    </div>
                    <div class="bars">
                      <span style="height: 45%"></span>
                      <span style="height: 70%"></span>
                      <span style="height: 55%"></span>
                      <span style="height: 82%"></span>
                      <span style="height: 68%"></span>
                      <span style="height: 90%"></span>
                      <span style="height: 78%"></span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- PORTFOLIO VISUAL -->
              <div v-else class="portfolio-preview">
                <div class="portfolio-nav">
                  <strong>DZ</strong>
                  <div class="nav-lines">
                    <span></span><span></span><span></span><span></span>
                  </div>
                </div>
                <div class="portfolio-hero">
                  <div class="portfolio-copy">
                    <small>HELLO, I'M</small>
                    <strong>
                      Daniel<br />
                      <em>Zigabe</em>
                    </strong>
                    <span>Frontend Developer</span>
                    <div class="portfolio-buttons">
                      <i></i><i></i>
                    </div>
                  </div>
                  <div class="portfolio-avatar">
                    <span>DZ</span>
                  </div>
                </div>
              </div>

              <div class="visual-overlay"></div>
            </div>

            <!-- PROJECT CONTENT -->
            <div class="project-card-body">
              <div class="project-top">
                <div>
                  <span class="project-status">{{ project.status }}</span>
                  <span class="project-category">{{ project.category }}</span>
                </div>
                <span class="project-number">{{ project.number }}</span>
              </div>

              <h2>{{ project.title }}</h2>
              <p class="project-description">{{ project.description }}</p>

              <!-- TECHNOLOGIES -->
              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag">
                  {{ tag }}
                </span>
              </div>

              <!-- ACTIONS (Improved Semantic Logic) -->
              <div class="project-actions">
                <NuxtLink
                  v-if="project.demo !== '#'"
                  :to="project.demo"
                  class="primary-button"
                >
                  View Project
                  <span aria-hidden="true">↗</span>
                </NuxtLink>
                <span
                  v-else
                  class="primary-button disabled-button"
                  aria-disabled="true"
                  title="Demo not available yet"
                >
                  View Project
                  <span aria-hidden="true">↗</span>
                </span>

                <a
                  v-if="project.github !== '#'"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="github-button"
                >
                  <span class="github-icon" aria-hidden="true">⌘</span>
                  GitHub
                </a>
                <span
                  v-else
                  class="github-button disabled-button"
                  aria-disabled="true"
                  title="Private Repository"
                >
                  <span class="github-icon" aria-hidden="true">⌘</span>
                  GitHub
                </span>
              </div>
            </div>
          </article>
        </div>

        <!-- BOTTOM NOTE -->
        <div class="projects-footer">
          <div class="footer-line" aria-hidden="true"></div>
          <div class="footer-content">
            <span>MORE PROJECTS COMING SOON</span>
            <NuxtLink to="/contact">
              Have a project in mind?
              <strong>Let's talk →</strong>
            </NuxtLink>
          </div>
        </div>

      </div>
    </section>

  </main>
</template>

<style scoped>
/* =========================================================
   PAGE
========================================================= */

.projects-page {
  min-height: 100vh;
  background: #ffffff;
  color: #0f172a;
}

/* =========================================================
   CONTAINER
========================================================= */

.page-container {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}

/* =========================================================
   HEADER
========================================================= */

.page-header {
  position: relative;
  overflow: hidden;
  padding: 95px 0 80px;
  background:
    radial-gradient(
      circle at 15% 20%,
      rgba(37, 99, 235, 0.07),
      transparent 28%
    ),
    linear-gradient(
      135deg,
      #ffffff 0%,
      #f8fafc 100%
    );
  border-bottom: 1px solid #e2e8f0;
}

.page-header::after {
  content: '';
  position: absolute;
  width: 320px;
  height: 320px;
  right: -160px;
  top: -160px;
  border-radius: 50%;
  border: 1px solid rgba(37, 99, 235, 0.08);
}

.page-header .page-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
}

.header-content {
  max-width: 720px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 18px;
  color: #2563eb;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 3px;
}

.eyebrow::before {
  content: '';
  width: 28px;
  height: 2px;
  background: #2563eb;
}

.page-header h1 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(42px, 6vw, 68px);
  line-height: 1.05;
  font-weight: 850;
  letter-spacing: -2.5px;
}

.page-header h1 strong {
  color: #2563eb;
}

.page-header p {
  max-width: 600px;
  margin: 22px 0 0;
  color: #64748b;
  font-size: 17px;
  line-height: 1.7;
}

.header-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 7px;
  color: #64748b;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  white-space: nowrap;
}

.meta-line {
  width: 38px;
  height: 1px;
  background: #cbd5e1;
}

/* =========================================================
   PROJECT SECTION
========================================================= */

.projects-section {
  padding: 90px 0 100px;
  background: #f8fafc;
}

/* =========================================================
   GRID
========================================================= */

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 30px;
}

/* =========================================================
   PROJECT CARD
========================================================= */

.project-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.045);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}

.project-card:hover {
  transform: translateY(-7px);
  border-color: #bfdbfe;
  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.09), 0 8px 20px rgba(37, 99, 235, 0.06);
}

/* =========================================================
   PROJECT VISUAL
========================================================= */

.project-visual {
  position: relative;
  height: 310px;
  overflow: hidden;
  background: #0f172a;
}

.visual-topbar {
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  height: 36px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  background: rgba(15, 23, 42, 0.92);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.browser-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #64748b;
}

.visual-number {
  margin-left: auto;
  color: #94a3b8;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
}

/* =========================================================
   SPORTS PREVIEW
========================================================= */

.visual-sports {
  background: linear-gradient(135deg, #052e16, #064e3b);
}

.sports-preview {
  display: flex;
  height: 100%;
  padding-top: 36px;
}

.preview-sidebar {
  width: 62px;
  flex-shrink: 0;
  padding: 20px 13px;
  background: rgba(2, 44, 34, 0.8);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin: 0 auto 25px;
  border-radius: 9px;
  background: #22c55e;
  color: #052e16;
  font-size: 14px;
  font-weight: 900;
}

.sidebar-line {
  display: block;
  width: 32px;
  height: 6px;
  margin: 17px auto;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.12);
}

.sidebar-line.active {
  background: #22c55e;
}

.preview-main {
  flex: 1;
  padding: 28px 25px;
}

.preview-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-heading small {
  display: block;
  margin-bottom: 5px;
  color: #86efac;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.preview-heading strong {
  color: white;
  font-size: 17px;
  font-weight: 800;
}

.mini-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #22c55e;
  color: #052e16;
  font-size: 10px;
  font-weight: 900;
}

.search-preview {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  color: #94a3b8;
  font-size: 9px;
}

.search-preview span:first-child {
  color: #4ade80;
  font-size: 14px;
}

.venue-preview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 17px;
}

.mini-card {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.06);
}

.mini-image {
  height: 65px;
}

.mini-image.football {
  background: linear-gradient(135deg, #166534, #22c55e);
}

.mini-image.basketball {
  background: linear-gradient(135deg, #9a3412, #f97316);
}

.mini-card > span {
  display: block;
  margin: 8px 9px 3px;
  color: white;
  font-size: 8px;
  font-weight: 700;
}

.mini-card small {
  display: block;
  margin: 0 9px 9px;
  color: #94a3b8;
  font-size: 7px;
}

/* =========================================================
   MANAGEMENT PREVIEW
========================================================= */

.visual-management {
  background: linear-gradient(135deg, #0f172a, #172554);
}

.management-preview {
  display: flex;
  height: 100%;
  padding-top: 36px;
}

.dashboard-sidebar {
  width: 105px;
  flex-shrink: 0;
  padding: 18px 11px;
  background: rgba(2, 6, 23, 0.55);
}

.dashboard-logo {
  display: block;
  margin-bottom: 22px;
  color: #60a5fa;
  font-size: 15px;
  font-weight: 900;
}

.dashboard-item {
  display: block;
  margin: 11px 0;
  padding: 6px 7px;
  border-radius: 5px;
  color: #64748b;
  font-size: 7px;
  font-weight: 700;
}

.dashboard-item.active {
  background: rgba(37, 99, 235, 0.18);
  color: #60a5fa;
}

.dashboard-main {
  flex: 1;
  padding: 24px 22px;
}

.dashboard-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dashboard-title small {
  display: block;
  margin-bottom: 4px;
  color: #60a5fa;
  font-size: 6px;
  font-weight: 800;
  letter-spacing: 1px;
}

.dashboard-title strong {
  color: white;
  font-size: 15px;
}

.dashboard-user {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  font-size: 8px;
  font-weight: 900;
}

.stats-preview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 18px;
}

.small-stat {
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.045);
}

.small-stat small {
  display: block;
  color: #64748b;
  font-size: 6px;
}

.small-stat strong {
  display: block;
  margin: 4px 0;
  color: white;
  font-size: 14px;
}

.small-stat span {
  color: #60a5fa;
  font-size: 6px;
}

.chart-preview {
  margin-top: 13px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.045);
}

.chart-heading {
  display: flex;
  justify-content: space-between;
  margin-bottom: 13px;
}

.chart-heading span {
  color: #e2e8f0;
  font-size: 8px;
  font-weight: 700;
}

.chart-heading small {
  color: #64748b;
  font-size: 6px;
}

.bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 68px;
  gap: 7px;
}

.bars span {
  flex: 1;
  min-height: 10px;
  border-radius: 3px 3px 0 0;
  background: #2563eb;
  opacity: 0.85;
}

/* =========================================================
   PORTFOLIO PREVIEW
========================================================= */

.visual-portfolio {
  background: linear-gradient(135deg, #0f172a, #1e293b);
}

.portfolio-preview {
  height: 100%;
  padding: 36px 30px 20px;
}

.portfolio-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.portfolio-nav strong {
  color: white;
  font-size: 16px;
  letter-spacing: -1px;
}

.nav-lines {
  display: flex;
  gap: 8px;
}

.nav-lines span {
  width: 22px;
  height: 4px;
  border-radius: 4px;
  background: #334155;
}

.nav-lines span:first-child {
  background: #2563eb;
}

.portfolio-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(100% - 45px);
}

.portfolio-copy small {
  display: block;
  margin-bottom: 8px;
  color: #60a5fa;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.portfolio-copy strong {
  display: block;
  color: white;
  font-size: 27px;
  line-height: 0.95;
  letter-spacing: -1.5px;
}

.portfolio-copy em {
  color: #60a5fa;
  font-style: normal;
}

.portfolio-copy > span {
  display: block;
  margin-top: 9px;
  color: #94a3b8;
  font-size: 8px;
}

.portfolio-buttons {
  display: flex;
  gap: 6px;
  margin-top: 14px;
}

.portfolio-buttons i {
  display: block;
  width: 50px;
  height: 14px;
  border-radius: 4px;
  background: #2563eb;
}

.portfolio-buttons i:last-child {
  background: #334155;
}

.portfolio-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #60a5fa, #2563eb 45%, #172554 46%);
  border: 7px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 50px rgba(37, 99, 235, 0.25);
}

.portfolio-avatar span {
  margin-top: 60px;
  color: white;
  font-size: 12px;
  font-weight: 900;
}

/* =========================================================
   VISUAL OVERLAY
========================================================= */

.visual-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent 55%, rgba(2, 6, 23, 0.18));
}

/* =========================================================
   PROJECT BODY
========================================================= */

.project-card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 27px 28px 29px;
}

.project-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.project-status {
  display: block;
  margin-bottom: 5px;
  color: #2563eb;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.3px;
  text-transform: uppercase;
}

.project-category {
  color: #94a3b8;
  font-size: 11px;
  font-weight: 600;
}

.project-number {
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 800;
}

.project-card-body h2 {
  margin: 17px 0 10px;
  color: #0f172a;
  font-size: 24px;
  font-weight: 850;
  letter-spacing: -0.5px;
}

.project-description {
  min-height: 66px;
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.7;
}

/* =========================================================
   TAGS
========================================================= */

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 19px 0 0;
}

.project-tags span {
  padding: 6px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #f8fafc;
  color: #475569;
  font-size: 10px;
  font-weight: 700;
}

/* =========================================================
   ACTIONS
========================================================= */

.project-actions {
  display: flex;
  gap: 9px;
  margin-top: 23px;
}

.primary-button,
.github-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 17px;
  border-radius: 9px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 800;
  transition: 0.25s ease;
}

.primary-button {
  flex: 1;
  background: #2563eb;
  color: white;
  box-shadow: 0 7px 18px rgba(37, 99, 235, 0.18);
}

.primary-button:hover:not(.disabled-button) {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.primary-button span {
  font-size: 15px;
}

.github-button {
  flex: 0 0 105px;
  border: 1px solid #cbd5e1;
  background: white;
  color: #334155;
}

.github-button:hover:not(.disabled-button) {
  border-color: #2563eb;
  color: #2563eb;
  transform: translateY(-2px);
}

.github-icon {
  font-size: 14px;
}

/* Updated Disabled Button Style */
.disabled-button {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none; /* Prevents click events when disabled */
}

/* =========================================================
   FOOTER NOTE
========================================================= */

.projects-footer {
  margin-top: 70px;
}

.footer-line {
  width: 100%;
  height: 1px;
  background: #e2e8f0;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding-top: 23px;
}

.footer-content > span {
  color: #94a3b8;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
}

.footer-content a {
  color: #64748b;
  font-size: 12px;
  text-decoration: none;
}

.footer-content strong {
  margin-left: 5px;
  color: #2563eb;
}

.footer-content a:hover strong {
  text-decoration: underline;
}

/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 950px) {
  .page-header .page-container {
    align-items: flex-start;
    flex-direction: column;
  }
  .header-meta {
    padding-bottom: 0;
  }
  .projects-grid {
    grid-template-columns: 1fr;
    max-width: 720px;
    margin: 0 auto;
  }
  .project-visual {
    height: 330px;
  }
}

@media (max-width: 650px) {
  .page-container {
    padding: 0 18px;
  }
  .page-header {
    padding: 65px 0 55px;
  }
  .page-header h1 {
    font-size: 42px;
    letter-spacing: -1.8px;
  }
  .page-header p {
    font-size: 15px;
  }
  .projects-section {
    padding: 55px 0 70px;
  }
  .project-visual {
    height: 270px;
  }
  .project-card-body {
    padding: 23px;
  }
  .project-card-body h2 {
    font-size: 21px;
  }
  .project-description {
    min-height: auto;
  }
  .project-actions {
    flex-direction: column;
  }
  .github-button {
    flex: auto;
  }
  .footer-content {
    align-items: flex-start;
    flex-direction: column;
  }
  .footer-content > span {
    font-size: 9px;
  }
  .footer-content a {
    line-height: 1.6;
  }
  .dashboard-sidebar {
    width: 78px;
  }
  .dashboard-main {
    padding: 22px 14px;
  }
  .preview-sidebar {
    width: 48px;
  }
  .preview-main {
    padding: 25px 15px;
  }
  .portfolio-preview {
    padding-left: 20px;
    padding-right: 20px;
  }
  .portfolio-avatar {
    width: 90px;
    height: 90px;
  }
  .portfolio-copy strong {
    font-size: 23px;
  }
}

@media (max-width: 420px) {
  .page-header h1 {
    font-size: 36px;
  }
  .project-visual {
    height: 230px;
  }
  .project-card-body {
    padding: 20px;
  }
  .project-tags span {
    font-size: 9px;
  }
  .portfolio-avatar {
    width: 72px;
    height: 72px;
  }
  .portfolio-copy strong {
    font-size: 20px;
  }
  .portfolio-copy > span {
    font-size: 7px;
  }
}

/* =========================================================
   ACCESSIBILITY
========================================================= */

.primary-button:focus-visible,
.github-button:focus-visible,
.footer-content a:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.25);
  outline-offset: 3px;
}
</style>