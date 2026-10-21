<script setup lang="ts">
import { ref, onMounted } from 'vue'
import defaultImg from '~/assets/images/daniel.jpg'

definePageMeta({
  layout: 'default'
})

/* =====================================================
   DYNAMIC DATA (CONNECTED TO ADMIN PANEL)
===================================================== */
interface ProfileData {
  name: string
  role: string
  bio: string
  location: string
  avatarUrl: string | null
}

interface EducationItem {
  id: string
  institution: string
  degree: string
  field: string
  period: string
  description?: string
}

const profile = ref<ProfileData>({
  name: 'Daniel Zigabe',
  role: 'Frontend Developer',
  bio: 'I am a dedicated Computer Science student and software developer with a strong interest in modern web and mobile application development. I enjoy transforming ideas into practical digital products.',
  location: 'Ethiopia',
  avatarUrl: null
})

const education = ref<EducationItem>({
  id: '1',
  institution: 'Mekdela Amba University',
  degree: "Bachelor's Degree",
  field: 'Computer Science',
  period: '2023 — Present',
  description: 'Currently developing my academic foundation in computer science while gaining practical experience through real-world development projects.'
})

const imageLoadError = ref(false)

onMounted(() => {
  // 1. Fetch Profile from Admin storage
  const savedProfile = localStorage.getItem('portfolio_profile')
  if (savedProfile) {
    try {
      const parsed = JSON.parse(savedProfile)
      if (parsed.name) profile.value.name = parsed.name
      if (parsed.role) profile.value.role = parsed.role
      if (parsed.bio) profile.value.bio = parsed.bio
      if (parsed.avatarUrl) profile.value.avatarUrl = parsed.avatarUrl
    } catch (e) {
      console.error(e)
    }
  }

  // 2. Fetch Education from Admin storage
  const savedEdu = localStorage.getItem('portfolio_education') || localStorage.getItem('portfolio_education_records')
  if (savedEdu) {
    try {
      const parsedList = JSON.parse(savedEdu)
      if (Array.isArray(parsedList) && parsedList.length > 0) {
        education.value = parsedList[0] // Get primary education
      }
    } catch (e) {
      console.error(e)
    }
  }
})

const handleImageError = () => {
  imageLoadError.value = true
}
</script>

