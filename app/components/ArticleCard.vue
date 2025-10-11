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
    <div>
      <h2 class="text-xl font-bold mb-8">
        <NuxtLink :to="`/post/${post.slug}`" class="hover:underline">
          {{ post.title }}
        </NuxtLink>
      </h2>
    </div>
    <div>
      <div class="text-sm text-gray-500 space-x-4 flex">
        <div class="inline-flex items-center space-x-1">
          <Icon name="heroicons:calendar-date-range-16-solid" size="16" />
          <span>{{ new Date(post.createdAt).toLocaleDateString() }} </span>
        </div>
        <div class="inline-flex items-center space-x-1">
          <Icon name="heroicons:archive-box-solid" size="16" />
          <span>{{ post.category }}</span>
        </div>
        <div class="inline-flex items-center space-x-1">
          <Icon name="heroicons:tag-16-solid" size="16" />
          <div class="space-x-3">
            <UBadge v-for="tag in post.tags" :key="tag" color="neutral" variant="soft">
              {{ tag }}
            </UBadge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
