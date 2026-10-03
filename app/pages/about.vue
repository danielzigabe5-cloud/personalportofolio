<script setup lang="ts">
import profileImg from '~/assets/images/daniel.jpg'
</script>

<template>
  <div>
    <section class="page-header">
      <div class="page-container">
        <span>WHO I AM</span>
        <h1>About <strong>Me</strong></h1>
        <p>A little about my background and journey.</p>
      </div>
    </section>

    <section class="about-section">
      <div class="page-container about-layout">
        <!-- Text -->
        <div class="about-text">
          <span class="green-label">ABOUT ME</span>
          <h2>
            I'm a passionate
            <strong>web developer</strong>
          </h2>

          <p>
            I am a passionate and dedicated web developer with a strong interest in
            building modern and scalable web applications.
          </p>

          <p>
            I enjoy learning new technologies, solving problems and turning ideas
            into real-world digital solutions.
          </p>

          <!-- Cards -->
          <div class="about-cards">
            <div>
              <span class="about-icon">◎</span>
              <h3>Problem Solver</h3>
              <p>I love finding practical solutions to complex problems.</p>
            </div>

            <div>
              <span class="about-icon">↗</span>
              <h3>Quick Learner</h3>
              <p>I adapt quickly to new technologies.</p>
            </div>

            <div>
              <span class="about-icon">◈</span>
              <h3>Team Player</h3>
              <p>I enjoy collaborating with other developers.</p>
            </div>
          </div>
        </div>

        <!-- Image -->
        <div class="about-photo">
          <img
            :src="profileImg"
            alt="Daniel Zigabe"
          />
        </div>
      </div>
    </section>

    <!-- EDUCATION -->
    <section class="about-info-section">
      <div class="page-container">
        <div class="about-info-block">
          <div class="about-info-icon">🎓</div>
          <div>
            <h2>Education</h2>
            <h3>Mekdela Amba University</h3>
            <p>Bachelor's Degree in Computer Science</p>
            <span>2023 — Present</span>
          </div>
        </div>

        <div class="about-info-block">
          <div class="about-info-icon">🎯</div>
          <div>
            <h2>My Goals</h2>
            <p>
              To become a skilled software engineer, contribute to innovative projects,
              and build impactful solutions for the community.
            </p>
          </div>
        </div>

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
/* Page Header */
.page-header {
  padding: 4rem 1.5rem 2rem;
  text-align: center;
  background-color: #0d1117;
}

.page-container {
  max-width: 1100px;
  margin: 0 auto;
}

.page-header span {
  color: #10b981;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 2px;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #ffffff;
  margin: 0.5rem 0;
}

.page-header h1 strong {
  color: #10b981;
}

.page-header p {
  color: #9ca3af;
  font-size: 1rem;
}

/* About Layout */
.about-section {
  padding: 4rem 1.5rem;
  background-color: #0d1117;
}

.about-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.green-label {
  color: #10b981;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.about-text h2 {
  font-size: 2rem;
  color: #ffffff;
  margin: 0.5rem 0 1.5rem;
}

.about-text h2 strong {
  color: #10b981;
}

.about-text p {
  color: #9ca3af;
  line-height: 1.7;
  margin-bottom: 1rem;
}

/* Feature Cards */
.about-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

.about-cards > div {
  background-color: #161b22;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.25rem;
  border-radius: 12px;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.about-cards > div:hover {
  transform: translateY(-4px);
  border-color: #10b981;
}

.about-icon {
  color: #10b981;
  font-size: 1.25rem;
  display: block;
  margin-bottom: 0.5rem;
}

.about-cards h3 {
  color: #ffffff;
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
}

.about-cards p {
  color: #9ca3af;
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: 0;
}

/* Photo Styling */
.about-photo {
  display: flex;
  justify-content: center;
}

.about-photo img {
  width: 100%;
  max-width: 380px;
  height: auto;
  border-radius: 20px;
  border: 3px solid #10b981;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.15);
  object-fit: cover;
}

/* Info Section */
.about-info-section {
  padding: 4rem 1.5rem;
  background-color: #161b22;
}

.about-info-section .page-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.about-info-block {
  display: flex;
  gap: 1rem;
  background-color: #0d1117;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.about-info-icon {
  font-size: 1.75rem;
}

.about-info-block h2 {
  color: #ffffff;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.about-info-block h3 {
  color: #10b981;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.about-info-block p {
  color: #9ca3af;
  font-size: 0.9rem;
  line-height: 1.5;
}

.about-info-block span {
  color: #6b7280;
  font-size: 0.8rem;
}

/* Interest Tags */
.interest-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.interest-tags span {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

/* Responsive Media Queries */
@media (max-width: 900px) {
  .about-layout {
    grid-template-columns: 1fr;
  }

  .about-info-section .page-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .about-cards {
    grid-template-columns: 1fr;
  }
}
</style>