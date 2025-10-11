<script setup lang="ts">
  import { zh_cn } from '@nuxt/ui/locale'
  const route = useRoute()
  const layoutName = computed(() => {
    return route.path.startsWith('/panel') && !route.path.includes('login')
      ? 'admin'
      : 'default'
  })
</script>
<template>
  <div>
    <UApp :locale="zh_cn">
      <NuxtLayout :name="layoutName">
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
