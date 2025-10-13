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
      label: '关于',
      to: '/about',
      active: route.path === '/about',
    },
  ])
</script>
<template>
  <UHeader style="z-index: 10001">
    <template #title>
      <h1 class="text-xl font-bold">Neekko33's Blog</h1>
    </template>
    <UNavigationMenu :items="items" color="neutral" />
    <template #right>
      <!-- <NuxtLink to="/search">
        <UButton variant="text" color="neutral">
          <Icon name="heroicons:magnifying-glass-20-solid" size="20" />
        </UButton>
      </NuxtLink> -->
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/neekko33"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UHeader>
</template>
