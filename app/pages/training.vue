<script setup lang="ts">
useSeoMeta({
  title: 'Technical Training | Daniel Zigabe Minda',
  description: 'Practical technical training delivered at Ewenet Communication.'
})
</script>

<template>
  <main class="training-page">
    <section class="training-hero">
      <div class="training-copy">
        <p class="training-eyebrow"><span /> TECHNICAL TRAINING</p>
        <h1>Practical learning for confident teams.</h1>
        <p class="training-lead">
          I delivered technical training at Ewenet Communication, helping learners build practical
          skills and apply technology with confidence.
        </p>
        <NuxtLink to="/contact" class="training-contact">
          Discuss training <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>

      <div class="training-portrait">
        <img
          src="/images/services/training.jpg"
          alt="Technical training at Ewenet Communication"
        >
        <span class="training-caption">Training at Ewenet Communication</span>
      </div>
    </section>

    <section class="training-details">
      <p class="training-eyebrow"><span /> LEARN BY DOING</p>
      <h2>Skills that translate into real work.</h2>
      <p>
        The training focused on clear explanations, guided practice, and useful technical
        knowledge. Learners could connect new concepts to the tools and tasks they encounter
        in a professional environment.
      </p>
    </section>
  </main>
</template>

<style scoped>
.training-page {
  --training-ink: #174b45;
  --training-accent: #168b7d;
  min-height: 70vh;
  padding: 5rem max(1.5rem, calc((100vw - 1180px) / 2));
  color: var(--training-ink);
  background:
    radial-gradient(ellipse at 70% 0, rgb(22 139 125 / 10%), transparent 40%),
    #f5fbfa;
}

.training-hero {
  display: grid;
  align-items: center;
  gap: 3rem;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
}

.training-copy {
  max-width: 620px;
}

.training-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0 0 1.1rem;
  color: var(--training-accent);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.training-eyebrow span {
  width: 25px;
  height: 3px;
  border-radius: 99px;
  background: var(--training-accent);
}

.training-copy h1,
.training-details h2 {
  margin: 0;
  color: #123c37;
  font-weight: 850;
  letter-spacing: -0.045em;
}

.training-copy h1 {
  max-width: 600px;
  font-size: clamp(2.5rem, 6vw, 4.6rem);
  line-height: 1.05;
}

.training-lead,
.training-details > p:last-child {
  color: #5e7773;
  font-size: 1.05rem;
  line-height: 1.8;
}

.training-lead {
  max-width: 580px;
  margin: 1.5rem 0 0;
}

.training-contact {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.75rem;
  padding: 0.9rem 1.2rem;
  border-radius: 0.7rem;
  background: var(--training-accent);
  color: #fff;
  font-weight: 750;
  text-decoration: none;
  transition: background 180ms ease, transform 180ms ease;
}

.training-contact:hover {
  transform: translateY(-2px);
  background: #116e63;
}

.training-portrait {
  position: relative;
  min-height: 360px;
  overflow: hidden;
  border-radius: 1.5rem;
  background: #dcefed;
  box-shadow: 0 22px 55px rgb(23 75 69 / 15%);
}

.training-portrait img {
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
}

.training-caption {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  padding: 0.85rem 1rem;
  border: 1px solid rgb(255 255 255 / 28%);
  border-radius: 0.8rem;
  background: rgb(15 43 39 / 76%);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  backdrop-filter: blur(10px);
}

.training-details {
  max-width: 760px;
  margin: 5rem auto 0;
  padding-top: 2.5rem;
  border-top: 1px solid rgb(23 75 69 / 15%);
}

.training-details h2 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
}

.training-details > p:last-child {
  margin: 1rem 0 0;
}

@media (max-width: 760px) {
  .training-page {
    padding-top: 3.5rem;
    padding-bottom: 4rem;
  }

  .training-hero {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .training-portrait,
  .training-portrait img {
    min-height: 300px;
  }

  .training-details {
    margin-top: 3.5rem;
    padding-top: 2rem;
  }
}
</style>
