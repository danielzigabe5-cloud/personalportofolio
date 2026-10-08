<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const experiences = [
  {
    date: 'Jan 2026 — Present',
    type: 'INTERNSHIP',
    status: 'Current',
    title: 'Frontend Developer Intern',
    company: 'Ewenet Communication PLC',
    location: 'Ethiopia',
    description:
      'Working as a Frontend Developer Intern, contributing to modern web and mobile application development while gaining practical experience in a professional development environment.',
    points: [
      'Develop responsive and user-friendly web interfaces using Nuxt.js.',
      'Integrate RESTful APIs with frontend applications.',
      'Build reusable components and dashboard interfaces.',
      'Collaborate with developers during feature development and testing.',
      'Participate in debugging, code reviews and continuous improvements.'
    ],
    technologies: [
      'Nuxt.js',
      'Vue.js',
      'Tailwind CSS',
      'Flutter',
      'Laravel',
      'REST API'
    ]
  },

  {
    date: '2025 — 2026',
    type: 'ACADEMIC PROJECT',
    status: 'Completed',
    title: 'Internship Attendance & Advisor System',
    company: 'Academic / Personal Project',
    location: 'Ethiopia',
    description:
      'Designed and developed a multi-role internship management platform connecting students, company supervisors, advisors and administrators.',
    points: [
      'Designed the overall system structure and user experience.',
      'Implemented role-based dashboards for Student, Advisor, Company and Admin.',
      'Developed frontend interfaces using Nuxt.js and Vue.js.',
      'Built backend services using Laravel and MySQL.',
      'Implemented attendance, internship monitoring and management workflows.'
    ],
    technologies: [
      'Nuxt.js',
      'Vue.js',
      'Laravel',
      'MySQL',
      'Tailwind CSS'
    ]
  },

  {
    date: '2025 — 2026',
    type: 'SOFTWARE PROJECT',
    status: 'Developed',
    title: 'CombolojoSPORT',
    company: 'Sports Venue Booking Platform',
    location: 'Ethiopia',
    description:
      'Developed a sports venue discovery and booking platform designed to connect players with sports venues across Ethiopia.',
    points: [
      'Developed the public website for discovering sports venues and events.',
      'Built admin and partner dashboard interfaces.',
      'Designed venue discovery, search and venue detail experiences.',
      'Integrated a Laravel backend API with the frontend.',
      'Contributed to the Flutter mobile application for venue booking.'
    ],
    technologies: [
      'Nuxt.js',
      'Vue.js',
      'Flutter',
      'Laravel',
      'MySQL',
      'Tailwind CSS'
    ]
  }
]

const skills = [
  'Frontend Development',
  'API Integration',
  'Responsive UI',
  'Dashboard Development',
  'Mobile Development',
  'Team Collaboration'
]
</script>

