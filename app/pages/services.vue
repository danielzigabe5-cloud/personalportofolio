<script setup lang="ts">
import photoImage from '~/assets/images/photo.jpg'
import { defaultServices, type Service } from '~~/shared/utils/services'

const { data: services, error: servicesError } = await useFetch<Service[]>('/api/services', {
  default: () => defaultServices.map(service => ({ ...service }))
})
const { data: profile } = await useProfile()
</script>

<template>
  <main class="services-page">
    <section class="services-intro">
      <div class="services-intro__copy">
        <p class="services-eyebrow"><span /> WHAT I CAN DO FOR YOU</p>
        <h1>Services built around your needs</h1>
        <p class="services-lead">
          I’m {{ profile.name }}, a {{ profile.role.toLowerCase() }}. I turn your ideas into
          useful digital products, from professional websites to custom applications.
        </p>
      </div>
      <figure class="services-intro__profile">
        <img
          class="services-intro__photo"
          :src="profile.avatarUrl || photoImage"
          :alt="profile.name"
          fetchpriority="high"
        >
        <figcaption class="services-intro__caption">
          <strong>{{ profile.name }}</strong>
          <span>{{ profile.role }}</span>
        </figcaption>
      </figure>
    </section>

    <p v-if="servicesError" role="alert" class="services-error">
      Services could not be loaded. Please try again later.
    </p>

    <section class="services-grid" aria-label="Available services">
      <article v-for="service in services" :key="service.title" class="service-card">
        <div class="service-card__topline" aria-hidden="true" />
        <div class="service-card__image" aria-hidden="true">
          <img :src="service.image" alt="" loading="lazy" />
          <span />
        </div>
        <div class="service-card__content">
          <div class="service-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path :d="service.icon" />
            </svg>
          </div>
          <h2>{{ service.title }}</h2>
          <span class="service-card__divider" aria-hidden="true" />
          <p>{{ service.description }}</p>
        </div>
        <NuxtLink :to="service.to || '/contact'" class="service-card__action" :aria-label="service.title === 'Technical Training' ? 'Learn more about technical training' : `Ask about ${service.title}`">
          <span>+</span>
        </NuxtLink>
      </article>
    </section>

    <section class="services-cta">
      <div>
        <p>Have a project in mind?</p>
        <h2>Let’s build something useful together.</h2>
      </div>
      <NuxtLink to="/contact">Get in touch <span aria-hidden="true">→</span></NuxtLink>
    </section>
  </main>
</template>

<style scoped>
.services-page {
  --service-ink: #174b45;
  --service-muted: #66827e;
  --service-accent: #168b7d;
  min-height: 70vh;
  padding: 2rem max(1.5rem, calc((100vw - 1320px) / 2)) 5rem;
  color: var(--service-ink);
  background:
    radial-gradient(ellipse at 50% 0, rgb(22 139 125 / 9%), transparent 42%),
    #dcefed;
}

.services-intro {
  display: grid;
  max-width: 1050px;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 0.48fr);
  align-items: center;
  gap: 3rem;
  margin: 0 auto 3rem;
}

.services-intro__copy {
  max-width: 680px;
}

.services-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0 0 1rem;
  color: var(--service-accent);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.services-eyebrow span {
  width: 28px;
  height: 3px;
  border-radius: 99px;
  background: var(--service-accent);
}

.services-intro h1 {
  margin: 0;
  color: var(--service-ink);
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 850;
  letter-spacing: -0.055em;
  line-height: 1.08;
}

.services-lead {
  max-width: 620px;
  margin: 1rem 0 0;
  color: var(--service-muted);
  font-size: 1.05rem;
  line-height: 1.8;
}

.services-intro__profile {
  position: relative;
  display: block;
  width: 100%;
  margin: 0;
  max-height: 310px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border: 5px solid rgb(255 255 255 / 75%);
  border-radius: 1.5rem;
  background: #cfe5e1;
  box-shadow: 0 18px 40px rgb(23 75 69 / 16%);
}

.services-intro__photo {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  object-position: center 35%;
}

.services-intro__caption {
  position: absolute;
  right: 0.8rem;
  bottom: 0.8rem;
  left: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.8rem 1rem;
  border: 1px solid rgb(255 255 255 / 28%);
  border-radius: 0.8rem;
  background: rgb(15 43 39 / 78%);
  color: #fff;
  backdrop-filter: blur(10px);
}