<template>
  <div class="about-page">

    <!-- =====================================================
         HERO
    ====================================================== -->
    <section class="page-header">
      <div class="page-container hero-content">

        <span class="eyebrow">
          ABOUT ME
        </span>

        <h1>
          Turning ideas into
          <span>digital solutions.</span>
        </h1>

        <p>
          I'm a {{ profile.role }} passionate about building modern, useful, and user-focused web and mobile applications.
        </p>

      </div>
    </section>

    <!-- =====================================================
         ABOUT INTRO
    ====================================================== -->
    <section class="about-section">
      <div class="page-container about-layout">

        <!-- IMAGE -->
        <div class="about-photo-wrapper">
          <div class="photo-decoration"></div>

          <div class="about-photo">
            <!-- Show Admin-uploaded Avatar, Asset Image, or Fallback UI -->
            <img
              v-if="!imageLoadError"
              :src="profile.avatarUrl || defaultImg"
              :alt="profile.name"
              @error="handleImageError"
            />
            <div v-else class="avatar-fallback">
              <span>{{ profile.name.slice(0, 2).toUpperCase() }}</span>
            </div>
          </div>

          <div class="experience-badge">
            <strong>DEV</strong>
            <span>{{ profile.role }}</span>
          </div>
        </div>

        <!-- CONTENT -->
        <div class="about-text">
          <span class="section-label">
            WHO I AM
          </span>

          <h2>
            Hello, I'm {{ profile.name }}.<br />
            <span>Passionate about technology.</span>
          </h2>

          <p>
            {{ profile.bio }}
          </p>

          <p>
            I continuously refine my development skills by tackling real-world problems and creating clean, scalable code.
          </p>

          <div class="about-actions">
            <NuxtLink to="/projects" class="primary-btn">
              View My Projects
              <span>→</span>
            </NuxtLink>

            <NuxtLink to="/contact" class="secondary-btn">
              Contact Me
            </NuxtLink>
          </div>
        </div>

      </div>
    </section>

    <!-- =====================================================
         VALUES
    ====================================================== -->
    <section class="values-section">
      <div class="page-container">

        <div class="section-heading">
          <span class="section-label">
            MY APPROACH
          </span>

          <h2>
            What I bring to
            <span>every project.</span>
          </h2>

          <p>
            I believe good software is not only about writing code.
            It is about solving real problems and creating meaningful experiences.
          </p>
        </div>

        <div class="values-grid">
          <!-- CARD 01 -->
          <div class="value-card">
            <div class="value-icon">
              <span>01</span>
            </div>
            <h3>Problem Solving</h3>
            <p>
              I enjoy breaking complex requirements into simple, practical, and maintainable solutions.
            </p>
          </div>

          <!-- CARD 02 -->
          <div class="value-card">
            <div class="value-icon">
              <span>02</span>
            </div>
            <h3>Continuous Learning</h3>
            <p>
              Technology moves fast. I actively study modern frameworks, performance techniques, and engineering best practices.
            </p>
          </div>

          <!-- CARD 03 -->
          <div class="value-card">
            <div class="value-icon">
              <span>03</span>
            </div>
            <h3>Team Collaboration</h3>
            <p>
              I value transparent communication, user feedback, and teamwork to build software that creates real impact.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- =====================================================
         EDUCATION / GOALS / INTERESTS (DYNAMIC)
    ====================================================== -->
    <section class="info-section">
      <div class="page-container">

        <div class="info-grid">

          <!-- EDUCATION (FROM ADMIN DATA) -->
          <div class="info-card">
            <div class="info-top">
              <div class="info-icon">
                🎓
              </div>
              <span>EDUCATION</span>
            </div>

            <h3>
              {{ education.institution }}
            </h3>

            <p class="info-main">
              {{ education.degree }} in {{ education.field }}
            </p>

            <p class="info-description">
              {{ education.description || 'Focused on core software principles, modern frameworks, and applied development skills.' }}
            </p>

            <span class="info-date">
              {{ education.period }}
            </span>
          </div>

          <!-- GOALS -->
          <div class="info-card">
            <div class="info-top">
              <div class="info-icon">
                🎯
              </div>
              <span>MY GOALS</span>
            </div>

            <h3>
              Building Meaningful Software
            </h3>

            <p class="info-description">
              My goal is to engineer reliable applications, contribute to innovative open-source projects, and create digital solutions that provide tangible value to people and communities.
            </p>
          </div>

          <!-- INTERESTS -->
          <div class="info-card">
            <div class="info-top">
              <div class="info-icon">
                ✦
              </div>
              <span>INTERESTS</span>
            </div>

            <h3>
              Beyond Coding
            </h3>

            <p class="info-description">
              Outside of software architecture and programming, I enjoy sports, music, and learning about emerging innovations.
            </p>

            <div class="interest-tags">
              <span>Full-Stack</span>
              <span>Web Development</span>
              <span>Football</span>
              <span>Tech Trends</span>
              <span>Design</span>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- =====================================================
         CTA
    ====================================================== -->
    <section class="cta-section">
      <div class="page-container">

        <div class="cta-box">
          <div>
            <span class="cta-label">
              LET'S BUILD SOMETHING
            </span>

            <h2>
              Have an idea or project
              <span>in mind?</span>
            </h2>

            <p>
              I'm always open to discussing new freelance projects, remote opportunities, or collaborative ventures.
            </p>
          </div>

          <NuxtLink to="/contact" class="cta-button">
            Get In Touch
            <span>→</span>
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
.about-page {
  min-height: 100vh;
  background: #ffffff;
  color: #0f172a;
}

.page-container {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 28px;
}

/* =========================================================
   HERO
========================================================= */
.page-header {
  padding: 110px 20px 95px;
  background:
    radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.07), transparent 30% ),
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-bottom: 1px solid #e2e8f0;
}

.hero-content {
  text-align: center;
  max-width: 850px;
}

.eyebrow,
.section-label,
.cta-label {
  display: inline-block;
  color: #2563eb;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 3px;
}

.hero-content h1 {
  margin: 18px 0 22px;
  color: #0f172a;
  font-size: clamp(42px, 6vw, 68px);
  line-height: 1.08;
  font-weight: 900;
  letter-spacing: -2px;
}

.hero-content h1 span {
  display: block;
  color: #2563eb;
}

.hero-content p {
  max-width: 680px;
  margin: 0 auto;
  color: #64748b;
  font-size: 17px;
  line-height: 1.8;
}

/* =========================================================
   ABOUT SECTION
========================================================= */
.about-section {
  padding: 110px 20px;
  background: #ffffff;
}

.about-layout {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 95px;
  align-items: center;
}

.about-photo-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.about-photo {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 390px;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 28px;
  background: #0f172a;
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.14);
}

.about-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.about-photo:hover img {
  transform: scale(1.03);
}

.avatar-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: #60a5fa;
  font-size: 4rem;
  font-weight: 900;
}

.photo-decoration {
  position: absolute;
  width: 85%;
  max-width: 390px;
  height: 90%;
  border: 2px solid #2563eb;
  border-radius: 28px;
  transform: translate(22px, 22px);
}

.experience-badge {
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  background: #0f172a;
  color: white;
  border-radius: 14px;
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.22);
}

.experience-badge strong {
  color: #60a5fa;
  font-size: 16px;
}

.experience-badge span {
  font-size: 11px;
  font-weight: 700;
}

.about-text {
  max-width: 620px;
}

.about-text h2 {
  margin: 15px 0 24px;
  font-size: 40px;
  line-height: 1.15;
  letter-spacing: -1px;
  font-weight: 900;
}

.about-text h2 span {
  color: #2563eb;
}

