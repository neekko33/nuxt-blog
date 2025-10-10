<script setup lang="ts">
  const profile = ref()
  const user = await useFetch('/api/user')
  profile.value = user.data.value
</script>
<template>
  <div class="card">
    <div class="flex flex-col items-center justify-center">
      <UAvatar :src="profile.avatar_url" class="w-32 h-32 mb-2 ring-1 ring-gray-100"/>
      <h2 class="text-2xl font-bold mb-2">{{profile.name}}</h2>
      <p class="text-center text-gray-600">{{profile.bio}}</p>
      <div class="flex space-x-4 mt-6 w-full font-semibold">
        <div class="flex-1 text-center">
          <div>文章</div>
          <div>{{profile.count.posts}}</div>
        </div>
        <div class="flex-1 text-center">
          <div>分类</div>
          <div>{{profile.count.categories}}</div>
        </div>
        <div class="flex-1 text-center">
          <div>标签</div>
          <div>{{profile.count.tags}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
