<script setup lang="ts">
import { reactive, ref } from 'vue'
import heroImg from '~/assets/images/photo.jpg'

definePageMeta({
  layout: 'default'
})

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  isRead: boolean
}

// 1. FORM STATE
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})

const submitted = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const { data: contactDetails } = await useProfile()

function buildMailtoLink(name: string, email: string, subject: string, message: string) {
  const recipient = contactDetails.value?.email || 'danielzigabe5@gmail.com'
  const mailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    message
  ].join('\n')

  return `mailto:${recipient}?subject=${encodeURIComponent(subject || 'General Inquiry')}&body=${encodeURIComponent(mailBody)}`
}

// 3. REAL SUBMIT FUNCTION
async function submitForm() {
  errorMessage.value = ''

  const firstName = form.firstName.trim()
  const lastName = form.lastName.trim()
  const email = form.email.trim()
  const phone = form.phone.trim()
  const message = form.message.trim()
  const subject = `${firstName} ${lastName}`.trim() || 'General Inquiry'
  const name = `${firstName} ${lastName}`.trim()

  if (!firstName || !lastName || !email || !phone || !message) {
    errorMessage.value = 'Please fill out all required fields.'
    return
  }

  if (!emailPattern.test(email)) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  if (message.length < 10) {
    errorMessage.value = 'Your message should contain at least 10 characters.'
    return
  }

  loading.value = true

  try {
    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      createdAt: 'Just now',
      isRead: false
    }

    if (import.meta.client) {
      const existing = localStorage.getItem('portfolio_messages')
      let messageList: ContactMessage[] = []
      if (existing) {
        try {
          messageList = JSON.parse(existing)
        } catch {
          messageList = []
        }
      }
      messageList.unshift(newMessage)
      localStorage.setItem('portfolio_messages', JSON.stringify(messageList))
    }

    const config = useRuntimeConfig()
    if (config.public?.apiBase) {
      try {
        await $fetch('/messages', {
          baseURL: config.public.apiBase,
          method: 'POST',
          body: newMessage
        })
      } catch (apiErr) {
        console.warn('Backend API offline, saved to local session:', apiErr)
      }
    }

    if (import.meta.client) {
      window.location.href = buildMailtoLink(name, email, subject || 'General Inquiry', message)
    }

    await new Promise(resolve => setTimeout(resolve, 600))

    submitted.value = true

    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.phone = ''
    form.message = ''
  } catch (err: any) {
    errorMessage.value = err.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}

function resetFormView() {
  submitted.value = false
}
</script>

<template>
  <div class="contact-page">
   

    <main class="page-container contact-main">
      <section class="hero-row">
        <h1>
          If you need any<br>
          info please<br>
          contact<br>
          <span>us!</span>
        </h1>

        <p>
          We’re glad to work with you on your organization, so please contact us via the details below.
        </p>
      </section>

      <section class="contact-panel">
        <img
          class="contact-portrait"
          :src="heroImg"
          :alt="`${contactDetails.name} - ${contactDetails.role}`"
          loading="lazy"
        />

        <div class="form-shell">
          <div v-if="errorMessage" class="error-banner">
            ⚠️ {{ errorMessage }}
          </div>

          <div v-if="submitted" class="success-wrapper">
            <div class="success-message">
              <div class="success-icon">✓</div>
              <div>
                <strong>Message sent successfully!</strong>
                <p>Thank you for reaching out. I will get back to you soon.</p>
              </div>
            </div>
            <button type="button" class="another-button" @click="resetFormView">Send Another Message ↺</button>
          </div>

          <form v-else class="contact-form" @submit.prevent="submitForm">
            <div class="form-grid form-grid--two">
              <div class="field">
                <input id="firstName" v-model="form.firstName" type="text" placeholder="First name *" autocomplete="given-name" required />
              </div>
              <div class="field">
                <input id="lastName" v-model="form.lastName" type="text" placeholder="Last name *" autocomplete="family-name" required />
              </div>
            </div>

            <div class="form-grid form-grid--two">
              <div class="field">
                <input id="email" v-model="form.email" type="email" placeholder="Your mail *" autocomplete="email" maxlength="254" required />
              </div>
              <div class="field">
                <input id="phone" v-model="form.phone" type="tel" placeholder="Phone number *" autocomplete="tel" required />
              </div>
            </div>

            <div class="field">
              <textarea id="message" v-model="form.message" rows="6" maxlength="500" placeholder="Message..." required></textarea>
            </div>

            <button type="submit" class="send-button" :disabled="loading">
              <span v-if="!loading">→ Send now</span>
              <span v-else class="loading-content"><span class="spinner"></span>Sending...</span>
            </button>
          </form>
        </div>
      </section>

      <section class="info-strip">
        <div class="info-card">
          <div class="info-icon">📍</div>
          <div>
            <h3>Our office address:</h3>
            <p>{{ contactDetails.location }}</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">✉</div>
          <div>
            <h3>Mail us:</h3>
            <p><a :href="`mailto:${contactDetails.email}`">{{ contactDetails.email }}</a></p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">☎</div>
          <div>
            <h3>Call us:</h3>
            <p><a :href="`tel:${contactDetails.phone}`">{{ contactDetails.phone }}</a></p>
          </div>
        </div>
      </section>
    </main>

    <section class="map-section" aria-label="Map location">
      <iframe
        class="map-panel"
        title="Office location map"
        src="https://www.google.com/maps?q=Addis%20Ababa%2C%20Ethiopia&z=12&output=embed"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      ></iframe>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  --brand: #0ea5e9;
  --brand-dark: #0284c7;
  --brand-soft: #e0f2fe;
  --brand-soft-2: #bae6fd;
  --bg: #f0f5ff;
  --card: #ffffff;
  --panel: #ffffff;
  --text: #172e55;
  --muted: #526783;
  --line: #dce6f5;
  --field-border: #dce6f5;
  --success-bg: #e0f2fe;
  --success-border: #7dd3fc;
  --success-text: #075985;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: 'Segoe UI', sans-serif;
}

