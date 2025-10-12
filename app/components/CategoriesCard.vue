<script setup lang="ts">
  const categories = inject('categories') as Ref<Tag[]>
  const handleClick = (id: number) => {
    navigateTo(`/?category=${id}`, { external: true })
  }
</script>
<template>
  <div class="card">
    <h2 class="text-xl font-bold mb-4">分类</h2>
    <ul>
      <li v-for="category in categories" :key="category.id" class="mb-2">
        <UButton
          class="w-full justify-between"
          color="neutral"
          variant="ghost"
          @click="handleClick(category.id)"
        >
          <span>{{ category.name }}</span>
          <span>
            {{ category.posts }}
          </span>
        </UButton>
      </li>
    </ul>
  </div>
</template>
