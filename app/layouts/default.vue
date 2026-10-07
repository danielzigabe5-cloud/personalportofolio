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

  /* White Background */
  background-color: #ffffff;

  /* Dark Slate Text */
  color: #0f172a;
}


.default-main {
  flex: 1;
  width: 100%;

  /* Navbar space */
  padding-top: 80px;

  /* White Background */
  background-color: #ffffff;
}

</style>