.page-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
}

.contact-header {
  background: var(--card);
  border-bottom: 1px solid var(--line);
}

.nav-shell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  min-height: 92px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 180px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--brand), var(--brand-dark));
  color: var(--card);
  font-weight: 900;
  box-shadow: 0 8px 20px rgba(244, 160, 29, 0.25);
}

.brand-copy {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.brand-copy span {
  color: var(--text);
  font-size: 1.1rem;
  font-weight: 900;
}

.brand-copy small {
  color: var(--muted);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.8rem, 1.8vw, 2rem);
  flex: 1;
  flex-wrap: wrap;
}

.nav-links a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 800;
  transition: color 180ms ease;
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--brand);
}

.nav-tools {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-button,
.menu-button {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 14px;
  background: var(--brand-soft-2);
  color: var(--text);
  font-size: 1.4rem;
  cursor: pointer;
}

.contact-main {
  padding-top: 34px;
}

.hero-row {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 32px;
  align-items: end;
  padding: 26px 0 20px;
}

.hero-row h1 {
  margin: 0;
  color: var(--text);
  font-size: clamp(3.2rem, 5.4vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.08em;
  font-weight: 900;
}

.hero-row h1 span {
  color: var(--brand);
}

.hero-row p {
  margin: 0;
  max-width: 500px;
  color: var(--muted);
  font-size: clamp(1.2rem, 1.7vw, 2rem);
  line-height: 1.45;
  font-weight: 500;
}

.contact-panel {
  display: grid;
  grid-template-columns: 1fr 1.08fr;
  gap: 34px;
  align-items: center;
  padding: 18px 0 20px;
}

.contact-portrait {
  display: block;
  width: 100%;
  height: 470px;
  border-radius: 34px;
  object-fit: cover;
  object-position: center 20%;
  box-shadow: 0 24px 55px rgba(23, 43, 77, 0.18);
}

.form-shell {
  padding: 24px 20px 18px;
  background: rgba(255, 255, 255, 0.38);
  border-radius: 18px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-grid--two {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.field {
  width: 100%;
}

.field input,
.field textarea {
  width: 100%;
  background: var(--card);
  border: 1px solid var(--field-border);
  border-radius: 12px;
  color: var(--text);
  font-size: 1rem;
  padding: 18px 18px;
  transition: border-color 180ms ease, box-shadow 180ms ease;
  outline: none;
  font-family: inherit;
}

.field textarea {
  min-height: 150px;
  resize: vertical;
}

.field input::placeholder,
.field textarea::placeholder {
  color: var(--muted);
}

.field input:focus,
.field textarea:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.12);
}

.send-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: none;
  border-radius: 14px;
  padding: 18px 26px;
  background: linear-gradient(135deg, var(--brand), var(--brand-dark));
  color: var(--card);
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 18px 30px rgba(14, 165, 233, 0.2);
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.send-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 20px 36px rgba(14, 165, 233, 0.25);
}

.send-button:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.loading-content {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-banner {
  margin-bottom: 16px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  color: #0369a1;
  font-size: 0.8rem;
  font-weight: 700;
}

.success-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.success-message {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 16px;
  background: var(--brand-soft);
  border: 1px solid var(--brand-soft-2);
  border-radius: 12px;
}

.success-icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--brand), var(--brand-dark));
  color: var(--card);
  font-weight: 900;
}

.success-message strong {
  display: block;
  color: var(--brand-dark);
  font-size: 0.95rem;
}

.success-message p {
  margin: 6px 0 0;
  color: var(--muted);
  line-height: 1.5;
  font-size: 0.82rem;
}

.another-button {
  padding: 12px 18px;
  border: 1px solid var(--field-border);
  border-radius: 10px;
  background: var(--card);
  color: var(--brand);
  font-weight: 800;
  cursor: pointer;
}

.info-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 30px;
  padding: 42px 0 32px;
  margin-top: 12px;
  border-top: 1px solid var(--line);
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 8px 0;
}

.info-icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 16px;
  background: var(--brand-soft);
  color: var(--brand);
  font-size: 1.5rem;
}

.info-card h3 {
  margin: 0 0 10px;
  color: var(--text);
  font-size: 1.1rem;
  font-weight: 900;
}

.info-card p,
.info-card a {
  margin: 0;
  color: var(--text);
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.7;
}

.map-section {
  width: 100%;
  margin-top: 12px;
  border-top: 1px solid var(--line);
}

.map-panel {
  display: block;
  width: 100%;
  height: 230px;
  border: none;
  background: var(--brand-soft);
}

@media (max-width: 980px) {
  .hero-row,
  .contact-panel,
  .info-strip {
    grid-template-columns: 1fr;
  }

  .hero-row {
    align-items: start;
  }

  .nav-links {
    display: none;
  }

  .contact-portrait {
    height: 360px;
  }
}

@media (max-width: 640px) {
  .page-container {
    padding: 0 20px;
  }

  .brand-copy {
    display: none;
  }

  .form-grid--two {
    grid-template-columns: 1fr;
  }

  .hero-row h1 {
    font-size: 3rem;
  }

  .hero-row p {
    font-size: 1.15rem;
  }

  .info-card {
    gap: 12px;
  }
}
</style>