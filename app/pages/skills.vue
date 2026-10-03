<script setup lang="ts">
const groups = [
  {
    title: 'Frontend Development',
    icon: '⌘',
    skills: [
      ['Nuxt.js', 90],
      ['Vue.js', 85],
      ['HTML / CSS', 95],
      ['Tailwind CSS', 90]
    ]
  },
  {
    title: 'Backend Development',
    icon: '↗',
    skills: [
      ['Laravel', 80],
      ['PHP', 75],
      ['MySQL', 80],
      ['REST API', 85]
    ]
  },
  {
    title: 'Mobile Development',
    icon: '⌕',
    skills: [
      ['Flutter', 80],
      ['Dart', 75]
    ]
  },
  {
    title: 'Tools & Others',
    icon: '⚙',
    skills: [
      ['Git / GitHub', 90],
      ['VS Code', 95],
      ['UI/UX Design', 75],
      ['Responsive Design', 90]
    ]
  }
]
</script>

<template>
  <div>
    <section class="page-header">
      <div class="page-container">
        <span>TECHNOLOGIES</span>
        <h1>My <strong>Skills</strong></h1>
        <p>Technologies and tools I work with.</p>
      </div>
    </section>

    <section class="skills-section">
      <div class="page-container skills-grid">
        <div
          v-for="group in groups"
          :key="group.title"
          class="skill-group"
        >
          <div class="skill-group-title">
            <div class="skill-group-icon">{{ group.icon }}</div>
            <h2>{{ group.title }}</h2>
          </div>

          <div
            v-for="skill in group.skills"
            :key="skill[0]"
            class="progress-item"
          >
            <div class="progress-top">
              <span>{{ skill[0] }}</span>
              <span>{{ skill[1] }}%</span>
            </div>

            <div class="progress-bar">
              <div
                class="progress-value"
                :style="{ width: `${skill[1]}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="page-container learning-box">
        <div class="learning-icon">&lt;/&gt;</div>
        <div>
          <h3>Always learning, always growing.</h3>
          <p>New technologies. Better solutions.</p>
        </div>
        <span>🚀</span>
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

/* ===== Skills Section ===== */
.skills-section {
  background: #f8fafc;
  padding: 80px 20px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 28px;
  margin-bottom: 50px;
}

/* ===== Skill Group ===== */
.skill-group {
  background: #ffffff;
  padding: 30px 32px;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.05);
  transition: 0.3s;
}

.skill-group:hover {
  transform: translateY(-4px);
  border-color: #42b883;
  box-shadow: 0 16px 40px rgba(66, 184, 131, 0.12);
}

.skill-group-title {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f1f5f9;
  position: relative;
}

.skill-group-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 60px;
  height: 2px;
  background: #42b883;
}

.skill-group-icon {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #42b883, #347474);
  color: #ffffff;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 6px 16px rgba(66, 184, 131, 0.3);
}

.skill-group-title h2 {
  color: #0f172a;
  font-size: 18px;
  font-weight: 800;
  margin: 0;
  line-height: 1.3;
}

/* ===== Progress Item ===== */
.progress-item {
  margin-bottom: 18px;
}

.progress-item:last-child {
  margin-bottom: 0;
}

.progress-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-top span:first-child {
  color: #334155;
  font-size: 14px;
  font-weight: 600;
}

.progress-top span:last-child {
  color: #42b883;
  font-size: 13px;
  font-weight: 800;
  background: rgba(66, 184, 131, 0.1);
  padding: 2px 10px;
  border-radius: 12px;
}

/* ===== Progress Bar ===== */
.progress-bar {
  width: 100%;
  height: 8px;
  background: #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.progress-value {
  height: 100%;
  background: linear-gradient(90deg, #42b883, #4fd19b);
  border-radius: 10px;
  transition: width 1.2s ease-in-out;
  position: relative;
  box-shadow: 0 0 8px rgba(66, 184, 131, 0.4);
}

.progress-value::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5));
  animation: shine 2s infinite;
}

@keyframes shine {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

/* ===== Learning Box ===== */
.learning-box {
  display: flex;
  align-items: center;
  gap: 24px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 32px 40px;
  border-radius: 20px;
  border: 1px solid #334155;
  position: relative;
  overflow: hidden;
}

.learning-box::before {
  content: '';
  position: absolute;
  top: -60px;
  right: -60px;
  width: 220px;
  height: 220px;
  background: radial-gradient(circle, rgba(66, 184, 131, 0.15), transparent 70%);
  border-radius: 50%;
}

.learning-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #42b883, #347474);
  color: #ffffff;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 800;
  font-family: 'Courier New', monospace;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(66, 184, 131, 0.35);
}

.learning-box div:nth-child(2) {
  flex: 1;
  position: relative;
  z-index: 1;
}

.learning-box h3 {
  color: #ffffff;
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 4px;
}

.learning-box p {
  color: #94a3b8;
  font-size: 14px;
  margin: 0;
}

.learning-box > span {
  font-size: 40px;
  position: relative;
  z-index: 1;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .page-header h1 {
    font-size: 38px;
  }
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 22px;
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
  .skills-section {
    padding: 50px 16px;
  }
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .skill-group {
    padding: 24px 22px;
  }
  .skill-group-icon {
    width: 40px;
    height: 40px;
    font-size: 17px;
  }
  .skill-group-title h2 {
    font-size: 16px;
  }
  .learning-box {
    flex-direction: column;
    text-align: center;
    padding: 28px 22px;
    gap: 16px;
  }
  .learning-box h3 {
    font-size: 17px;
  }
  .learning-box > span {
    font-size: 32px;
  }
}
</style>