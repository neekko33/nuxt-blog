<script setup lang="ts">
  const tags = ref<Tag[]>([])
  const { data } = await useFetch('/api/tags')
  tags.value = data.value?.data
</script>
<template>
  <div class="card">
    <h2 class="text-xl font-bold mb-4">标签</h2>
    <ul class="grid grid-cols-3">
      <li v-for="tag in tags" :key="tag.id">
        <NuxtLink to="/">
          <span
            class="inline-block bg-gray-200 text-gray-700 rounded-xl px-2 py-1 text-xs mb-3 hover:bg-gray-300"
          >
            #{{ tag.name }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
