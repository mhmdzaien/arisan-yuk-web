<template>
  <nav class="navbar navbar-dark bg-primary navbar-expand d-md-none d-lg-none d-xl-none">
    <ul class="navbar-nav nav-justified w-100">
      <li v-for="menu in menus" class="nav-item" :key="menu.label">
        <RouterLink :replace="true" class="nav-link" :to="menu.path" activeClass="active">
          <i :class="menu.icon" class="icon-bottom"></i>
          {{ menu.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
.nav-link {
  padding: 0 !important;
}

.icon-bottom {
  display: block;
  font-size: 14pt;
}
</style>
<script setup lang="ts">
import menus from '@/datas/menu.json'
</script>