.services-intro__caption strong {
  font-size: 0.95rem;
  font-weight: 850;
}

.services-intro__caption span {
  color: #d1e0dd;
  font-size: 0.75rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.services-error {
  max-width: 1050px;
  margin: -1.5rem auto 2rem;
  color: #9b2c2c;
  text-align: center;
}

.service-card {
  position: relative;
  display: flex;
  min-height: 430px;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #c2ded9;
  background: #f3f9f8;
  box-shadow: 0 14px 35px rgb(23 75 69 / 7%);
  transition: border-color 220ms ease, background-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;
}

.service-card:hover {
  transform: translateY(-5px);
  border-color: rgb(22 139 125 / 55%);
  box-shadow: 0 22px 45px rgb(23 75 69 / 13%);
}

.service-card__topline {
  position: relative;
  z-index: 2;
  height: 7px;
  background: linear-gradient(90deg, #168b7d, #42bca3);
}

.service-card__image {
  position: relative;
  flex: 0 0 180px;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: #173f3a;
}

.service-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms ease;
}

.service-card__image span {
  display: none;
}

.service-card:hover .service-card__image img {
  transform: scale(1.04);
}

.service-card__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  align-items: center;
  padding: 1.75rem 1.75rem 4rem;
  text-align: center;
}

.service-card__icon {
  display: grid;
  width: 76px;
  height: 76px;
  place-items: center;
  margin-bottom: 1.25rem;
  border-radius: 22px;
  background: #e8f4f2;
  color: #168b7d;
  transition: background 220ms ease, color 220ms ease, transform 220ms ease;
}

.service-card__icon svg {
  width: 43px;
  height: 43px;
}

.service-card h2 {
  margin: 0;
  color: var(--service-ink);
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.035em;
}

.service-card__divider {
  width: 70px;
  height: 4px;
  margin: 1rem 0;
  background: linear-gradient(90deg, var(--service-accent) 0 35%, #42bca3 35% 100%);
}

.service-card p {
  max-width: 340px;
  margin: 0;
  color: var(--service-muted);
  font-size: 0.98rem;
  line-height: 1.75;
}

.service-card__action {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 50%;
  background: #f3f9f8;
  color: var(--service-ink);
  box-shadow: 0 4px 18px rgb(23 75 69 / 12%);
  text-decoration: none;
  transition: color 220ms ease, background 220ms ease, transform 220ms ease, top 300ms ease, width 300ms ease, height 300ms ease;
  z-index: 3;
}

.service-card__action span {
  margin-top: -2px;
  font-size: 1.8rem;
  line-height: 1;
}

.service-card__action:hover {
  transform: rotate(90deg);
  background: var(--service-accent);
  color: #fff;
}

.services-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 3rem;
  padding: 2rem 2.25rem;
  background: var(--service-ink);
  color: #fff;
}

.services-cta p {
  margin: 0 0 0.4rem;
  color: #9be8dc;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.services-cta h2 {
  margin: 0;
  font-size: clamp(1.25rem, 3vw, 1.8rem);
  font-weight: 800;
}

.services-cta > a {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.25rem;
  background: linear-gradient(90deg, #168b7d, #42bca3);
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 800;
  text-decoration: none;
  transition: background 180ms ease, transform 180ms ease;
}

.services-cta > a:hover {
  transform: translateY(-2px);
  background: linear-gradient(90deg, #11776c, #168b7d);
}

@media (max-width: 950px) {
  .services-intro {
    max-width: 760px;
    grid-template-columns: minmax(0, 1fr) 220px;
    gap: 2rem;
  }

  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .services-page {
    padding: 1.5rem 1rem 3rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .services-intro {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .services-intro__profile {
    max-height: 280px;
    aspect-ratio: 16 / 10;
  }

  .service-card {
    min-height: 0;
  }

  .service-card__content {
    min-height: 280px;
  }

  .services-cta {
    align-items: flex-start;
    flex-direction: column;
    padding: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-card,
  .service-card__image,
  .service-card__image img,
  .service-card__icon,
  .service-card__action {
    transition-duration: 0.01ms;
  }
}
</style>
