<template>
  <footer class="site-footer">
    <div class="footer-container">

      <!-- Brand -->
      <div class="footer-brand">
        <NuxtLink to="/" class="footer-logo">
          <span class="brand-logo">DZ</span>
          <span>Daniel Zigabe</span>
        </NuxtLink>

        <p>Frontend Developer | Web & Mobile Apps</p>
        <p>Building modern solutions for a better tomorrow.</p>
      </div>

      <!-- Quick Links -->
      <div class="footer-column">
        <h3>Quick Links</h3>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/skills">Skills</NuxtLink>
        <NuxtLink to="/projects">Projects</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </div>

      <!-- Get In Touch -->
      <div class="footer-column">
        <h3>Get In Touch</h3>
        <a href="mailto:alemu@example.com">✉ danielzigabe5@gmail.com.com</a>
        <a href="tel:+251900000000">☎ +251 0945800348</a>
        <span>📍 Ethiopia</span>

        <div class="footer-socials">
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
          <a href="#">Telegram</a>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="footer-bottom">
      <span>© {{ new Date().getFullYear() }} Daniel Zigabe. All Rights Reserved.</span>
      <span>Built with <strong>Nuxt.js</strong></span>
    </div>
  </footer>
</template>

<style scoped>
/* ===== Footer Base ===== */
.site-footer {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #cbd5e1;
  padding: 60px 20px 0;
  margin-top: 80px;
  font-family: 'Segoe UI', Arial, sans-serif;
  border-top: 3px solid #42b883;
}

/* ===== Container ===== */
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr;
  gap: 50px;
  padding-bottom: 50px;
}

/* ===== Brand Section ===== */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
  transition: 0.3s;
}

.footer-logo:hover {
  color: #42b883;
}

.brand-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #42b883, #347474);
  color: #ffffff;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
}

.footer-brand p {
  font-size: 14px;
  line-height: 1.6;
  color: #94a3b8;
  margin: 0;
}

.footer-brand p:first-of-type {
  color: #42b883;
  font-weight: 600;
  font-size: 15px;
}

/* ===== Footer Columns ===== */
.footer-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-column h3 {
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  position: relative;
  padding-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-column h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 3px;
  background: #42b883;
  border-radius: 2px;
}

/* ===== Links ===== */
.footer-column a,
.footer-column span {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  line-height: 1.8;
  transition: 0.25s;
  display: inline-block;
  width: fit-content;
}

.footer-column a:hover {
  color: #42b883;
  transform: translateX(5px);
}

/* ===== Socials ===== */
.footer-socials {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.footer-socials a {
  padding: 8px 14px;
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.3);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #42b883;
  transition: 0.3s;
}

.footer-socials a:hover {
  background: #42b883;
  color: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(66, 184, 131, 0.4);
}

/* ===== Bottom Bar ===== */
.footer-bottom {
  border-top: 1px solid #334155;
  padding: 22px 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #94a3b8;
}

.footer-bottom strong {
  color: #42b883;
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .site-footer {
    padding: 40px 16px 0;
  }
  .footer-container {
    grid-template-columns: 1fr;
    gap: 32px;
    padding-bottom: 32px;
  }
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
  .footer-logo {
    font-size: 18px;
  }
  .brand-logo {
    width: 38px;
    height: 38px;
    font-size: 15px;
  }
}
</style>