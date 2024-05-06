<template>
  <SideBar></SideBar>
  <section class="container main-container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mt-1">
      <div class="container-fluid">
        <ol class="breadcrumb top-breadcrumb">
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
<style lang="scss">
@import '~bootstrap/scss/bootstrap';

.main-container {
  height: 100vh;
  overflow-y: auto;
  background-color: #d3d3d3;
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
. .main-container::-webkit-scrollbar {
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
