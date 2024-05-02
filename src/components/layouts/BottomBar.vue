<template>
  <nav
    class="navbar navbar-dark bg-primary navbar-expand d-md-none d-lg-none d-xl-none fixed-bottom"
  >
    <ul class="navbar-nav nav-justified w-100">
      <li v-for="menu in menus" class="nav-item" :key="menu.label">
        <RouterLink class="nav-link" :to="menu.path" activeClass="active">
          <i :class="menu.icon" class="icon-bottom"></i>
          {{ menu.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
<style>
.icon-bottom {
  display: block;
  font-size: 14pt;
}
</style>
<script setup lang="ts">
import menus from '@/datas/menu.json'
</script>
