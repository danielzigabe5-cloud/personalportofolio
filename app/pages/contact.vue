<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

function submitForm() {
  alert('Thank you! Your message has been sent.')
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}
</script>

<template>
  <div>
    <section class="page-header">
      <div class="page-container">
        <span>GET IN TOUCH</span>
        <h1>Contact <strong>Me</strong></h1>
        <p>Let's discuss your next project.</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="page-container contact-layout">

        <!-- LEFT -->
        <div class="contact-left">
          <span class="green-label">CONTACT</span>
          <h2>
            Let's build something
            <strong>great together.</strong>
          </h2>
          <p>
            I'm always open to new opportunities,
            collaborations and interesting projects.
          </p>

          <div class="contact-details">
            <div class="contact-detail">
              <div class="contact-icon">✉</div>
              <div>
                <span>Email</span>
                <a href="mailto:danielzigabe5@gmail.com">danielzigabe5@gmail.com</a>
              </div>
            </div>

            <div class="contact-detail">
              <div class="contact-icon">☎</div>
              <div>
                <span>Phone</span>
                <a href="tel:+251900000000">+251 0945800348</a>
              </div>
            </div>

            <div class="contact-detail">
              <div class="contact-icon">📍</div>
              <div>
                <span>Location</span>
                <strong>Ethiopia</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT FORM -->
        <form class="contact-form" @submit.prevent="submitForm">
          <label>Your Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Enter your name"
            required
          />

          <label>Your Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <label>Subject</label>
          <input
            v-model="form.subject"
            type="text"
            placeholder="Enter subject"
            required
          />

          <label>Your Message</label>
          <textarea
            v-model="form.message"
            rows="6"
            placeholder="Write your message..."
            required
          ></textarea>

          <button type="submit" class="send-button">
            Send Message →
          </button>
        </form>

      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== Base ===== */
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

/* ===== Contact Section ===== */
.contact-section {
  background: #f8fafc;
  padding: 80px 20px;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  align-items: start;
}

/* ===== LEFT ===== */
.contact-left {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.green-label {
  display: inline-block;
  color: #42b883;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.contact-left h2 {
  font-size: 36px;
  font-weight: 800;
  line-height: 1.25;
  color: #0f172a;
  margin: 0;
}

.contact-left h2 strong {
  color: #42b883;
  display: block;
}

.contact-left > p {
  color: #64748b;
  font-size: 16px;
  line-height: 1.7;
  margin: 0 0 12px;
}

/* ===== Contact Details ===== */
.contact-details {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 10px;
}

.contact-detail {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #ffffff;
  padding: 18px 20px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  transition: 0.3s;
}

.contact-detail:hover {
  border-color: #42b883;
  transform: translateX(6px);
  box-shadow: 0 8px 24px rgba(66, 184, 131, 0.12);
}

.contact-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #42b883, #347474);
  color: #fff;
  border-radius: 12px;
  font-size: 20px;
  flex-shrink: 0;
}

.contact-detail div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.contact-detail span {
  color: #94a3b8;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.contact-detail a,
.contact-detail strong {
  color: #0f172a;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.25s;
}

.contact-detail a:hover {
  color: #42b883;
}

/* ===== FORM ===== */
.contact-form {
  background: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #e2e8f0;
}

.contact-form label {
  color: #0f172a;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 10px;
  margin-bottom: 6px;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  color: #0f172a;
  background: #f8fafc;
  transition: 0.25s;
  outline: none;
  resize: vertical;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: #94a3b8;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: #42b883;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(66, 184, 131, 0.12);
}

/* ===== Send Button ===== */
.send-button {
  margin-top: 20px;
  padding: 16px 28px;
  background: linear-gradient(135deg, #42b883, #347474);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 8px 20px rgba(66, 184, 131, 0.35);
  letter-spacing: 0.5px;
}

.send-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(66, 184, 131, 0.45);
  background: linear-gradient(135deg, #4fd19b, #3a8585);
}

.send-button:active {
  transform: translateY(-1px);
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .page-header h1 {
    font-size: 38px;
  }
  .contact-left h2 {
    font-size: 28px;
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
  .contact-section {
    padding: 50px 16px;
  }
  .contact-form {
    padding: 28px 22px;
  }
  .contact-left h2 {
    font-size: 24px;
  }
  .contact-detail {
    padding: 14px 16px;
  }
  .contact-icon {
    width: 42px;
    height: 42px;
    font-size: 17px;
  }
}
</style>