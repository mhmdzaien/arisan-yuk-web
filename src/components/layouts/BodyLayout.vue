<template>
  <SideBar></SideBar>
  <section class="container main-container">
    <RouterView></RouterView>
  </section>
</template>
<script setup lang="ts">
import SideBar from '@/components/layouts/SideBar.vue'
</script>
<style>
.main-container {
  height: 100vh;
}
#app {
  display: flex;
  flex-wrap: nowrap;
  height: 100vh;
  height: -webkit-fill-available;
  max-height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
