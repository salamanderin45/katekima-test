<script setup lang="ts">
import { useTable } from '@/api/profile'
import { computed, onMounted, ref } from 'vue'

const { data, mutate } = useTable().mutateGetTable()
const itemsPerPageOptions = [10, 30, 50]
const itemsPerPage = ref(10)
const TOTAL_COUNT = computed(() => data?.value?.data?.count)
const offset = ref(0)
const query = ref('')
const dataList = computed(() => {
  return query.value !== ''
    ? data.value?.data?.results?.filter((d: any) => d?.name === query.value)
    : data.value?.data?.results
})
const totalPages = computed(() => Math.ceil(TOTAL_COUNT.value / itemsPerPage.value))
const currentPage = computed(() => Math.floor(offset.value / itemsPerPage.value) + 1)

const nextPage = () => {
  if (offset.value + itemsPerPage.value < TOTAL_COUNT.value) {
    offset.value += itemsPerPage.value
    mutate({ limit: itemsPerPage.value, offset: offset.value })
  }
}

const prevPage = () => {
  if (offset.value > 0) {
    offset.value -= itemsPerPage.value
    mutate({ limit: itemsPerPage.value, offset: offset.value })
  }
}

const updateItemsPerPage = (event: any) => {
  console.log('🚀 ~ updateItemsPerPage ~ event:', event.target.value)
  itemsPerPage.value = parseInt(event.target.value, 10)
  offset.value = 0 // Reset ke halaman pertama saat mengubah jumlah item per halaman
  mutate({ limit: itemsPerPage.value, offset: offset.value })
}

const generatePagination = () => {
  const pages = []
  const maxPagesToShow = 5
  if (totalPages.value <= maxPagesToShow) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage.value <= 3) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages.value)
    } else if (currentPage.value >= totalPages.value - 2) {
      pages.push(
        1,
        '...',
        totalPages.value - 4,
        totalPages.value - 3,
        totalPages.value - 2,
        totalPages.value - 1,
        totalPages.value,
      )
    } else {
      pages.push(
        1,
        '...',
        currentPage.value - 1,
        currentPage.value,
        currentPage.value + 1,
        '...',
        totalPages.value,
      )
    }
  }
  return pages
}
const goToPage = (page) => {
  if (typeof page === 'number') {
    offset.value = (page - 1) * itemsPerPage.value
    mutate({ limit: itemsPerPage.value, offset: offset.value })
  }
}
onMounted(() => {
  mutate({ limit: 10 })
})
</script>

<template>
  <main class="p-4 px-10">
    <div class="text-2xl font-bold mb-10 capitalize">table</div>
    <div class="mb-4 text-center flex justify-end">
      <input v-model="query" placeholder="Search..." class="border p-2 rounded w-full" />
      <label class="mr-2 text-gray-700">Items per page:</label>
      <select @change="updateItemsPerPage" v-model="itemsPerPage" class="border p-1 rounded">
        <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <table class="table-auto w-full">
      <thead>
        <tr class="capitalize">
          <th class="w-1">no</th>
          <th>name</th>
          <th>aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d, i) in dataList" :key="i + '-table'">
          <td>{{ offset + i + 1 }}</td>
          <td>{{ d?.name }}</td>
          <td>1961</td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-end">
      <div class="flex items-center justify-between mt-4 gap-4">
        <button
          @click="prevPage"
          :disabled="offset === 0"
          class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <div class="flex space-x-2">
          <button
            v-for="page in generatePagination()"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3 py-1 rounded',
              page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700',
              page === '...' ? 'cursor-default' : 'cursor-pointer',
            ]"
            :disabled="page === '...'"
          >
            <span>{{ page }}</span>
          </button>
        </div>
        <button
          @click="nextPage"
          :disabled="offset + itemsPerPage >= TOTAL_COUNT"
          class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </main>
</template>
<style lang="css" scoped>
td,
tr,
th {
  border: solid 1px oklch(0.928 0.006 264.531);
  padding: 10px;
}
</style>