<template>
  <div class="experience-page">

    <!-- =====================================================
         HERO
    ====================================================== -->

    <section class="page-header">
      <div class="page-container hero-content">

        <span class="eyebrow">
          PROFESSIONAL JOURNEY
        </span>

        <h1>
          Experience &
          <span>Internship.</span>
        </h1>

        <p>
          A look at my professional experience, academic projects
          and the real-world software development work I have built.
        </p>

        <div class="hero-meta">

          <div class="hero-meta-item">
            <span class="meta-dot"></span>
            <strong>Frontend Developer</strong>
          </div>

          <div class="meta-divider"></div>

          <div class="hero-meta-item">
            <span>📍</span>
            <strong>Ethiopia</strong>
          </div>

        </div>

      </div>
    </section>


    <!-- =====================================================
         EXPERIENCE OVERVIEW
    ====================================================== -->

    <section class="overview-section">

      <div class="page-container">

        <div class="overview-grid">

          <div class="overview-card">

            <div class="overview-icon">
              💼
            </div>

            <div>
              <strong>Professional Experience</strong>
              <span>Frontend Development</span>
            </div>

          </div>


          <div class="overview-card">

            <div class="overview-icon">
              🚀
            </div>

            <div>
              <strong>Real Projects</strong>
              <span>Web & Mobile Applications</span>
            </div>

          </div>


          <div class="overview-card">

            <div class="overview-icon">
              🧩
            </div>

            <div>
              <strong>Technical Focus</strong>
              <span>Modern Full-Stack Development</span>
            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         EXPERIENCE TIMELINE
    ====================================================== -->

    <section class="experience-section">

      <div class="page-container">

        <div class="section-heading">

          <span class="section-label">
            MY JOURNEY
          </span>

          <h2>
            Building experience
            <span>through real projects.</span>
          </h2>

          <p>
            My development journey combines internship experience,
            academic work and practical software projects.
          </p>

        </div>


        <div class="timeline">

          <div class="timeline-line"></div>


          <article
            v-for="(experience, index) in experiences"
            :key="experience.title"
            class="timeline-item"
          >

            <!-- TIMELINE POINT -->

            <div class="timeline-marker">

              <span>
                {{ String(index + 1).padStart(2, '0') }}
              </span>

            </div>


            <!-- EXPERIENCE CARD -->

            <div class="experience-card">

              <!-- CARD TOP -->

              <div class="card-top">

                <div class="experience-type">
                  {{ experience.type }}
                </div>

                <div
                  class="experience-status"
                  :class="{
                    current: experience.status === 'Current'
                  }"
                >

                  <span></span>

                  {{ experience.status }}

                </div>

              </div>


              <!-- DATE -->

              <div class="experience-date">
                {{ experience.date }}
              </div>


              <!-- TITLE -->

              <h3>
                {{ experience.title }}
              </h3>


              <!-- COMPANY -->

              <div class="company-row">

                <strong>
                  {{ experience.company }}
                </strong>

                <span class="company-location">
                  📍 {{ experience.location }}
                </span>

              </div>


              <!-- DESCRIPTION -->

              <p class="experience-description">
                {{ experience.description }}
              </p>


              <!-- RESPONSIBILITIES -->

              <div class="details-section">

                <div class="details-title">
                  <span></span>
                  Key Responsibilities
                </div>

                <ul>

                  <li
                    v-for="point in experience.points"
                    :key="point"
                  >

                    <span class="check">
                      ✓
                    </span>

                    <span>
                      {{ point }}
                    </span>

                  </li>

                </ul>

              </div>


              <!-- TECHNOLOGIES -->

              <div class="technology-section">

                <span class="technology-label">
                  TECHNOLOGIES
                </span>

                <div class="technology-list">

                  <span
                    v-for="technology in experience.technologies"
                    :key="technology"
                  >
                    {{ technology }}
                  </span>

                </div>

              </div>

            </div>

          </article>

        </div>

      </div>

    </section>


    <!-- =====================================================
         SKILLS DEVELOPED
    ====================================================== -->

    <section class="skills-section">

      <div class="page-container">

        <div class="skills-card">

          <div class="skills-content">

            <span class="section-label">
              EXPERIENCE GAINED
            </span>

            <h2>
              Skills developed
              <span>along the way.</span>
            </h2>

            <p>
              Each project and professional experience has helped me
              strengthen both my technical and professional skills.
            </p>

            <div class="skills-list">

              <span
                v-for="skill in skills"
                :key="skill"
              >
                {{ skill }}
              </span>

            </div>

          </div>


          <div class="skills-visual">

            <div class="visual-circle circle-one"></div>
            <div class="visual-circle circle-two"></div>
            <div class="visual-circle circle-three"></div>

            <div class="visual-center">
              <strong>3+</strong>
              <span>Projects</span>
            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         BOTTOM CTA
    ====================================================== -->

    <section class="experience-cta">

      <div class="page-container">

        <div class="cta-content">

          <span class="section-label">
            NEXT CHAPTER
          </span>

          <h2>
            Always learning.
            <span>Always building.</span>
          </h2>

          <p>
            I am continuously improving my development skills and
            looking for opportunities to contribute to meaningful
            software projects.
          </p>

          <NuxtLink
            to="/contact"
            class="cta-button"
          >
            Let's Work Together
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

.experience-page {
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
  padding: 110px 20px 90px;

  background:
    radial-gradient(
      circle at 80% 20%,
      rgba(37, 99, 235, 0.07),
      transparent 30%
    ),
    linear-gradient(
      180deg,
      #ffffff 0%,
      #f8fafc 100%
    );

  border-bottom: 1px solid #e2e8f0;
}

.hero-content {
  max-width: 850px;
  margin: 0 auto;

  text-align: center;
}

