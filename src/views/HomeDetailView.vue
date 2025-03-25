<script setup lang="ts">
import { useTable } from '@/api/bokeapi'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { data } = useTable().useGetTable(route?.params?.id ?? '')
const berryData = computed(() => data.value?.data ?? {})

onMounted(() => {
  console.log('tes', route)
})
</script>

<template>
  <main class="p-4 px-10">
    <RouterLink :to="`/`">
      <button class="bg-blue-400 text-white p-2 rounded-md">back</button>
    </RouterLink>
    <br />
    <br />
    <br />
    <div class="bg-white p-6 rounded-2xl shadow-lg space-y-4">
      <h2 class="text-xl font-bold text-gray-900 capitalize">{{ berryData.name }} Berry</h2>
      <p class="text-sm text-gray-600">
        Firmness:
        <a :href="berryData.firmness.url" class="text-blue-500 hover:underline">{{
          berryData.firmness.name
        }}</a>
      </p>
      <p class="text-sm text-gray-600">Growth Time: {{ berryData.growth_time }} days</p>
      <p class="text-sm text-gray-600">Max Harvest: {{ berryData.max_harvest }}</p>
      <p class="text-sm text-gray-600">Size: {{ berryData.size }}mm</p>
      <p class="text-sm text-gray-600">Smoothness: {{ berryData.smoothness }}</p>
      <p class="text-sm text-gray-600">Soil Dryness: {{ berryData.soil_dryness }}</p>
      <p class="text-sm text-gray-600">
        Natural Gift Power: {{ berryData.natural_gift_power }} ({{
          berryData.natural_gift_type.name
        }})
      </p>
      <div>
        <h3 class="font-semibold text-gray-800">Flavors:</h3>
        <ul class="list-disc list-inside text-sm text-gray-600">
          <li v-for="flavor in berryData.flavors" :key="flavor.flavor.name">
            <a :href="flavor.flavor.url" class="text-blue-500 hover:underline">{{
              flavor.flavor.name
            }}</a
            >: Potency {{ flavor.potency }}
          </li>
        </ul>
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
