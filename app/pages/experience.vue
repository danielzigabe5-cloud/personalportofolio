<template>
  <div>
    <section class="page-header">
      <div class="page-container">
        <span>MY PROFESSIONAL JOURNEY</span>
        <h1>Experience & <strong>Internship</strong></h1>
        <p>My professional and development journey.</p>
      </div>
    </section>

    <section class="experience-section">
      <div class="page-container">
        <div class="timeline">

          <!-- EXPERIENCE 1 -->
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <span class="timeline-date">Jan 2026 — Present</span>
              <h2>Frontend Developer Intern</h2>
              <h3>Tech Company</h3>
              <ul>
                <li>Developed responsive web interfaces using Nuxt.js.</li>
                <li>Integrated REST APIs with frontend applications.</li>
                <li>Collaborated with a team of developers.</li>
                <li>Built dashboard interfaces.</li>
                <li>Participated in code reviews.</li>
              </ul>
            </div>
          </div>

          <!-- EXPERIENCE 2 -->
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <span class="timeline-date">2025 — 2026</span>
              <h2>Internship Attendance & Advisor System</h2>
              <h3>Personal / Academic Project</h3>
              <ul>
                <li>Designed and developed the complete system.</li>
                <li>Implemented role-based dashboards for Student, Advisor, Company and Admin.</li>
                <li>Used Nuxt.js, Laravel and MySQL.</li>
                <li>Added chatbot functionality for booking guidance.</li>
              </ul>
            </div>
          </div>

        </div>
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

/* ===== Experience Section ===== */
.experience-section {
  background: #f8fafc;
  padding: 80px 20px;
}

/* ===== Timeline ===== */
.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding-left: 40px;
}

/* ቀጥ ያለ አረንጓዴ መስመር */
.timeline::before {
  content: '';
  position: absolute;
  left: 14px;
  top: 8px;
  bottom: 8px;
  width: 3px;
  background: linear-gradient(180deg, #42b883 0%, #347474 100%);
  border-radius: 2px;
}

/* ===== Timeline Item ===== */
.timeline-item {
  position: relative;
  margin-bottom: 40px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

/* ===== Timeline Dot ===== */
.timeline-dot {
  position: absolute;
  left: -33px;
  top: 26px;
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 4px solid #42b883;
  border-radius: 50%;
  box-shadow: 0 0 0 5px rgba(66, 184, 131, 0.15);
  z-index: 2;
  transition: 0.3s;
}

.timeline-item:hover .timeline-dot {
  background: #42b883;
  transform: scale(1.2);
  box-shadow: 0 0 0 8px rgba(66, 184, 131, 0.25);
}

/* ===== Timeline Card ===== */
.timeline-card {
  background: #ffffff;
  padding: 30px 34px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.06);
  transition: 0.3s;
  position: relative;
  overflow: hidden;
}

.timeline-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #42b883, #347474);
  opacity: 0;
  transition: 0.3s;
}

.timeline-card:hover {
  transform: translateX(8px);
  border-color: #42b883;
  box-shadow: 0 16px 40px rgba(66, 184, 131, 0.15);
}

.timeline-card:hover::before {
  opacity: 1;
}

/* ===== Timeline Date ===== */
.timeline-date {
  display: inline-block;
  color: #42b883;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background: rgba(66, 184, 131, 0.1);
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 14px;
}

/* ===== Headings ===== */
.timeline-card h2 {
  color: #0f172a;
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 6px;
  line-height: 1.3;
}

.timeline-card h3 {
  color: #42b883;
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 18px;
  letter-spacing: 0.3px;
}

/* ===== List ===== */
.timeline-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.timeline-card li {
  color: #475569;
  font-size: 15px;
  line-height: 1.6;
  padding-left: 26px;
  position: relative;
  transition: 0.25s;
}

.timeline-card li::before {
  content: '▸';
  position: absolute;
  left: 0;
  top: 0;
  color: #42b883;
  font-weight: 800;
  font-size: 16px;
}

.timeline-card li:hover {
  color: #0f172a;
  transform: translateX(4px);
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .page-header h1 {
    font-size: 38px;
  }
  .timeline {
    padding-left: 32px;
  }
  .timeline::before {
    left: 10px;
  }
  .timeline-dot {
    left: -29px;
    width: 18px;
    height: 18px;
  }
  .timeline-card {
    padding: 26px 26px;
  }
  .timeline-card h2 {
    font-size: 19px;
  }
}

@media (max-width: 600px) {
  .page-header {
    padding: 60px 16px 40px;
  }
  .page-header h1 {
    font-size: 28px;
  }
  .page-header p {
    font-size: 15px;
  }
  .experience-section {
    padding: 50px 12px;
  }
  .timeline {
    padding-left: 26px;
  }
  .timeline::before {
    left: 8px;
  }
  .timeline-dot {
    left: -25px;
    width: 16px;
    height: 16px;
    border-width: 3px;
  }
  .timeline-card {
    padding: 22px 20px;
    border-radius: 14px;
  }
  .timeline-card h2 {
    font-size: 17px;
  }
  .timeline-card h3 {
    font-size: 13px;
  }
  .timeline-card li {
    font-size: 14px;
    padding-left: 22px;
  }
  .timeline-date {
    font-size: 11px;
    padding: 5px 11px;
  }
}
</style>