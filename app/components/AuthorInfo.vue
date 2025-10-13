<script setup lang="ts">
  const profile = ref()
  const user = await useFetch('/api/user')
  profile.value = user.data.value
</script>
<template>
  <div class="flex flex-col items-center justify-center">
    <UAvatar
      :src="profile.avatar"
      class="w-16 h-16 mb-2 ring-2 ring-gray-200"
    />
    <h2 class="text-2xl font-bold mb-2">{{ profile.name }}</h2>
    <p class="text-center text-gray-600">{{ profile.bio }}</p>
  </div>
</template>
