<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarHome from './components/NavbarHome.vue'
import SidebarHome from './components/SidebarHome.vue'
</script>

<template>
  <header></header>
  <div class="flex">
    <div id="showSidebar" class="w-[300px] top-0 bottom-0 left-0">
      <SidebarHome />
    </div>
    <div class="w-full overflow-auto h-dvh">
      <NavbarHome />
      <RouterView />
    </div>
  </div>
</template>