.about-text > p {
  margin-bottom: 17px;
  color: #64748b;
  font-size: 15px;
  line-height: 1.85;
}

.about-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.primary-btn,
.secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 13px 20px;
  border-radius: 11px;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  transition: 0.25s ease;
}

.primary-btn {
  background: #2563eb;
  color: #ffffff;
}

.primary-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.secondary-btn {
  border: 1px solid #dbe3ec;
  color: #334155;
  background: #ffffff;
}

.secondary-btn:hover {
  border-color: #93c5fd;
  color: #2563eb;
}

/* =========================================================
   VALUES
========================================================= */
.values-section {
  padding: 105px 20px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.section-heading {
  max-width: 680px;
  margin-bottom: 45px;
}

.section-heading h2 {
  margin: 14px 0 15px;
  font-size: 38px;
  line-height: 1.2;
  font-weight: 900;
  letter-spacing: -0.8px;
}

.section-heading h2 span {
  color: #2563eb;
}

.section-heading p {
  color: #64748b;
  font-size: 15px;
  line-height: 1.8;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.value-card {
  padding: 30px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  transition: 0.3s ease;
}

.value-card:hover {
  transform: translateY(-6px);
  border-color: #bfdbfe;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}

.value-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 22px;
  border-radius: 13px;
  background: #eff6ff;
  color: #2563eb;
}

.value-icon span {
  font-size: 12px;
  font-weight: 900;
}

.value-card h3 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 900;
}

.value-card p {
  color: #64748b;
  font-size: 13px;
  line-height: 1.75;
}

/* =========================================================
   INFORMATION
========================================================= */
.info-section {
  padding: 100px 20px;
  background: #ffffff;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.info-card {
  padding: 30px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #ffffff;
  transition: 0.3s ease;
}

.info-card:hover {
  border-color: #bfdbfe;
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.07);
}

.info-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 25px;
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #eff6ff;
  font-size: 19px;
}

.info-top span {
  color: #64748b;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 2px;
}

.info-card h3 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 900;
}

.info-main {
  margin-bottom: 12px;
  color: #2563eb;
  font-size: 13px;
  font-weight: 800;
}

.info-description {
  color: #64748b;
  font-size: 13px;
  line-height: 1.75;
}

.info-date {
  display: inline-block;
  margin-top: 18px;
  color: #94a3b8;
  font-size: 11px;
  font-weight: 700;
}

/* =========================================================
   INTERESTS
========================================================= */
.interest-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 20px;
}

.interest-tags span {
  padding: 7px 11px;
  border: 1px solid #dbeafe;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 11px;
  font-weight: 800;
}

/* =========================================================
   CTA
========================================================= */
.cta-section {
  padding: 80px 20px 100px;
  background: #ffffff;
}

.cta-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 35px;
  padding: 50px;
  border-radius: 24px;
  background: #0f172a;
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.15);
}

.cta-label {
  color: #60a5fa;
}

.cta-box h2 {
  max-width: 650px;
  margin: 12px 0;
  color: #ffffff;
  font-size: 34px;
  line-height: 1.2;
  font-weight: 900;
}

.cta-box h2 span {
  color: #60a5fa;
}

.cta-box p {
  max-width: 600px;
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.7;
}

.cta-button {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 21px;
  border-radius: 11px;
  background: #2563eb;
  color: #ffffff;
  text-decoration: none;
  font-size: 13px;
  font-weight: 800;
  transition: 0.25s ease;
}

.cta-button:hover {
  background: #3b82f6;
  transform: translateY(-2px);
}

/* =========================================================
   RESPONSIVE
========================================================= */
@media (max-width: 950px) {
  .about-layout {
    grid-template-columns: 1fr;
    gap: 65px;
  }

  .about-photo-wrapper {
    max-width: 450px;
    margin: 0 auto;
  }

  .about-text {
    max-width: 750px;
  }

  .values-grid,
  .info-grid {
    grid-template-columns: 1fr;
  }

  .cta-box {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .page-container {
    padding: 0 20px;
  }

  .page-header {
    padding: 75px 16px 65px;
  }

  .hero-content h1 {
    font-size: 40px;
    letter-spacing: -1.5px;
  }

  .hero-content p {
    font-size: 15px;
  }

  .about-section {
    padding: 75px 16px;
  }

  .about-layout {
    gap: 50px;
  }

  .about-text h2 {
    font-size: 31px;
  }

  .about-photo-wrapper {
    padding: 10px;
  }

  .experience-badge {
    right: -5px;
    bottom: -5px;
  }

  .values-section,
  .info-section {
    padding: 75px 16px;
  }

  .section-heading h2 {
    font-size: 31px;
  }

  .value-card,
  .info-card {
    padding: 24px;
  }

  .cta-section {
    padding: 60px 16px 80px;
  }

  .cta-box {
    padding: 30px 24px;
    border-radius: 18px;
  }

  .cta-box h2 {
    font-size: 27px;
  }

  .cta-button {
    width: 100%;
  }
}
</style>