<script setup lang="ts">
import profileImg from '~/assets/images/daniel.jpg'

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="about-page">

    <!-- PAGE HEADER -->
    <section class="page-header">
      <div class="page-container">
        <span>WHO I AM</span>

        <h1>
          About <strong>Me</strong>
        </h1>

        <p>
          A little about my background and journey.
        </p>
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section class="about-section">
      <div class="page-container about-layout">

        <!-- TEXT -->
        <div class="about-text">
          <span class="blue-label">ABOUT ME</span>

          <h2>
            I'm a passionate
            <strong>web developer</strong>
          </h2>

          <p>
            I am a passionate and dedicated web developer with a strong interest
            in building modern and scalable web applications.
          </p>

          <p>
            I enjoy learning new technologies, solving problems and turning
            ideas into real-world digital solutions.
          </p>

          <!-- CARDS -->
          <div class="about-cards">

            <div class="about-card">
              <span class="about-icon">◎</span>

              <h3>Problem Solver</h3>

              <p>
                I love finding practical solutions to complex problems.
              </p>
            </div>

            <div class="about-card">
              <span class="about-icon">↗</span>

              <h3>Quick Learner</h3>

              <p>
                I adapt quickly to new technologies.
              </p>
            </div>

            <div class="about-card">
              <span class="about-icon">◈</span>

              <h3>Team Player</h3>

              <p>
                I enjoy collaborating with other developers.
              </p>
            </div>

          </div>
        </div>

        <!-- IMAGE -->
        <div class="about-photo">
          <img
            :src="profileImg"
            alt="Daniel Zigabe"
          />
        </div>

      </div>
    </section>

    <!-- INFORMATION -->
    <section class="about-info-section">
      <div class="page-container info-grid">

        <!-- EDUCATION -->
        <div class="about-info-block">
          <div class="about-info-icon">🎓</div>

          <div>
            <h2>Education</h2>

            <h3>Mekdela Amba University</h3>

            <p>
              Bachelor's Degree in Computer Science
            </p>

            <span>2023 — Present</span>
          </div>
        </div>

        <!-- GOALS -->
        <div class="about-info-block">
          <div class="about-info-icon">🎯</div>

          <div>
            <h2>My Goals</h2>

            <p>
              To become a skilled software engineer, contribute to innovative
              projects, and build impactful solutions for the community.
            </p>
          </div>
        </div>

        <!-- INTERESTS -->
        <div class="about-info-block">
          <div class="about-info-icon">♡</div>

          <div>
            <h2>Interests</h2>

            <div class="interest-tags">
              <span>Coding</span>
              <span>Football</span>
              <span>Technology</span>
              <span>Travel</span>
              <span>Music</span>
            </div>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
.about-page {
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
    #ffffff 0%,
    #f8fafc 100%
  );
  border-bottom: 1px solid #e2e8f0;
}

.page-header span {
  color: #2563eb;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 3px;
}

.page-header h1 {
  margin: 12px 0;
  color: #0f172a;
  font-size: 52px;
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

/* ABOUT */

.about-section {
  padding: 85px 20px;
  background: #ffffff;
}

.about-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: center;
}

.blue-label {
  color: #2563eb;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 2px;
}

.about-text h2 {
  margin: 12px 0 22px;
  color: #0f172a;
  font-size: 36px;
  line-height: 1.25;
}

.about-text h2 strong {
  color: #2563eb;
}

.about-text > p {
  margin-bottom: 16px;
  color: #64748b;
  line-height: 1.8;
  font-size: 15px;
}

/* CARDS */

.about-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 30px;
}

.about-card {
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  box-shadow: 0 8px 25px rgba(15, 23, 42, 0.06);
  transition: 0.3s ease;
}

.about-card:hover {
  transform: translateY(-5px);
  border-color: #60a5fa;
  box-shadow: 0 15px 35px rgba(37, 99, 235, 0.12);
}

.about-icon {
  display: block;
  margin-bottom: 10px;
  color: #2563eb;
  font-size: 25px;
}

.about-card h3 {
  margin: 0 0 7px;
  color: #0f172a;
  font-size: 15px;
}

.about-card p {
  margin: 0;
  color: #64748b;
  font-size: 12px;
  line-height: 1.5;
}

/* PHOTO */

.about-photo {
  display: flex;
  justify-content: center;
}

.about-photo img {
  width: 100%;
  max-width: 390px;
  border: 4px solid #2563eb;
  border-radius: 24px;
  box-shadow: 0 20px 45px rgba(37, 99, 235, 0.15);
  object-fit: cover;
}

/* INFO */

.about-info-section {
  padding: 75px 20px;
  background: #f8fafc;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.about-info-block {
  display: flex;
  gap: 16px;
  padding: 25px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(15, 23, 42, 0.05);
  transition: 0.3s ease;
}

.about-info-block:hover {
  transform: translateY(-4px);
  border-color: #93c5fd;
}

.about-info-icon {
  font-size: 28px;
}

.about-info-block h2 {
  margin: 0 0 8px;
  color: #0f172a;
  font-size: 20px;
}

.about-info-block h3 {
  margin: 0 0 5px;
  color: #2563eb;
  font-size: 15px;
}

.about-info-block p {
  margin: 0 0 8px;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}

.about-info-block > div > span {
  color: #94a3b8;
  font-size: 12px;
}

.interest-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.interest-tags span {
  padding: 6px 12px;
  border-radius: 20px;
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
  font-size: 12px;
  font-weight: 700;
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .about-layout {
    grid-template-columns: 1fr;
  }

  .about-photo {
    order: -1;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .page-header {
    padding: 60px 16px 45px;
  }

  .page-header h1 {
    font-size: 34px;
  }

  .about-section {
    padding: 55px 16px;
  }

  .about-cards {
    grid-template-columns: 1fr;
  }

  .about-text h2 {
    font-size: 28px;
  }

  .about-info-section {
    padding: 50px 16px;
  }
}
</style>