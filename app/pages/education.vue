<template>
  <div>
    <section class="page-header">
      <div class="page-container">
        <span>MY ACADEMIC BACKGROUND</span>
        <h1>My <strong>Education</strong></h1>
        <p>My academic journey and learning background.</p>
      </div>
    </section>

    <section class="education-section">
      <div class="page-container">

        <!-- University -->
        <div class="university-card">
          <div class="university-icon">🎓</div>
          <div>
            <span class="education-date">2023 — Present</span>
            <h2>Mekdela Amba University</h2>
            <h3>Bachelor's Degree in Computer Science</h3>
            <p>Tulu Awliya Campus, Ethiopia</p>
          </div>
        </div>

        <!-- Courses -->
        <div class="education-grid">
          <div class="education-list">
            <h2>Relevant Courses</h2>
            <ul>
              <li>Data Structures & Algorithms</li>
              <li>Database Systems</li>
              <li>Web Development</li>
              <li>Software Engineering</li>
              <li>Computer Networks</li>
            </ul>
          </div>

          <div class="education-list">
            <h2>Certifications</h2>
            <ul>
              <li>Responsive Web Design</li>
              <li>JavaScript Algorithms</li>
              <li>Introduction to Laravel</li>
              <li>Web Development</li>
            </ul>
          </div>
        </div>

        <!-- Quote -->
        <div class="education-quote">
          <span>“</span>
          <p>
            Education is not just about learning;
            it's about building a better future.
          </p>
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

/* ===== Education Section ===== */
.education-section {
  background: #f8fafc;
  padding: 80px 20px;
}

/* ===== University Card ===== */
.university-card {
  display: flex;
  align-items: flex-start;
  gap: 28px;
  background: #ffffff;
  padding: 36px 40px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08);
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;
  transition: 0.3s;
}

.university-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(180deg, #42b883, #347474);
}

.university-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
}

.university-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #42b883, #347474);
  border-radius: 18px;
  font-size: 38px;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(66, 184, 131, 0.35);
}

.education-date {
  display: inline-block;
  color: #42b883;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: rgba(66, 184, 131, 0.1);
  padding: 5px 12px;
  border-radius: 20px;
  margin-bottom: 10px;
}

.university-card h2 {
  color: #0f172a;
  font-size: 26px;
  font-weight: 800;
  margin: 0 0 6px;
}

.university-card h3 {
  color: #42b883;
  font-size: 17px;
  font-weight: 600;
  margin: 0 0 8px;
}

.university-card p {
  color: #64748b;
  font-size: 14px;
  margin: 0;
}

/* ===== Education Grid ===== */
.education-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 60px;
}

.education-list {
  background: #ffffff;
  padding: 32px 34px;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.05);
  transition: 0.3s;
}

.education-list:hover {
  transform: translateY(-4px);
  border-color: #42b883;
  box-shadow: 0 16px 40px rgba(66, 184, 131, 0.12);
}

.education-list h2 {
  color: #0f172a;
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f1f5f9;
  position: relative;
}

.education-list h2::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 50px;
  height: 2px;
  background: #42b883;
}

.education-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.education-list li {
  color: #334155;
  font-size: 15px;
  font-weight: 500;
  padding-left: 28px;
  position: relative;
  line-height: 1.5;
  transition: 0.25s;
}

.education-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(66, 184, 131, 0.15);
  color: #42b883;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 800;
}

.education-list li:hover {
  color: #42b883;
  transform: translateX(4px);
}

/* ===== Quote ===== */
.education-quote {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 50px 60px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  text-align: center;
  border: 1px solid #334155;
}

.education-quote::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(66, 184, 131, 0.15), transparent 70%);
  border-radius: 50%;
}

.education-quote span {
  display: block;
  font-size: 90px;
  color: #42b883;
  font-family: Georgia, serif;
  line-height: 0.5;
  margin-bottom: 20px;
  opacity: 0.6;
}

.education-quote p {
  color: #e2e8f0;
  font-size: 22px;
  font-weight: 500;
  font-style: italic;
  line-height: 1.6;
  margin: 0;
  position: relative;
  z-index: 1;
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .education-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .page-header h1 {
    font-size: 38px;
  }
  .university-card {
    padding: 28px 30px;
    gap: 20px;
  }
  .university-icon {
    width: 68px;
    height: 68px;
    font-size: 32px;
  }
  .university-card h2 {
    font-size: 22px;
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
  .education-section {
    padding: 50px 16px;
  }
  .university-card {
    flex-direction: column;
    padding: 24px 22px;
    gap: 16px;
  }
  .university-icon {
    width: 60px;
    height: 60px;
    font-size: 28px;
  }
  .university-card h2 {
    font-size: 19px;
  }
  .university-card h3 {
    font-size: 15px;
  }
  .education-list {
    padding: 24px 22px;
  }
  .education-list h2 {
    font-size: 17px;
  }
  .education-quote {
    padding: 36px 24px;
  }
  .education-quote span {
    font-size: 70px;
  }
  .education-quote p {
    font-size: 17px;
  }
}
</style>