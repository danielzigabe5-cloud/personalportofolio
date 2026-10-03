<template>
  <div class="default-layout">
    <Navbar />
    <main class="default-main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
// ተጨማሪ ኮድ አያስፈልግም — Navbar እና Footer በራሳቸው ይሰራሉ
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0d1117;
  color: #e2e8f0;
}

.default-main {
  flex: 1;
  width: 100%;
}
</style>