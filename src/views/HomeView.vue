<script setup lang="ts">
import { useTable } from '@/api/profile'

const { data } = useTable().useGetTable()
</script>

<template>
  <main class="p-4 px-10">
    <div class="text-2xl font-bold mb-10 capitalize">table</div>
    <table class="table-auto w-full">
      <thead>
        <tr class="capitalize">
          <th class="w-1">no</th>
          <th>name</th>
          <th>aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d, i) in data?.data?.results" :key="i + '-table'">
          <td>{{ i + 1 }}</td>
          <td>{{ d?.name }}</td>
          <td>1961</td>
        </tr>
      </tbody>
    </table>
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
