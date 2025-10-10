<script setup lang="ts">
  const categories = ref<Category[]>([])
  const { data } = await useFetch('/api/categories')
  categories.value = data.value?.data
</script>
<template>
  <div class="card">
    <h2 class="text-xl font-bold mb-4">分类</h2>
    <ul>
      <li v-for="category in categories" :key="category.id" class="mb-2">
        <NuxtLink
          :to="`/category/${category.slug}`"
          class="flex justify-between px-2 hover:bg-gray-100 rounded-md py-1"
        >
          <span>{{ category.name }}</span>
          <span>
            {{ category.posts?.length || 0 }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
