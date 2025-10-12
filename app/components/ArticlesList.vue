<script setup lang="ts">
  const page = ref(1)
  const pageSize = ref(10)

  const { data } = await useFetch('/api/posts', {
    query: {
      pageNum: page,
      pageSize: pageSize,
      category: '',
      tag: '',
    },
    watch: [page]
  })

  const posts = computed(() => PostResponseSchema.array().parse(data.value?.data || []))
  const total = computed(() => data.value?.total || 0)

  const onPageChange = () => {
    scrollTo({ top: 0, behavior: 'smooth' })
  }
</script>
<template>
  <div>
    <template v-for="post in posts" :key="post.id">
      <ArticleCard :post="post" class="mb-6" />
    </template>
    <UPagination
      v-model:page="page"
      :total="total"
      class="flex items-center justify-center"
      active-color="neutral"
      @update:page="onPageChange"
    />
  </div>
</template>