.eyebrow {
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

.hero-meta {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 18px;

  margin-top: 28px;
}

.hero-meta-item {
  display: flex;
  align-items: center;
  gap: 8px;

  color: #475569;

  font-size: 12px;
}

.hero-meta-item strong {
  font-weight: 800;
}

.meta-dot {
  width: 8px;
  height: 8px;

  border-radius: 50%;

  background: #22c55e;

  box-shadow:
    0 0 0 5px rgba(34, 197, 94, 0.1);
}

.meta-divider {
  width: 1px;
  height: 20px;

  background: #cbd5e1;
}


/* =========================================================
   OVERVIEW
========================================================= */

.overview-section {
  padding: 35px 20px;

  background: #ffffff;

  border-bottom: 1px solid #e2e8f0;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 15px;
}

.overview-card {
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 20px;

  background: #ffffff;

  border: 1px solid #e2e8f0;

  border-radius: 14px;

  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.overview-card:hover {
  transform: translateY(-3px);

  border-color: #bfdbfe;

  box-shadow:
    0 12px 30px rgba(15, 23, 42, 0.06);
}

.overview-icon {
  width: 44px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  background: #eff6ff;

  border: 1px solid #dbeafe;

  border-radius: 12px;

  font-size: 19px;
}

.overview-card strong {
  display: block;

  margin-bottom: 4px;

  color: #0f172a;

  font-size: 12px;
  font-weight: 900;
}

.overview-card span {
  color: #94a3b8;

  font-size: 10px;
}


/* =========================================================
   EXPERIENCE SECTION
========================================================= */

.experience-section {
  padding: 100px 20px;

  background: #f8fafc;
}


/* =========================================================
   SECTION HEADING
========================================================= */

.section-heading {
  max-width: 700px;

  margin-bottom: 65px;
}

.section-label {
  display: inline-block;

  color: #2563eb;

  font-size: 10px;
  font-weight: 900;

  letter-spacing: 2.5px;
}

.section-heading h2 {
  margin: 13px 0 15px;

  color: #0f172a;

  font-size: 40px;
  line-height: 1.18;

  font-weight: 900;

  letter-spacing: -1px;
}

.section-heading h2 span {
  color: #2563eb;
}

.section-heading p {
  max-width: 600px;

  margin: 0;

  color: #64748b;

  font-size: 14px;
  line-height: 1.8;
}


/* =========================================================
   TIMELINE
========================================================= */

.timeline {
  position: relative;

  max-width: 1000px;

  margin: 0 auto;
}

.timeline-line {
  position: absolute;

  top: 0;
  bottom: 0;
  left: 27px;

  width: 2px;

  background:
    linear-gradient(
      180deg,
      #2563eb 0%,
      #bfdbfe 75%,
      #e2e8f0 100%
    );
}


/* =========================================================
   TIMELINE ITEM
========================================================= */

.timeline-item {
  position: relative;

  padding-left: 80px;

  margin-bottom: 45px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}


/* =========================================================
   TIMELINE MARKER
========================================================= */

.timeline-marker {
  position: absolute;

  top: 28px;
  left: 0;

  width: 56px;
  height: 56px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #ffffff;

  border: 2px solid #2563eb;

  border-radius: 50%;

  z-index: 2;

  box-shadow:
    0 0 0 6px #dbeafe;

  transition:
    transform 0.3s ease,
    background 0.3s ease;
}

.timeline-marker span {
  color: #2563eb;

  font-size: 11px;
  font-weight: 900;
}

.timeline-item:hover .timeline-marker {
  transform: scale(1.08);

  background: #eff6ff;
}


/* =========================================================
   EXPERIENCE CARD
========================================================= */

.experience-card {
  position: relative;

  padding: 34px 36px;

  background: #ffffff;

  border: 1px solid #e2e8f0;

  border-radius: 20px;

  box-shadow:
    0 12px 35px rgba(15, 23, 42, 0.055);

  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.experience-card:hover {
  transform: translateY(-5px);

  border-color: #bfdbfe;

  box-shadow:
    0 20px 45px rgba(37, 99, 235, 0.09);
}


/* =========================================================
   CARD TOP
========================================================= */

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 15px;

  margin-bottom: 17px;
}

.experience-type {
  color: #2563eb;

  font-size: 9px;
  font-weight: 900;

  letter-spacing: 2px;
}

.experience-status {
  display: flex;
  align-items: center;
  gap: 7px;

  padding: 6px 10px;

  border-radius: 999px;

  background: #f8fafc;

  color: #64748b;

  font-size: 9px;
  font-weight: 800;
}

.experience-status span {
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #94a3b8;
}

.experience-status.current {
  background: #f0fdf4;

  color: #15803d;
}

.experience-status.current span {
  background: #22c55e;

  box-shadow:
    0 0 0 4px rgba(34, 197, 94, 0.1);
}


/* =========================================================
   DATE
========================================================= */

.experience-date {
  display: inline-block;

  margin-bottom: 13px;

  padding: 6px 11px;

  background: #eff6ff;

  border: 1px solid #dbeafe;

  border-radius: 999px;

  color: #2563eb;

  font-size: 10px;
  font-weight: 800;

  letter-spacing: 0.5px;
}


/* =========================================================
   TITLES
========================================================= */

.experience-card h3 {
  margin: 0 0 8px;

  color: #0f172a;

  font-size: 26px;

  font-weight: 900;

  letter-spacing: -0.5px;
}

.company-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: 12px;

  margin-bottom: 20px;
}

.company-row strong {
  color: #2563eb;

  font-size: 14px;

  font-weight: 800;
}

.company-location {
  color: #94a3b8;

  font-size: 11px;
}


/* =========================================================
   DESCRIPTION
========================================================= */

.experience-description {
  max-width: 850px;

  margin: 0 0 27px;

  color: #64748b;

  font-size: 13px;

  line-height: 1.8;
}


/* =========================================================
   DETAILS
========================================================= */

.details-section {
  padding-top: 24px;

  border-top: 1px solid #f1f5f9;
}

.details-title {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 15px;

  color: #334155;

  font-size: 11px;
  font-weight: 900;

  letter-spacing: 0.8px;

  text-transform: uppercase;
}

.details-title > span {
  width: 20px;
  height: 2px;

  background: #2563eb;
}

.details-section ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 11px 25px;

  margin: 0;
  padding: 0;

  list-style: none;
}

