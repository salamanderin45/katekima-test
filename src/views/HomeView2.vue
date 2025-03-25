<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const apiBase = 'https://fakestoreapi.com/products'

// State
const itemsPerPageOptions = [5, 10, 20]
const itemsPerPage = ref(5)
const offset = ref(0)
const query = ref('')
const data = ref([])

// Form states
const showForm = ref(false)
const isEdit = ref(false)
const productForm = ref({ title: '', price: '', description: '', category: '', image: '' })
const selectedProductId = ref(null)

// Fetch data
const fetchData = async () => {
  try {
    const response = await axios.get(
      `${apiBase}?limit=${itemsPerPage.value}&offset=${offset.value}`,
    )
    data.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// CRUD operations
const createProduct = async () => {
  try {
    const response = await axios.post(apiBase, productForm.value)
    data.value.push(response.data)
    closeForm()
  } catch (error) {
    console.error('Error creating product:', error)
  }
}

const updateProduct = async () => {
  try {
    const response = await axios.put(`${apiBase}/${selectedProductId.value}`, productForm.value)
    const index = data.value.findIndex((p) => p.id === selectedProductId.value)
    if (index !== -1) data.value[index] = response.data
    closeForm()
  } catch (error) {
    console.error('Error updating product:', error)
  }
}

const deleteProduct = async (id) => {
  try {
    await axios.delete(`${apiBase}/${id}`)
    data.value = data.value.filter((p) => p.id !== id)
  } catch (error) {
    console.error('Error deleting product:', error)
  }
}

// Helpers
const openForm = (product = null) => {
  if (product) {
    isEdit.value = true
    selectedProductId.value = product.id
    productForm.value = { ...product }
  } else {
    isEdit.value = false
    productForm.value = { title: '', price: '', description: '', category: '', image: '' }
  }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  productForm.value = { title: '', price: '', description: '', category: '', image: '' }
  selectedProductId.value = null
}

onMounted(fetchData)
</script>

<template>
  <main class="p-4 px-10">
    <h2 class="text-2xl font-bold mb-5 capitalize">Product Table</h2>

    <!-- Search and Pagination -->
    <div class="mb-4 flex justify-between">
      <input v-model="query" placeholder="Search..." class="border p-2 rounded w-1/3" />
      <div class="flex gap-4">
        <label class="mr-2">Items per page:</label>
        <select v-model="itemsPerPage" class="border p-1 rounded" @change="fetchData">
          <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <button @click="openForm()" class="bg-green-500 text-white px-4 py-2 rounded">
          + Add Product
        </button>
      </div>
    </div>

    <!-- Table -->
    <table class="table-auto w-full border">
      <thead>
        <tr>
          <th class="border p-2">No</th>
          <th class="border p-2">Title</th>
          <th class="border p-2">Price</th>
          <th class="border p-2">Category</th>
          <th class="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, i) in data" :key="product.id">
          <td class="border p-2">{{ offset + i + 1 }}</td>
          <td class="border p-2">{{ product.title }}</td>
          <td class="border p-2">${{ product.price }}</td>
          <td class="border p-2">{{ product.category }}</td>
          <td class="border p-2 flex gap-2">
            <button @click="openForm(product)" class="bg-yellow-500 text-white px-3 py-1 rounded">
              Edit
            </button>
            <button
              @click="deleteProduct(product.id)"
              class="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Form -->
    <div
      v-if="showForm"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div class="bg-white p-6 rounded shadow-lg w-1/3">
        <h3 class="text-xl font-bold mb-4">{{ isEdit ? 'Edit Product' : 'Add Product' }}</h3>
        <input v-model="productForm.title" placeholder="Title" class="border p-2 w-full mb-2" />
        <input
          v-model="productForm.price"
          type="number"
          placeholder="Price"
          class="border p-2 w-full mb-2"
        />
        <input
          v-model="productForm.description"
          placeholder="Description"
          class="border p-2 w-full mb-2"
        />
        <input
          v-model="productForm.category"
          placeholder="Category"
          class="border p-2 w-full mb-2"
        />
        <input v-model="productForm.image" placeholder="Image URL" class="border p-2 w-full mb-2" />

        <div class="flex justify-end gap-2 mt-4">
          <button @click="closeForm" class="px-4 py-2 bg-gray-400 text-white rounded">
            Cancel
          </button>
          <button
            @click="isEdit ? updateProduct() : createProduct()"
            class="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="css" scoped>
td,
th {
  border: solid 1px gray;
  padding: 10px;
}
</style>
