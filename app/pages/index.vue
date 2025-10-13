<script setup lang="ts">
  const { data } = await useFetch('/api/categories')
  const categories = computed(() =>
    TagOrCategoryResponseSchema.array().parse(data.value?.data || [])
  )
  provide('categories', categories)
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