.details-section li {
  display: flex;
  align-items: flex-start;
  gap: 9px;

  color: #64748b;

  font-size: 12px;

  line-height: 1.65;
}

.check {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 17px;
  height: 17px;

  flex-shrink: 0;

  margin-top: 1px;

  border-radius: 50%;

  background: #eff6ff;

  color: #2563eb;

  font-size: 9px;
  font-weight: 900;
}


/* =========================================================
   TECHNOLOGIES
========================================================= */

.technology-section {
  margin-top: 27px;
  padding-top: 23px;

  border-top: 1px solid #f1f5f9;
}

.technology-label {
  display: block;

  margin-bottom: 11px;

  color: #94a3b8;

  font-size: 9px;
  font-weight: 900;

  letter-spacing: 1.8px;
}

.technology-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.technology-list span {
  padding: 7px 11px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;

  border-radius: 7px;

  color: #475569;

  font-size: 10px;
  font-weight: 700;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.technology-list span:hover {
  background: #eff6ff;

  border-color: #bfdbfe;

  color: #2563eb;
}


/* =========================================================
   SKILLS SECTION
========================================================= */

.skills-section {
  padding: 90px 20px;

  background: #ffffff;
}

.skills-card {
  position: relative;

  display: grid;
  grid-template-columns: 1fr 280px;

  align-items: center;

  gap: 50px;

  padding: 50px;

  overflow: hidden;

  background: #0f172a;

  border-radius: 24px;

  box-shadow:
    0 25px 60px rgba(15, 23, 42, 0.15);
}

.skills-content {
  position: relative;
  z-index: 2;
}

.skills-content .section-label {
  color: #60a5fa;
}

.skills-content h2 {
  margin: 13px 0 15px;

  color: #ffffff;

  font-size: 32px;

  line-height: 1.2;

  font-weight: 900;
}

.skills-content h2 span {
  color: #60a5fa;
}

.skills-content p {
  max-width: 650px;

  margin: 0 0 23px;

  color: #94a3b8;

  font-size: 13px;

  line-height: 1.8;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skills-list span {
  padding: 8px 13px;

  background: rgba(96, 165, 250, 0.09);

  border: 1px solid rgba(96, 165, 250, 0.2);

  border-radius: 999px;

  color: #bfdbfe;

  font-size: 10px;

  font-weight: 800;
}


/* =========================================================
   SKILLS VISUAL
========================================================= */

.skills-visual {
  position: relative;

  width: 230px;
  height: 230px;

  margin: 0 auto;
}

.visual-circle {
  position: absolute;

  border: 1px solid rgba(96, 165, 250, 0.2);

  border-radius: 50%;
}

.circle-one {
  inset: 0;
}

.circle-two {
  inset: 28px;
}

.circle-three {
  inset: 56px;
}

.visual-center {
  position: absolute;

  inset: 0;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
}

.visual-center strong {
  color: #ffffff;

  font-size: 42px;

  line-height: 1;

  font-weight: 900;
}

.visual-center span {
  margin-top: 7px;

  color: #94a3b8;

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 1px;
}


/* =========================================================
   CTA
========================================================= */

.experience-cta {
  padding: 100px 20px;

  background:
    linear-gradient(
      180deg,
      #f8fafc 0%,
      #ffffff 100%
    );

  border-top: 1px solid #e2e8f0;
}

.cta-content {
  max-width: 750px;

  margin: 0 auto;

  text-align: center;
}

.cta-content h2 {
  margin: 15px 0;

  color: #0f172a;

  font-size: 42px;

  line-height: 1.15;

  font-weight: 900;

  letter-spacing: -1px;
}

.cta-content h2 span {
  color: #2563eb;
}

.cta-content p {
  max-width: 620px;

  margin: 0 auto 28px;

  color: #64748b;

  font-size: 14px;

  line-height: 1.8;
}

.cta-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 12px;

  padding: 13px 21px;

  background: #2563eb;

  border: 1px solid #2563eb;

  border-radius: 10px;

  color: #ffffff;

  font-size: 12px;

  font-weight: 800;

  text-decoration: none;

  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}

.cta-button span {
  font-size: 17px;

  transition:
    transform 0.25s ease;
}

.cta-button:hover {
  transform: translateY(-2px);

  background: #1d4ed8;

  box-shadow:
    0 12px 25px rgba(37, 99, 235, 0.22);
}

.cta-button:hover span {
  transform: translateX(4px);
}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 950px) {

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .skills-card {
    grid-template-columns: 1fr;
  }

  .skills-visual {
    display: none;
  }

  .details-section ul {
    grid-template-columns: 1fr;
  }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 650px) {

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

  .hero-meta {
    gap: 12px;
  }

  .experience-section {
    padding: 75px 16px;
  }

  .section-heading {
    margin-bottom: 45px;
  }

  .section-heading h2 {
    font-size: 31px;
  }

  /* Timeline */

  .timeline-line {
    left: 10px;
  }

  .timeline-item {
    padding-left: 35px;

    margin-bottom: 30px;
  }

  .timeline-marker {
    left: -17px;

    width: 38px;
    height: 38px;

    box-shadow:
      0 0 0 4px #dbeafe;
  }

  .timeline-marker span {
    font-size: 9px;
  }

  /* Card */

  .experience-card {
    padding: 25px 21px;

    border-radius: 16px;
  }

  .experience-card:hover {
    transform: translateY(-3px);
  }

  .card-top {
    align-items: flex-start;

    flex-direction: column;

    gap: 9px;
  }

  .experience-card h3 {
    font-size: 21px;
  }

  .company-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }

  .experience-description {
    font-size: 12px;
  }

  .details-section ul {
    grid-template-columns: 1fr;
  }

  /* Skills */

  .skills-section {
    padding: 70px 16px;
  }

  .skills-card {
    padding: 32px 23px;

    border-radius: 18px;
  }

  .skills-content h2 {
    font-size: 27px;
  }

  /* CTA */

  .experience-cta {
    padding: 75px 16px;
  }

  .cta-content h2 {
    font-size: 32px;
  }

}


/* =========================================================
   EXTRA SMALL
========================================================= */

@media (max-width: 380px) {

  .hero-content h1 {
    font-size: 34px;
  }

  .overview-card {
    padding: 16px;
  }

  .experience-card {
    padding: 22px 18px;
  }

  .experience-date {
    font-size: 9px;
  }

  .technology-list span {
    font-size: 9px;
  }

}
</style>