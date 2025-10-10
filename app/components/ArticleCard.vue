<script setup lang="ts">
  defineProps({
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  })
</script>
<template>
  <div class="card">
    <h2 class="text-2xl font-bold mb-2">
      <NuxtLink :to="`/post/${post.slug}`" class="hover:underline">
        {{ post.title }}
      </NuxtLink>
    </h2>
  </div>
</template>
