<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarHome from './components/NavbarHome.vue'
import SidebarHome from './components/SidebarHome.vue'
</script>

<template>
  <header></header>
  <div class="flex">
    <div id="showSidebar" class="w-[300px]">
      <SidebarHome />
    </div>
    <div class="w-full">
      <NavbarHome />
      <RouterView />
    </div>
  </div>
</template>
