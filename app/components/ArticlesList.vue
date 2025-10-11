<script setup lang="ts">
  const posts = ref<Post[]>([])
  const total = ref(0)
  const page = ref(1)
  const { data } = await useFetch('/api/posts', {
    query: {
      page: 1,
      pageSize: 10,
      category: '',
      tag: '',
    },
  })
  posts.value = data.value?.data || []
  total.value = data.value?.total || 0
</script>
<template>
  <div>
    <template v-for="post in posts" :key="post.id">
      <ArticleCard :post="post" class="mb-6" />
    </template>
    <UPagination v-model:page="page" :total="total" class="flex items-center justify-center" active-color="neutral" />
  </div>
</template>
