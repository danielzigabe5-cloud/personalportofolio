<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const university = {
  date: '2023 — Present',
  name: 'Mekdela Amba University',
  degree: "Bachelor's Degree in Computer Science",
  location: 'Tulu Awliya Campus, Ethiopia',
  description:
    "Currently pursuing a Bachelor's degree in Computer Science, developing knowledge and practical skills in software development, web technologies, databases, and computer systems."
}

const courses = [
  'Data Structures & Algorithms',
  'Database Systems',
  'Web Development',
  'Software Engineering',
  'Computer Networks'
]

const certifications = [
  'Responsive Web Design',
  'JavaScript Algorithms',
  'Introduction to Laravel',
  'Web Development'
]

const learning = {
  title: 'Turning Academic Knowledge Into Practical Skills',
  description:
    'My education has helped me build a strong foundation in computer science while giving me the opportunity to apply theoretical knowledge to real-world software development projects.',
  tags: [
    'Web Development',
    'Software Engineering',
    'Database Systems',
    'Problem Solving'
  ]
}

const quote =
  "Education is not just about learning; it's about building a better future."
</script>

<template>
  <div class="education-page">

    <!-- HEADER -->
    <section class="page-header">
      <div class="page-container">
        <span class="eyebrow">MY ACADEMIC BACKGROUND</span>

        <h1>
          My <strong>Education</strong>
        </h1>

        <p>
          My academic journey, technical learning, and educational background.
        </p>
      </div>
    </section>

    <!-- EDUCATION -->
    <section class="education-section">
      <div class="page-container">

        <!-- UNIVERSITY -->
        <div class="university-card">

          <div class="university-icon">
            🎓
          </div>

          <div class="university-content">
            <span class="education-date">
              {{ university.date }}
            </span>

            <h2>
              {{ university.name }}
            </h2>

            <h3>
              {{ university.degree }}
            </h3>

            <p class="location">
              📍 {{ university.location }}
            </p>

            <p class="description">
              {{ university.description }}
            </p>
          </div>

        </div>

        <!-- GRID -->
        <div class="education-grid">

          <!-- COURSES -->
          <div class="education-list">

            <div class="section-title">
              <div class="title-icon">📚</div>

              <div>
                <span>ACADEMIC</span>
                <h2>Relevant Courses</h2>
              </div>
            </div>

            <ul>
              <li
                v-for="course in courses"
                :key="course"
              >
                <span class="check">✓</span>
                <span>{{ course }}</span>
              </li>
            </ul>

          </div>

          <!-- CERTIFICATIONS -->
          <div class="education-list">

            <div class="section-title">
              <div class="title-icon">🏆</div>

              <div>
                <span>PROFESSIONAL</span>
                <h2>Certifications</h2>
              </div>
            </div>

            <ul>
              <li
                v-for="cert in certifications"
                :key="cert"
              >
                <span class="check">✓</span>
                <span>{{ cert }}</span>
              </li>
            </ul>

          </div>

        </div>

        <!-- LEARNING -->
        <div class="learning-card">

          <div class="learning-icon">
            💡
          </div>

          <div class="learning-content">
            <span>MY LEARNING FOCUS</span>

            <h2>
              {{ learning.title }}
            </h2>

            <p>
              {{ learning.description }}
            </p>

            <div class="learning-tags">
              <span
                v-for="tag in learning.tags"
                :key="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>

        </div>

        <!-- QUOTE -->
        <div class="education-quote">

          <span class="quote-mark">“</span>

          <p>
            {{ quote }}
          </p>

          <div class="quote-line"></div>

        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
.education-page {
  min-height: 100vh;
  background: #ffffff;
}

/* CONTAINER */

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

.eyebrow {
  display: inline-block;
  margin-bottom: 14px;
  color: #2563eb;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 3px;
}

