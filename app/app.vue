<script setup lang="ts">
  import { zh_cn } from '@nuxt/ui/locale'
  const route = useRoute()
  const layoutName = computed(() => {
    if (route.path === '/panel/login') {
      return ''
    }

    return route.path.startsWith('/panel') ? 'admin' : 'blog'
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
