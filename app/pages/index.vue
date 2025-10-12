<script setup lang="ts">
  const { data } = await useFetch('/api/categories')
  const categories = computed(() =>
    TagOrCategoryResponseSchema.array().parse(data.value?.data || [])
  )
  provide('categories', categories)
</script>
<template>
  <UPage :ui="{ left: 'lg:col-span-3', center: 'lg:col-span-7' }">
    <template #left>
      <UPageAside :ui="{ container: 'relative space-y-6' }">
        <AuthorInfo />
        <CategoriesCard />
      </UPageAside>
    </template>
    <template #default>
      <UPageBody>
        <ArticlesList />
      </UPageBody>
    </template>
  </UPage>
</template>
