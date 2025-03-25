<script lang="ts" setup>
import gsap from 'gsap'
import { Book, ClipboardCheck, ChevronRight, Minus } from 'lucide-vue-next'
import { findIndexPath } from '@/utils/findUrl'
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
const route = useRoute()

type ChildType = {
  name: string
  url: string
  bool: boolean
  boolChildren: boolean
  icons: string | any
  child: ChildType[]
}
const menu = reactive<ChildType[]>([
  /* {
    name: 'Dashboard',
    icons: ClipboardCheck,
    child: [],
    url: '/admin/dashboard',
    bool: false,
    boolChildren: false,
  }, */
  {
    name: 'table',
    icons: Book,
    url: '',
    bool: false,
    boolChildren: false,
    child: [
      {
        name: 'soal 1',
        bool: false,
        boolChildren: false,
        icons: Book,
        url: '/soal',
        child: [],
      },
      {
        name: 'soal 2',
        bool: false,
        boolChildren: false,
        icons: Book,
        url: '/',
        child: [],
      },
    ],
  },
  /* {
    name: 'aws',
    icons: Book,
    url: '',
    bool: false,
    boolChildren: false,
    child: [
      {
        name: 'a',
        bool: false,
        boolChildren: false,
        icons: Book,
        url: '/admin/a',
        child: [],
      },
      {
        name: 'b',
        bool: false,
        boolChildren: false,
        icons: Book,
        url: '/admin/b',
        child: [],
      },
    ],
  }, */
])

function menuIsShow(i: number, i2: number, data: ChildType) {
  const doc = document.getElementById(`menu-${i}`)
  const doc2 = document.getElementById(`menu-child-${i}`)

  for (const key in menu) {
    menu[key].bool = false // Reset all menu items
    if (data.url !== '' || i2 >= 0) {
      for (const key2 in menu[key].child) {
        menu[key].child[key2].bool = false
      }
    }
  }
  data.bool = true

  if (i2 >= 0) {
    data.child[i2].bool = true
  } else {
    data.boolChildren = !data.boolChildren
    const an = gsap.timeline({ defaults: { duration: 0.2 } })
    if (data?.boolChildren) {
      an.to(
        doc,
        {
          rotate: 90,
        },
        0,
      )
      an.to(
        doc2,
        {
          height: 'auto',
        },
        0,
      )
    } else {
      an.to(
        doc,
        {
          rotate: 0,
        },
        0,
      )
      an.to(
        doc2,
        {
          height: '0px',
        },
        0,
      )
    }
  }
}

onMounted(() => {
  const index = findIndexPath(menu, route.fullPath || '')
  for (const key in menu) {
    menu[key].bool = false // Reset all menu items
    for (const key2 in menu[key].child) {
      menu[key].child[key2].bool = false // Reset all child items
    }
  }
  if (index) {
    menu[index[0]].bool = true // Set the parent item as active
    menu[index[0]].boolChildren = true // Set the parent item as active
    if (index?.length > 1) {
      const ani = gsap.timeline({ defaults: { duration: 0.2 } })
      ani.to(
        `#menu-${index[0]}`,
        {
          rotate: '90deg',
        },
        0,
      )
      ani.to(
        `#menu-child-${index[0]}`,
        {
          height: 'auto',
        },
        0,
      )
    }

    if (menu[index[0]].child && menu[index[0]].child.length > 0) {
      menu[index[0]].child[index[1]].bool = true // Set the child item as active
    }
  }
})
</script>
<template>
  <div class="shadow w-full h-dvh bg-gray-100 overflow-hidden">
    <div class="font-bold text-2xl capitalize text-center w-full px-10 py-4">admin</div>
    <div class="px-4 w-full flex flex-col gap-2">
      <template v-for="(d, i) in menu" :key="d.url">
        <RouterLink v-if="d.child.length === 0" :to="d?.url ?? '#'">
          <div
            :class="`flex gap-4 p-3 items-center border border-gray-300 cursor-pointer rounded-lg ${
              d.bool ? '!bg-teal-500 text-white' : 'text-gray-500 '
            }`"
            @click="menuIsShow(i, -1, d)"
          >
            <component :size="25" :is="d.icons" />
            <div class="font-semibold capitalize">
              {{ d.name }}
            </div>
          </div>
        </RouterLink>

        <template v-else>
          <div
            @click="menuIsShow(i, -1, d)"
            :class="`grid grid-cols-[auto_1fr_auto] p-3 gap-4 border rounded-md border-gray-300 items-center cursor-pointer ${
              d.bool ? '!text-teal-500' : 'text-gray-600 '
            }`"
          >
            <component :size="25" :is="d.icons" />
            <div class="font-semibold capitalize">
              {{ d.name }}
            </div>
            <ChevronRight :id="`menu-${i}`" :size="15" />
          </div>
          <div
            :id="`menu-child-${i}`"
            :size="15"
            class="overflow-hidden h-[0px] gap-2 flex flex-col pl-4"
          >
            <RouterLink v-for="(d2, i2) in d?.child" :to="d2.url" :key="d2.url">
              <div
                @click="menuIsShow(i, i2, d)"
                :class="`flex gap-x-4 py-1 items-center rounded-lg cursor-pointer ml-[16px] ${
                  d2.bool ? '!text-teal-500' : 'text-gray-500'
                }`"
              >
                <Minus :class="`text-gray-400 `" :size="15" />
                <div class="font-semibold capitalize">
                  {{ d2.name }}
                </div>
              </div>
            </RouterLink>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
