<script setup lang="ts">
const menuOpen = ref(false)

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Education', path: '/education' },
  { name: 'Contact', path: '/contact' }
]

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="site-navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <NuxtLink to="/" class="brand" @click="closeMenu">
        <span class="brand-logo">DZ</span>
        <span class="brand-name">Daniel Zigabe Minda</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="desktop-navigation">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          active-class="active-nav"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>

      <!-- Right Actions -->
      <div class="navbar-actions">
        <a
          href="/cv/Daniel-Zigabe-CV.pdf"
          download
          class="navbar-cv"
        >
          <span>↓</span>
          Download CV
        </a>

        <!-- 🔗 Login Link -->
        <NuxtLink to="/admin/login" class="navbar-login-link">
          Login
        </NuxtLink>
      </div>

      <!-- Mobile Button -->
      <button
        class="mobile-menu-button"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="menu">
      <div v-if="menuOpen" class="mobile-navigation">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="mobile-nav-item"
          active-class="active-mobile-nav"
          @click="closeMenu"
        >
          {{ item.name }}
        </NuxtLink>

        <div class="mobile-actions">
          <a
            href="/cv/Daniel-Zigabe-CV.pdf"
            download
            class="mobile-cv"
            @click="closeMenu"
          >
            ↓ Download CV
          </a>

          <NuxtLink
            to="/admin/login"
            class="mobile-login-link"
            @click="closeMenu"
          >
            Login
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-navbar {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: rgba(13, 17, 23, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 1000;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* ===== Brand ===== */
.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-logo {
  background-color: #10b981;
  color: #0d1117;
  font-weight: 800;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.brand-name {
  color: #ffffff;
  font-weight: 700;
  font-size: 1.1rem;
  white-space: nowrap;
}

/* ===== Desktop Navigation ===== */
.desktop-navigation {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
  justify-content: center;
}

.nav-item {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.nav-item:hover,
.nav-item.active-nav {
  color: #10b981;
}

/* ===== Actions ===== */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-shrink: 0;
}

.navbar-cv {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.navbar-cv:hover {
  border-color: #10b981;
  color: #10b981;
  transform: translateY(-1px);
}

/* 🔗 Login Link */
.navbar-login-link {
  position: relative;
  color: #9ca3af;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.3px;
  transition: color 0.2s ease;
  padding: 0.25rem 0;
  white-space: nowrap;
}

.navbar-login-link:hover {
  color: #10b981;
}

.navbar-login-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: #10b981;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
  border-radius: 2px;
}

.navbar-login-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* ===== Mobile Button ===== */
.mobile-menu-button {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}

.mobile-menu-button span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: #ffffff;
  border-radius: 2px;
  transition: 0.3s ease;
}

/* ===== Mobile Nav ===== */
.mobile-navigation {
  display: flex;
  flex-direction: column;
  background-color: #161b22;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  gap: 1rem;
}

.mobile-nav-item {
  color: #9ca3af;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 0;
  transition: color 0.2s ease;
}

.mobile-nav-item:hover,
.mobile-nav-item.active-mobile-nav {
  color: #10b981;
}

.mobile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-cv {
  color: #10b981;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.5rem 0;
}

.mobile-login-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: 0.25s ease;
}

.mobile-login-link:hover {
  background: #10b981;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(16, 185, 129, 0.35);
}

/* ===== Transitions ===== */
.menu-enter-active,
.menu-leave-active {
  transition: all 0.3s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .desktop-navigation { gap: 1rem; }
  .nav-item { font-size: 0.85rem; }
  .navbar-cv {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }
  .navbar-login-link { font-size: 0.85rem; }
}

@media (max-width: 768px) {
  .desktop-navigation,
  .navbar-actions { display: none; }
  .mobile-menu-button { display: flex; }
  .brand-name { font-size: 0.95rem; }
}

@media (max-width: 480px) {
  .navbar-container { padding: 0.85rem 1rem; }
  .brand-name { display: none; }
}
</style>