.page-header h1 {
  margin: 0 0 14px;
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

/* SECTION */

.education-section {
  padding: 80px 20px;
  background: #f8fafc;
}

/* UNIVERSITY */

.university-card {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  margin-bottom: 45px;
  padding: 38px 42px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  box-shadow: 0 12px 35px rgba(15, 23, 42, 0.06);
  transition: 0.3s ease;
}

.university-card:hover {
  transform: translateY(-5px);
  border-color: #93c5fd;
  box-shadow: 0 20px 45px rgba(37, 99, 235, 0.10);
}

.university-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 18px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  font-size: 38px;
}

.university-content {
  flex: 1;
}

.education-date {
  display: inline-block;
  margin-bottom: 10px;
  padding: 6px 13px;
  border-radius: 20px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.university-card h2 {
  margin: 0 0 7px;
  color: #0f172a;
  font-size: 27px;
}

.university-card h3 {
  margin: 0 0 10px;
  color: #2563eb;
  font-size: 17px;
}

.location {
  margin: 0 0 14px;
  color: #64748b;
  font-size: 14px;
}

.description {
  max-width: 800px;
  margin: 0;
  color: #64748b;
  line-height: 1.75;
}

/* GRID */

.education-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin-bottom: 45px;
}

.education-list {
  padding: 30px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(15, 23, 42, 0.05);
  transition: 0.3s ease;
}

.education-list:hover {
  transform: translateY(-4px);
  border-color: #93c5fd;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 25px;
}

.title-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  background: #eff6ff;
  font-size: 22px;
}

.section-title span {
  display: block;
  margin-bottom: 3px;
  color: #2563eb;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
}

.section-title h2 {
  margin: 0;
  color: #0f172a;
  font-size: 21px;
}

.education-list ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.education-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #f8fafc;
  color: #334155;
  font-size: 14px;
  font-weight: 600;
  transition: 0.25s ease;
}

.education-list li:hover {
  color: #2563eb;
  background: #eff6ff;
  transform: translateX(4px);
}

.check {
  width: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: #dbeafe;
  color: #2563eb;
  font-size: 11px;
  font-weight: 900;
}

/* LEARNING */

.learning-card {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-bottom: 45px;
  padding: 38px 42px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.05);
}

.learning-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 18px;
  background: #eff6ff;
  font-size: 32px;
}

.learning-content {
  flex: 1;
}

.learning-content > span {
  display: block;
  margin-bottom: 6px;
  color: #2563eb;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
}

.learning-content h2 {
  margin: 0 0 10px;
  color: #0f172a;
  font-size: 23px;
}

.learning-content p {
  max-width: 850px;
  margin: 0 0 18px;
  color: #64748b;
  line-height: 1.7;
}

.learning-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.learning-tags span {
  padding: 7px 12px;
  border-radius: 20px;
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
  font-size: 12px;
  font-weight: 700;
}

/* QUOTE */

.education-quote {
  padding: 50px 60px;
  text-align: center;
  background: linear-gradient(
    135deg,
    #eff6ff,
    #ffffff
  );
  border: 1px solid #bfdbfe;
  border-radius: 20px;
}

.quote-mark {
  display: block;
  margin-bottom: 15px;
  color: #2563eb;
  font-family: Georgia, serif;
  font-size: 75px;
  line-height: 0.5;
}

.education-quote p {
  max-width: 800px;
  margin: 0 auto 20px;
  color: #334155;
  font-size: 21px;
  font-style: italic;
  line-height: 1.6;
}

.quote-line {
  width: 50px;
  height: 3px;
  margin: 0 auto;
  border-radius: 10px;
  background: #2563eb;
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .education-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 42px;
  }
}

@media (max-width: 600px) {
  .page-header {
    padding: 60px 16px 45px;
  }

  .page-header h1 {
    font-size: 34px;
  }

  .education-section {
    padding: 50px 16px;
  }

  .university-card {
    flex-direction: column;
    padding: 25px 22px;
  }

  .learning-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 26px 22px;
  }

  .education-quote {
    padding: 35px 22px;
  }

  .education-quote p {
    font-size: 17px;
  }
}
</style>