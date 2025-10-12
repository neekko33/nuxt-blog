<script setup lang="ts">
  const categories = inject('categories') as Ref<Tag[]>
  const page = ref(1)
  const pageSize = ref(10)
  const { category } = useRoute().query

  const { data } = await useFetch('/api/posts', {
    query: {
      pageNum: page,
      pageSize: pageSize,
      category: category || '',
      tag: '',
    },
    watch: [page],
  })

  const posts = computed(() =>
    PostResponseSchema.array().parse(data.value?.data || [])
  )
  const total = computed(() => data.value?.total || 0)

  const onPageChange = () => {
    scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleClearFilter = async () => {
    await navigateTo('/', { external: true })
  }
</script>
<template>
  <div>
    <div v-if="category" class="card mb-3 flex items-center justify-between">
      <div class="flex items-center">
        <span class="font-bold">筛选分类：</span>
        <UButton color="neutral" variant="ghost" icon="i-lucide-archive">
          {{ categories.find(c => c.id === Number(category))?.name }}
        </UButton>
      </div>
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-x"
        @click="handleClearFilter"
      />
    </div>
    <template v-for="post in posts" :key="post.id">
      <ArticleCard :post="post" class="mb-6" />
    </template>
    <UPagination
      v-if="total > pageSize"
      v-model:page="page"
      :total="total"
      class="flex items-center justify-center"
      active-color="neutral"
      @update:page="onPageChange"
    />
  </div>
</template>
