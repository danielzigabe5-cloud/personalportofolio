<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const experiences = [
  {
    date: 'Jan 2026 — Present',
    title: 'Frontend Developer Intern',
    company: 'Tech Company',
    points: [
      'Developed responsive web interfaces using Nuxt.js.',
      'Integrated REST APIs with frontend applications.',
      'Collaborated with a team of developers.',
      'Built dashboard interfaces.',
      'Participated in code reviews.'
    ]
  },
  {
    date: '2025 — 2026',
    title: 'Internship Attendance & Advisor System',
    company: 'Personal / Academic Project',
    points: [
      'Designed and developed the complete system.',
      'Implemented role-based dashboards for Student, Advisor, Company and Admin.',
      'Used Nuxt.js, Laravel and MySQL.',
      'Added chatbot functionality for booking guidance.'
    ]
  }
]
</script>

<template>
  <div class="experience-page">

    <!-- HEADER -->
    <section class="page-header">
      <div class="page-container">
        <span class="eyebrow">
          MY PROFESSIONAL JOURNEY
        </span>

        <h1>
          Experience &
          <strong>Internship</strong>
        </h1>

        <p>
          My professional and development journey.
        </p>
      </div>
    </section>

    <!-- EXPERIENCE -->
    <section class="experience-section">
      <div class="page-container">

        <div class="timeline">

          <div
            v-for="(exp, index) in experiences"
            :key="index"
            class="timeline-item"
          >

            <div class="timeline-dot"></div>

            <div class="timeline-card">

              <span class="timeline-date">
                {{ exp.date }}
              </span>

              <h2>
                {{ exp.title }}
              </h2>

              <h3>
                {{ exp.company }}
              </h3>

              <ul>
                <li
                  v-for="(point, i) in exp.points"
                  :key="i"
                >
                  {{ point }}
                </li>
              </ul>

            </div>

          </div>

        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
.experience-page {
  min-height: 100vh;
  background: #ffffff;
  color: #0f172a;
}

.page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* HEADER */

.page-header {
  padding: 90px 20px 70px;
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
  margin-bottom: 14px;
  color: #2563eb;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0 0 15px;
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

/* SECTION */

.experience-section {
  min-height: 600px;
  padding: 85px 20px;
  background: #f8fafc;
}

/* TIMELINE */

.timeline {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding-left: 46px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 16px;
  top: 10px;
  bottom: 10px;
  width: 3px;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    #2563eb,
    #60a5fa
  );
}

/* ITEM */

.timeline-item {
  position: relative;
  margin-bottom: 42px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

/* DOT */

.timeline-dot {
  position: absolute;
  left: -39px;
  top: 30px;
  width: 22px;
  height: 22px;
  background: #ffffff;
  border: 4px solid #2563eb;
  border-radius: 50%;
  box-shadow: 0 0 0 5px #dbeafe;
  z-index: 2;
  transition: 0.3s ease;
}

.timeline-item:hover .timeline-dot {
  background: #2563eb;
  transform: scale(1.2);
  box-shadow: 0 0 0 8px #dbeafe;
}

/* CARD */

.timeline-card {
  position: relative;
  padding: 32px 34px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  transition: 0.3s ease;
}

.timeline-card:hover {
  transform: translateX(8px);
  border-color: #93c5fd;
  box-shadow: 0 18px 40px rgba(37, 99, 235, 0.10);
}

/* DATE */

.timeline-date {
  display: inline-block;
  margin-bottom: 15px;
  padding: 7px 14px;
  border-radius: 999px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.2px;
}

/* TITLES */

.timeline-card h2 {
  margin: 0 0 7px;
  color: #0f172a;
  font-size: 23px;
  font-weight: 800;
}

.timeline-card h3 {
  margin: 0 0 20px;
  color: #2563eb;
  font-size: 15px;
  font-weight: 600;
}

/* LIST */

.timeline-card ul {
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.timeline-card li {
  position: relative;
  padding-left: 27px;
  color: #64748b;
  font-size: 15px;
  line-height: 1.65;
  transition: 0.25s ease;
}

.timeline-card li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #2563eb;
  font-size: 16px;
  font-weight: 800;
}

.timeline-card li:hover {
  color: #334155;
  transform: translateX(4px);
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .page-header h1 {
    font-size: 38px;
  }

  .experience-section {
    padding: 70px 20px;
  }

  .timeline-card {
    padding: 28px;
  }
}

@media (max-width: 600px) {
  .page-container {
    padding: 0 16px;
  }

  .page-header {
    padding: 60px 16px 45px;
  }

  .page-header h1 {
    font-size: 30px;
  }

  .experience-section {
    padding: 55px 12px;
  }

  .timeline {
    padding-left: 30px;
  }

  .timeline::before {
    left: 9px;
    width: 2px;
  }

  .timeline-dot {
    left: -27px;
    top: 24px;
    width: 17px;
    height: 17px;
    border-width: 3px;
  }

  .timeline-card {
    padding: 23px 20px;
  }

  .timeline-card:hover {
    transform: translateX(4px);
  }

  .timeline-card h2 {
    font-size: 18px;
  }

  .timeline-card h3 {
    font-size: 13px;
  }

  .timeline-card li {
    font-size: 13.5px;
  }
}
</style>