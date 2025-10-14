<script setup lang="ts">
  const { data } = await useFetch('/api/categories')
  const categories = computed(() =>
    TagOrCategoryResponseSchema.array().parse(data.value?.data || [])
  )
  provide('categories', categories)

  useHead({
    title: "Neekko33's Blog",
    meta: [
      {
        name: 'description',
        content: "Neekko33's personal blog",
      },
    ],
  })

</script>
<template>
  <UPage>
    <template #default>
      <UPageBody>
        <AuthorInfo />
        <ArticlesList />
      </UPageBody>
    </template>
  </UPage>
</template>
