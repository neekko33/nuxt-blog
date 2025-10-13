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
        <NuxtLink :to="`/posts/${post.id}`" class="hover:underline">
          {{ post.title }}
        </NuxtLink>
      </h2>
    </div>
    <div>
      <div class="text-sm text-gray-500 space-x-4 flex">
        <div class="inline-flex items-center space-x-1">
          <Icon name="i-lucide-calendar-days" size="16" />
          <span>{{ formatDate(post.createdAt) }} </span>
        </div>
        <div class="inline-flex items-center space-x-1">
          <Icon name="i-lucide-archive" size="16" />
          <span>{{ post.category }}</span>
        </div>
        <div class="inline-flex items-center space-x-1">
          <Icon name="i-lucide-tags" size="16" />
          <div class="space-x-3">
            <UBadge
              v-for="tag in post.tags"
              :key="tag"
              color="neutral"
              variant="soft"
            >
              {{ tag }}
            </UBadge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
