<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/posts/${route.params.id}`)

const post = computed(() => PostResponseSchema.parse(data.value))

</script>
<template>
  <div class="flex-1 p-6">
    <PostEditForm :post="post" />
  </div>
</template>