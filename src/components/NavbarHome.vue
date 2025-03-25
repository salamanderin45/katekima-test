<script lang="ts" setup>
import { AlignJustify } from 'lucide-vue-next'
import gsap from 'gsap'
function isShow() {
  const doc = document.getElementById('showSidebar')
  const ani = gsap.timeline({ defaults: { duration: 0.3 } })
  if (doc?.classList.contains('active')) {
    ani.to(doc, {
      width: 300,
    })
    doc?.classList.remove('active')
  } else {
    ani.to(doc, {
      width: 50,
    })
    doc?.classList.add('active')
  }
}
</script>
<template>
  <div class="flex justify-between py-4 px-10 shadow w-full sticky top-0 bg-white">
    <button @click="isShow"><AlignJustify /></button>
  </div>
</template>
