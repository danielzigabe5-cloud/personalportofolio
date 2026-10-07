<script setup lang="ts">

definePageMeta({
  layout: 'default'
})

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: '🎨',
    skills: [
      { name: 'Vue.js', level: 90 },
      { name: 'Nuxt.js', level: 90 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'JavaScript', level: 85 }
    ]
  },

  {
    title: 'Backend Development',
    icon: '⚙️',
    skills: [
      { name: 'Laravel', level: 85 },
      { name: 'PHP', level: 85 },
      { name: 'MySQL', level: 85 },
      { name: 'REST API', level: 85 },
      { name: 'Postman', level: 80 }
    ]
  },

  {
    title: 'Mobile Development',
    icon: '📱',
    skills: [
      { name: 'Flutter', level: 80 },
      { name: 'Dart', level: 80 },
      { name: 'REST API Integration', level: 80 }
    ]
  },

  {
    title: 'Tools & Technologies',
    icon: '🛠️',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 85 },
      { name: 'Docker', level: 75 },
      { name: 'Figma', level: 80 },
      { name: 'Trello', level: 80 }
    ]
  }
]

</script>


<template>

  <div class="skills-page">

    <!-- =========================================
          PAGE HEADER
    ========================================== -->

    <section class="page-header">

      <div class="page-container">

        <span class="eyebrow">
          MY EXPERTISE
        </span>

        <h1>
          My <strong>Skills</strong>
        </h1>

        <p>
          Technologies and tools I use to build modern applications.
        </p>

      </div>

    </section>


    <!-- =========================================
          SKILLS SECTION
    ========================================== -->

    <section class="skills-section">

      <div class="page-container">

        <div class="skills-grid">

          <article
            v-for="category in skillCategories"
            :key="category.title"
            class="skill-card"
          >

            <!-- CATEGORY HEADER -->

            <div class="skill-card-header">

              <div class="skill-icon">
                {{ category.icon }}
              </div>

              <h2>
                {{ category.title }}
              </h2>

            </div>


            <!-- SKILLS -->

            <div class="skills-list">

              <div
                v-for="skill in category.skills"
                :key="skill.name"
                class="skill-item"
              >

                <div class="skill-info">

                  <span class="skill-name">
                    {{ skill.name }}
                  </span>

                  <span class="skill-percentage">
                    {{ skill.level }}%
                  </span>

                </div>


                <div class="progress-background">

                  <div
                    class="progress-bar"
                    :style="{ width: `${skill.level}%` }"
                  ></div>

                </div>

              </div>

            </div>

          </article>

        </div>


        <!-- =========================================
              TECHNOLOGY SUMMARY
        ========================================== -->

        <div class="technology-summary">

          <div class="summary-content">

            <span class="summary-label">
              TECHNOLOGY STACK
            </span>

            <h2>
              Building with
              <strong>Modern Technologies</strong>
            </h2>

            <p>
              I work with modern frontend, backend and mobile
              technologies to create responsive, scalable and
              user-friendly applications.
            </p>

          </div>


          <div class="summary-badge">

            <span>🚀</span>

            <strong>
              Full Stack Developer
            </strong>

          </div>

        </div>

      </div>

    </section>

  </div>

</template>


<style scoped>

/* =====================================================
   COLOR SYSTEM (LIGHT / WHITE THEME)
===================================================== */

/*
  Main Background:
  #FFFFFF (Pure White)

  Section Header / Elevated Card:
  #F8FAFC (Slate 50)

  Text Dark Primary:
  #0F172A (Slate 900)

  Text Muted / Body:
  #475569 (Slate 600)

  Primary Blue:
  #2563EB (Blue 600)

  Accent Blue Light:
  #EFF6FF (Blue 50) / #DBEAFE (Blue 100)

  Border:
  #E2E8F0 (Slate 200)
*/


/* =====================================================
   BASE
===================================================== */

.skills-page {
  min-height: 100vh;
  background-color: #FFFFFF;
  color: #0F172A;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}


/* =====================================================
   PAGE HEADER
===================================================== */

.page-header {
  background: linear-gradient(
    180deg,
    #F8FAFC 0%,
    #FFFFFF 100%
  );
  padding: 80px 20px 50px;
  text-align: center;
  border-bottom: 1px solid #E2E8F0;
}


/* =====================================================
   EYEBROW
===================================================== */

.page-header .eyebrow {
  display: inline-block;
  color: #2563EB;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 12px;
}


/* =====================================================
   MAIN TITLE
===================================================== */

.page-header h1 {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 14px;
  color: #0F172A;
}

.page-header h1 strong {
  color: #2563EB;
}


/* =====================================================
   HEADER DESCRIPTION
===================================================== */

.page-header p {
  color: #475569;
  font-size: 17px;
  line-height: 1.6;
  margin: 0;
}


/* =====================================================
   SKILLS SECTION
===================================================== */

.skills-section {
  background-color: #FFFFFF;
  padding: 60px 20px 80px;
}


/* =====================================================
   GRID
===================================================== */

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
}


