<script setup lang="ts">
  import { zh_cn } from '@nuxt/ui/locale'
  const route = useRoute()
  const layoutName = computed<'admin' | 'blog' | false>(() => {
    if (route.path === '/admin/login') {
      return false
    }

    return route.path.startsWith('/admin') ? 'admin' : 'blog'
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
