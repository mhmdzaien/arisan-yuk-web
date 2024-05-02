<template>
  <nav
    class="d-flex flex-column flex-shrink-0 p-3 bg-light d-none d-sm-flex"
    style="width: 280px"
    bis_skin_checked="1"
  >
    <a
      href="/"
      class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
    >
      <img src="@/assets/logo.svg" width="40" height="32" />
      <span class="fs-4">Menu</span>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li v-for="menu in menus" class="nav-item" :key="menu.label">
        <RouterLink class="nav-link" :to="menu.path" activeClass="active">
          <i :class="menu.icon"></i>
          {{ menu.label }}
        </RouterLink>
      </li>
    </ul>
    <hr />
    <div class="dropdown" bis_skin_checked="1">
      <a
        href="#"
        class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
        id="dropdownUser2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://github.com/mdo.png"
          alt=""
          width="32"
          height="32"
          class="rounded-circle me-2"
        />
        <strong>mdo</strong>
      </a>
      <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </nav>
</template>
<script setup lang="ts">
import menus from '@/datas/menu.json'
</script>