/* =====================================================
   SKILL CARD
===================================================== */

.skill-card {
  background-color: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}


/* =====================================================
   CARD HOVER
===================================================== */

.skill-card:hover {
  transform: translateY(-6px);
  border-color: #93C5FD;
  box-shadow: 0 16px 32px rgba(37, 99, 235, 0.08);
}


/* =====================================================
   CARD HEADER
===================================================== */

.skill-card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 22px;
  margin-bottom: 22px;
  border-bottom: 1px solid #F1F5F9;
}


/* =====================================================
   SKILL ICON
===================================================== */

.skill-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: #EFF6FF;
  border: 1px solid #DBEAFE;
  font-size: 24px;
}


/* =====================================================
   CATEGORY TITLE
===================================================== */

.skill-card-header h2 {
  color: #0F172A;
  font-size: 20px;
  font-weight: 800;
  margin: 0;
}


/* =====================================================
   SKILLS LIST
===================================================== */

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skill-item {
  width: 100%;
}


/* =====================================================
   SKILL INFO
===================================================== */

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}


/* =====================================================
   SKILL NAME
===================================================== */

.skill-name {
  color: #1E293B;
  font-size: 14px;
  font-weight: 600;
}


/* =====================================================
   PERCENTAGE
===================================================== */

.skill-percentage {
  color: #2563EB;
  font-size: 13px;
  font-weight: 700;
}


/* =====================================================
   PROGRESS BACKGROUND
===================================================== */

.progress-background {
  width: 100%;
  height: 8px;
  background-color: #F1F5F9;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #E2E8F0;
}


/* =====================================================
   PROGRESS BAR
===================================================== */

.progress-bar {
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(
    90deg,
    #2563EB,
    #3B82F6
  );
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.25);
  transition: width 1s ease;
}


/* =====================================================
   TECHNOLOGY SUMMARY
===================================================== */

.technology-summary {
  margin-top: 50px;
  padding: 36px;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    #EFF6FF 0%,
    #F8FAFC 100%
  );
  border: 1px solid #DBEAFE;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.04);
}


/* =====================================================
   SUMMARY CONTENT
===================================================== */

.summary-content {
  max-width: 750px;
}


/* =====================================================
   SUMMARY LABEL
===================================================== */

.summary-label {
  display: inline-block;
  color: #2563EB;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 10px;
}


/* =====================================================
   SUMMARY TITLE
===================================================== */

.summary-content h2 {
  color: #0F172A;
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 10px;
}

.summary-content h2 strong {
  color: #2563EB;
}


/* =====================================================
   SUMMARY DESCRIPTION
===================================================== */

.summary-content p {
  color: #475569;
  font-size: 15px;
  line-height: 1.7;
  margin: 0;
}


/* =====================================================
   SUMMARY BADGE
===================================================== */

.summary-badge {
  min-width: 210px;
  padding: 18px 22px;
  border-radius: 14px;
  background-color: #FFFFFF;
  border: 1px solid #BFDBFE;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #1D4ED8;
  white-space: nowrap;
}

.summary-badge span {
  font-size: 22px;
}

.summary-badge strong {
  font-size: 13px;
  color: #1D4ED8;
}


/* =====================================================
   TABLET
===================================================== */

@media (max-width: 900px) {
  .page-header h1 {
    font-size: 38px;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .technology-summary {
    flex-direction: column;
    align-items: flex-start;
  }

  .summary-badge {
    width: 100%;
  }
}


/* =====================================================
   MOBILE
===================================================== */

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

  .skills-section {
    padding: 40px 16px;
  }

  .skills-grid {
    gap: 20px;
  }

  .skill-card {
    padding: 22px;
  }

  .skill-card-header h2 {
    font-size: 18px;
  }

  .technology-summary {
    padding: 24px;
    margin-top: 35px;
  }

  .summary-content h2 {
    font-size: 22px;
  }

  .summary-content p {
    font-size: 14px;
  }
}

</style>