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
  <div class="card cursor-pointer space-y-4" @click="handleClick">
    <div>
      <h3 class="text-sm text-gray-400 mb-4 font-semibold">
        {{ formatDate(post.createdAt) }}
      </h3>
      <h2 class="text-xl font-bold">
        {{ post.title }}
      </h2>
    </div>
    <div>
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
  </div>
</template>
