<script setup lang="ts">
  const props = defineProps({
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  })

  const handleClick = async () => {
    await navigateTo(`/posts/${props.post.id}`)
  }
</script>
<template>
  <div class="card cursor-pointer space-y-8" @click="handleClick">
    <div>
      <h3 class="text-sm text-center text-gray-500 mb-4">
        {{ formatDate(post.createdAt) }}
      </h3>
      <h2 class="text-2xl font-bold text-center">
        {{ post.title }}
      </h2>
    </div>
    <div class="flex items-center justify-center">
      <div class="text-sm text-gray-500 space-x-4 flex">
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
    <div class="mt-8 text-center">
      <UButton color="neutral" variant="outline" class="rounded-3xl px-4"
        >阅读更多</UButton
      >
    </div>
  </div>
</template>
