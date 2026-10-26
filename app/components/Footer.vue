<script setup lang="ts">
const { data: profile } = await useProfile()

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/danielzigabe5cloud',
    iconPath: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.36-1.18-3.36-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.21-.25-4.54-1.11-4.54-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.57 9.57 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.33 4.69-4.55 4.93.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/danielzigabe5',
    iconPath: 'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 9h3.55v11.45H3.56V9ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z'
  },
  {
    name: 'Telegram',
    href: 'https://t.me/+251945800348',
    iconPath: 'M22.5 2.2 19.1 21c-.26 1.33-.97 1.66-1.97 1.03l-5.45-4.02-2.63 2.53c-.29.29-.53.53-1.09.53l.39-5.55L18.46 7.2c.43-.38-.09-.6-.67-.22L6.52 14.16l-5.4-1.69c-1.17-.37-1.2-1.17.24-1.73L21.2 2.38c.97-.36 1.82.24 1.3-.18Z'
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@danielzigabe',
    iconPath: 'M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.06 1.72 4.15 1.09 1.1 2.62 1.62 4.11 1.79v4.01c-1.4-.05-2.8-.34-4.1-.94-.57-.25-1.1-.57-1.62-.9-.01 2.77.01 5.54-.02 8.31-.07 1.33-.51 2.65-1.28 3.74-1.24 1.82-3.39 3.01-5.6 3.05-1.36.08-2.72-.29-3.88-.99-1.93-1.17-3.28-3.31-3.32-5.59-.12-1.4.26-2.8.98-4.01 1.15-2 3.36-3.29 5.67-3.33.24-.02.48-.02.72 0v4.13c-1.18-.04-2.44.34-3.3 1.2-.63.58-.98 1.47-.89 2.32.15 1.04.9 1.97 1.88 2.34.65.25 1.39.32 2.07.14.84-.2 1.58-.77 1.99-1.53.13-.23.22-.48.3-.73.07-1.25.03-2.51.04-3.76.01-2.82-.01-5.64.02-8.46z'
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@danielzigabe',
    iconPath: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.376.55A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.5 12 20.5 12 20.5s7.505 0 9.376-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z'
  }
]
</script>

<template>
  <footer class="site-footer">
    <div class="footer-container">

      <!-- Brand -->
      <div class="footer-brand">
        <NuxtLink to="/" class="footer-logo">
          <span class="brand-logo">DZ</span>
          <span>{{ profile.name }}</span>
        </NuxtLink>

        <p>{{ profile.role }}</p>
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
        <a :href="`mailto:${profile.email}`">✉ {{ profile.email }}</a>
        <a :href="`tel:${profile.phone.replace(/[^\d+]/g, '')}`">☎ {{ profile.phone }}</a>
        <span>📍 {{ profile.location }}</span>

        <div class="footer-socials">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.href"
            :aria-label="social.name"
            :title="social.name"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path :d="social.iconPath" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="footer-bottom">
      <span>© {{ new Date().getFullYear() }} {{ profile.name }}. All Rights Reserved.</span>
      <span>Built with <strong>Nuxt.js</strong></span>
    </div>
  </footer>
</template>

<style scoped>
/* ===== Footer Base ===== */
.site-footer {
  background: linear-gradient(135deg, #10243a 0%, #091729 100%) !important;
  color: #d7e4ef !important;
  padding: 60px 20px 0;
  margin-top: 80px;
  font-family: 'Segoe UI', Arial, sans-serif;
  border-top: 3px solid #168b7d !important;
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
  color: #5eead4;
}

.brand-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #168b7d, #42bca3);
  color: #ffffff;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 1px;
  box-shadow: 0 4px 16px rgb(22 139 125 / 28%);
}

.footer-brand p {
  font-size: 14px;
  line-height: 1.6;
  color: #a9bdcd;
  margin: 0;
}

.footer-brand p:first-of-type {
  color: #5eead4;
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
  background: #42bca3;
  border-radius: 2px;
}

/* ===== Links ===== */
.footer-column a,
.footer-column span {
  color: #d7e4ef;
  text-decoration: none;
  font-size: 14px;
  line-height: 1.8;
  transition: 0.25s;
  display: inline-block;
  width: fit-content;
}

.footer-column a:hover {
  color: #5eead4;
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
  display: inline-flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: rgb(22 139 125 / 12%);
  border: 1px solid rgb(94 234 212 / 28%);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #9be8dc;
  transition: 0.3s;
}

.footer-socials svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.footer-socials a:hover {
  background: #168b7d;
  color: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgb(22 139 125 / 30%);
}

/* ===== Bottom Bar ===== */
.footer-bottom {
  border-top: 1px solid rgb(148 189 205 / 20%);
  padding: 22px 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #a9bdcd;
}

.footer-bottom strong {
  color: #5eead4;
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