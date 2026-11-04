<template>

  <div class="default-layout">

    <!-- NAVBAR -->
    <Navbar />

    <!-- MAIN CONTENT -->
    <main class="default-main">
      <slot />
    </main>

    <!-- FOOTER -->
    <Footer />

  </div>

</template>


<script setup lang="ts">

// No additional script required.

</script>


<style scoped>

.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background-color: var(--portfolio-bg);
  color: var(--portfolio-text);
}


.default-main {
  flex: 1;
  width: 100%;

  background-color: var(--portfolio-bg);
}

</style>