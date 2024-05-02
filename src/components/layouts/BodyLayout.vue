<template>
  <SideBar></SideBar>
  <section class="container main-container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mt-1">
      <div class="container-fluid">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Library</li>
        </ol>
      </div>
    </nav>
    <RouterView></RouterView>
  </section>
  <BottomBar></BottomBar>
</template>
<script setup lang="ts">
import SideBar from '@/components/layouts/SideBar.vue'
import BottomBar from '@/components/layouts/BottomBar.vue'
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
