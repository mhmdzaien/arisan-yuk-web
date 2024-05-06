<template>
  <SideBar></SideBar>
  <section class="container main-container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-2">
      <div class="container-fluid justify-content-start">
        <button type="button" class="btn btn-light text-primary">
          <i class="bi bi-list"></i>
        </button>
        <ol class="breadcrumb top-breadcrumb">
          <li class="breadcrumb-item fw-bold"><span>Ba-Arisan</span></li>
          <li class="breadcrumb-item active" aria-current="page">{{ $route.name }}</li>
        </ol>
      </div>
    </nav>
    <section class="content">
      <RouterView></RouterView>
    </section>
  </section>
  <BottomBar></BottomBar>
</template>
<script setup lang="ts">
import SideBar from '@/components/layouts/SideBar.vue'
import BottomBar from '@/components/layouts/BottomBar.vue'
</script>
<style lang="scss">
@import '@/assets/scss/app.scss';

.main-container {
  height: 100vh;
  overflow-y: auto;
  background-color: #d3d3d3;
  margin: 0 !important;
  padding: 0 !important;
}
.content {
  padding: 10px;
}
.top-breadcrumb {
  margin: 0 !important;
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
.main-container::-webkit-scrollbar {
  width: 10px;
}

.main-container::-webkit-scrollbar-track {
  border-radius: 8px;
  background-color: #e7e7e7;
  border: 1px solid #cacaca;
}

.main-container::-webkit-scrollbar-thumb {
  border-radius: 8px;
  border: 3px solid transparent;
  background-clip: content-box;
  background-color: $primary;
}
</style>
