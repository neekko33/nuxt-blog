<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  const route = useRoute()

  const items = computed<NavigationMenuItem[]>(() => [
    {
      label: '首页',
      to: '/',
      active: route.path === '/',
    },
    {
      label: '归档',
      to: '/archive',
      active: route.path === '/archive',
    },
    {
      label: '关于',
      to: '/about',
      active: route.path === '/about',
    },
  ])
</script>
<template>
  <UHeader>
    <template #title>
      <NuxtLink to="/" class="text-xl font-bold">Neekko33's Blog</NuxtLink>
    </template>
    <UNavigationMenu :items="items" />
  </UHeader>
</template>
