```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitted = ref(false)
const loading = ref(false)

async function submitForm() {
  loading.value = true

  // Simulate sending
  await new Promise(resolve => setTimeout(resolve, 900))

  submitted.value = true
  loading.value = false

  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''

  setTimeout(() => {
    submitted.value = false
  }, 5000)
}
</script>

<template>
  <div class="contact-page">

    <!-- =====================================================
         HERO
    ====================================================== -->

    <section class="page-header">

      <div class="page-container hero-content">

        <span class="eyebrow">
          GET IN TOUCH
        </span>

        <h1>
          Let's start a
          <span>conversation.</span>
        </h1>

        <p>
          Have a project, opportunity or idea in mind?
          I'd love to hear from you.
        </p>

      </div>

    </section>


    <!-- =====================================================
         CONTACT CONTENT
    ====================================================== -->

    <section class="contact-section">

      <div class="page-container contact-layout">

        <!-- =================================================
             LEFT SIDE
        ================================================== -->

        <div class="contact-info">

          <span class="section-label">
            CONTACT ME
          </span>

          <h2>
            Let's build something
            <span>meaningful together.</span>
          </h2>

          <p class="intro-text">
            I'm open to internship opportunities, freelance projects,
            collaborations and interesting ideas. Feel free to reach
            out and I'll get back to you as soon as possible.
          </p>


          <!-- CONTACT ITEMS -->

          <div class="contact-items">

            <!-- EMAIL -->

            <a
              href="mailto:danielzigabe5@gmail.com"
              class="contact-item"
            >

              <div class="contact-icon">
                ✉
              </div>

              <div class="contact-item-content">

                <span>
                  EMAIL
                </span>

                <strong>
                  danielzigabe5@gmail.com
                </strong>

              </div>

              <span class="item-arrow">
                →
              </span>

            </a>


            <!-- PHONE -->

            <a
              href="tel:+251945800348"
              class="contact-item"
            >

              <div class="contact-icon">
                ☎
              </div>

              <div class="contact-item-content">

                <span>
                  PHONE
                </span>

                <strong>
                  +251 945 800 348
                </strong>

              </div>

              <span class="item-arrow">
                →
              </span>

            </a>


            <!-- LOCATION -->

            <div class="contact-item">

              <div class="contact-icon">
                📍
              </div>

              <div class="contact-item-content">

                <span>
                  LOCATION
                </span>

                <strong>
                  Ethiopia
                </strong>

              </div>

            </div>

          </div>


          <!-- AVAILABILITY -->

          <div class="availability">

            <span class="availability-dot"></span>

            <div>
              <strong>
                Available for opportunities
              </strong>

              <p>
                Open to internships, collaborations and projects.
              </p>
            </div>

          </div>


          <!-- SOCIAL -->

          <div class="social-section">

            <span>
              FIND ME ONLINE
            </span>

            <div class="social-links">

              <a
                href="#"
                aria-label="GitHub"
              >
                GitHub
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>

              <a
                href="#"
                aria-label="Telegram"
              >
                Telegram
              </a>

            </div>

          </div>

        </div>


        <!-- =================================================
             FORM
        ================================================== -->

        <div class="form-wrapper">

          <div class="form-header">

            <span class="form-number">
              01
            </span>

            <div>
              <h3>
                Send me a message
              </h3>

              <p>
                Fill out the form and I'll get back to you.
              </p>
            </div>

          </div>


          <!-- SUCCESS -->

          <div
            v-if="submitted"
            class="success-message"
          >

            <div class="success-icon">
              ✓
            </div>

            <div>
              <strong>
                Message sent successfully!
              </strong>

              <p>
                Thank you for reaching out. I'll get back to you soon.
              </p>
            </div>

          </div>


          <!-- FORM -->

          <form
            v-else
            class="contact-form"
            @submit.prevent="submitForm"
          >

            <!-- NAME + EMAIL -->

            <div class="form-row">

              <div class="field">

                <label for="name">
                  Your Name
                </label>

                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="John Doe"
                  autocomplete="name"
                  required
                />

              </div>


              <div class="field">

                <label for="email">
                  Email Address
                </label>

                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="john@example.com"
                  autocomplete="email"
                  required
                />

              </div>

            </div>


            <!-- SUBJECT -->

            <div class="field">

              <label for="subject">
                Subject
              </label>

              <input
                id="subject"
                v-model="form.subject"
                type="text"
                placeholder="What would you like to discuss?"
                required
              />

            </div>


            <!-- MESSAGE -->

            <div class="field">

              <div class="message-label">

                <label for="message">
                  Message
                </label>

                <span>
                  {{ form.message.length }}/500
                </span>

              </div>

              <textarea
                id="message"
                v-model="form.message"
                rows="7"
                maxlength="500"
                placeholder="Tell me a little about your project or idea..."
                required
              ></textarea>

            </div>


            <!-- SUBMIT -->

            <button
              type="submit"
              class="send-button"
              :disabled="loading"
            >

              <span v-if="!loading">
                Send Message
              </span>

              <span v-else class="loading-content">
                <span class="spinner"></span>
                Sending...
              </span>

              <span v-if="!loading">
                →
              </span>

            </button>


            <p class="form-note">
              By sending this message, you agree that I can contact
              you regarding your inquiry.
            </p>

          </form>

        </div>

      </div>

    </section>


    <!-- =====================================================
         BOTTOM CTA
    ====================================================== -->

    <section class="bottom-section">

      <div class="page-container">

        <div class="bottom-box">

          <div>

            <span>
              HAVE A PROJECT IN MIND?
            </span>

            <h2>
              Let's turn your idea into
              <strong>reality.</strong>
            </h2>

          </div>

          <a
            href="mailto:danielzigabe5@gmail.com"
            class="email-button"
          >
            Email Me
            <span>↗</span>
          </a>

        </div>

      </div>

    </section>

  </div>
</template>


<style scoped>

/* =========================================================
   BASE
========================================================= */

.contact-page {
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
  padding: 110px 20px 95px;

  background:
    radial-gradient(
      circle at 20% 20%,
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
  text-align: center;
}

.eyebrow,
.section-label {
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
  max-width: 650px;
  margin: 0 auto;

  color: #64748b;

  font-size: 17px;
  line-height: 1.8;
}


/* =========================================================
   CONTACT SECTION
========================================================= */

.contact-section {
  padding: 105px 20px;

  background: #ffffff;
}

.contact-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 85px;
  align-items: start;
}


/* =========================================================
   CONTACT INFO
========================================================= */

.contact-info {
  max-width: 540px;
}

.contact-info h2 {
  margin: 15px 0 22px;

  color: #0f172a;

  font-size: 42px;
  line-height: 1.18;
  font-weight: 900;
  letter-spacing: -1px;
}

.contact-info h2 span {
  color: #2563eb;
}

.intro-text {
  margin-bottom: 32px;

  color: #64748b;

  font-size: 15px;
  line-height: 1.85;
}


/* =========================================================
   CONTACT ITEMS
========================================================= */

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 15px;

  padding: 17px;

  background: #ffffff;

  border: 1px solid #e2e8f0;
  border-radius: 14px;

  text-decoration: none;

  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.contact-item:hover {
  transform: translateX(5px);

  border-color: #bfdbfe;

  box-shadow:
    0 12px 30px rgba(15, 23, 42, 0.07);
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 45px;
  height: 45px;

  flex-shrink: 0;

  border-radius: 12px;

  background: #eff6ff;

  color: #2563eb;

  font-size: 18px;
}

.contact-item-content {
  display: flex;
  flex-direction: column;
  gap: 4px;

  min-width: 0;
}

.contact-item-content span {
  color: #94a3b8;

  font-size: 9px;
  font-weight: 900;
  letter-spacing: 1.5px;
}

.contact-item-content strong {
  overflow: hidden;

  color: #0f172a;

  font-size: 13px;
  font-weight: 800;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-arrow {
  margin-left: auto;

  color: #94a3b8;

  font-size: 18px;

  transition: 0.25s;
}

.contact-item:hover .item-arrow {
  color: #2563eb;
  transform: translateX(3px);
}


/* =========================================================
   AVAILABILITY
========================================================= */

.availability {
  display: flex;
  align-items: center;
  gap: 12px;

  margin-top: 28px;
  padding: 15px 17px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;
  border-radius: 13px;
}

.availability-dot {
  width: 9px;
  height: 9px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #22c55e;

  box-shadow:
    0 0 0 4px rgba(34, 197, 94, 0.12);
}

.availability strong {
  display: block;

  color: #334155;

  font-size: 12px;
  font-weight: 800;
}

.availability p {
  margin-top: 3px;

  color: #94a3b8;

  font-size: 11px;
}


/* =========================================================
   SOCIAL
========================================================= */

.social-section {
  margin-top: 30px;
}

.social-section > span {
  color: #94a3b8;

  font-size: 9px;
  font-weight: 900;
  letter-spacing: 2px;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;

  margin-top: 12px;
}

.social-links a {
  padding: 8px 13px;

  color: #475569;

  background: #ffffff;

  border: 1px solid #e2e8f0;
  border-radius: 8px;

  font-size: 11px;
  font-weight: 800;

  text-decoration: none;

  transition: 0.25s;
}

.social-links a:hover {
  color: #2563eb;

  border-color: #bfdbfe;

  background: #eff6ff;
}


/* =========================================================
   FORM WRAPPER
========================================================= */

.form-wrapper {
  padding: 36px;

  background: #ffffff;

  border: 1px solid #e2e8f0;
  border-radius: 22px;

  box-shadow:
    0 20px 55px rgba(15, 23, 42, 0.08);
}

.form-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;

  padding-bottom: 25px;

  border-bottom: 1px solid #e2e8f0;
}

.form-number {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  flex-shrink: 0;

  border-radius: 10px;

  background: #eff6ff;

  color: #2563eb;

  font-size: 11px;
  font-weight: 900;
}

.form-header h3 {
  color: #0f172a;

  font-size: 20px;
  font-weight: 900;
}

.form-header p {
  margin-top: 4px;

  color: #94a3b8;

  font-size: 12px;
}


/* =========================================================
   FORM
========================================================= */

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 18px;

  padding-top: 25px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field label,
.message-label label {
  color: #334155;

  font-size: 11px;
  font-weight: 900;

  letter-spacing: 0.8px;
}

.message-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.message-label span {
  color: #94a3b8;

  font-size: 10px;
}

.contact-form input,
.contact-form textarea {
  width: 100%;

  padding: 13px 14px;

  color: #0f172a;

  background: #f8fafc;

  border: 1px solid #dbe3ec;
  border-radius: 10px;

  outline: none;

  font-family: inherit;
  font-size: 13px;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.contact-form textarea {
  min-height: 145px;
  resize: vertical;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: #a1adbd;
}

.contact-form input:focus,
.contact-form textarea:focus {
  background: #ffffff;

  border-color: #60a5fa;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.09);
}


/* =========================================================
   SEND BUTTON
========================================================= */

.send-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  width: 100%;

  margin-top: 3px;
  padding: 14px 20px;

  border: none;
  border-radius: 11px;

  background: #2563eb;

  color: #ffffff;

  font-size: 13px;
  font-weight: 900;

  cursor: pointer;

  transition:
    background 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.send-button:hover:not(:disabled) {
  background: #1d4ed8;

  transform: translateY(-2px);

  box-shadow:
    0 12px 25px rgba(37, 99, 235, 0.25);
}

.send-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-content {
  display: flex;
  align-items: center;
  gap: 9px;
}

.spinner {
  width: 14px;
  height: 14px;

  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #ffffff;

  border-radius: 50%;

  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.form-note {
  color: #94a3b8;

  font-size: 10px;
  line-height: 1.6;

  text-align: center;
}


/* =========================================================
   SUCCESS MESSAGE
========================================================= */

.success-message {
  display: flex;
  align-items: flex-start;
  gap: 14px;

  margin-top: 25px;
  padding: 20px;

  background: #f0fdf4;

  border: 1px solid #bbf7d0;
  border-radius: 13px;
}

.success-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #22c55e;

  color: #ffffff;

  font-weight: 900;
}

.success-message strong {
  color: #166534;

  font-size: 13px;
}

.success-message p {
  margin-top: 4px;

  color: #4d7c5b;

  font-size: 11px;
  line-height: 1.6;
}


/* =========================================================
   BOTTOM CTA
========================================================= */

.bottom-section {
  padding: 20px 20px 100px;

  background: #ffffff;
}

.bottom-box {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 30px;

  padding: 45px;

  background: #0f172a;

  border-radius: 22px;

  box-shadow:
    0 25px 60px rgba(15, 23, 42, 0.15);
}

.bottom-box > div > span {
  color: #60a5fa;

  font-size: 10px;
  font-weight: 900;

  letter-spacing: 2px;
}

.bottom-box h2 {
  max-width: 600px;

  margin-top: 10px;

  color: #ffffff;

  font-size: 30px;
  line-height: 1.25;
  font-weight: 900;
}

.bottom-box h2 strong {
  color: #60a5fa;
}

.email-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  flex-shrink: 0;

  padding: 13px 20px;

  border-radius: 10px;

  background: #2563eb;

  color: #ffffff;

  font-size: 12px;
  font-weight: 900;

  text-decoration: none;

  transition: 0.25s;
}

.email-button:hover {
  background: #3b82f6;

  transform: translateY(-2px);
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 950px) {

  .contact-layout {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .contact-info {
    max-width: 750px;
  }

  .form-wrapper {
    max-width: 750px;
  }

  .bottom-box {
    align-items: flex-start;
    flex-direction: column;
  }

}


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

  .contact-section {
    padding: 75px 16px;
  }

  .contact-info h2 {
    font-size: 31px;
  }

  .form-wrapper {
    padding: 25px 20px;
    border-radius: 17px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .bottom-section {
    padding: 10px 16px 70px;
  }

  .bottom-box {
    padding: 30px 24px;
    border-radius: 18px;
  }

  .bottom-box h2 {
    font-size: 26px;
  }

  .email-button {
    width: 100%;
    justify-content: center;
  }

}
</style>
```