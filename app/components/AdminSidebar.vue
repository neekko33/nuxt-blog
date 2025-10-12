<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  const items: NavigationMenuItem[] = [
    {
      label: '仪表盘',
      icon: 'i-lucide-house',
      href: '/panel',
    },
    {
      label: '文章管理',
      icon: 'i-lucide-file-heart',
      href: '/panel/posts',
    },
    {
      label: '分类管理',
      icon: 'i-lucide-folder',
      href: '/panel/categories',
    },
    {
      label: '标签管理',
      icon: 'i-lucide-tag',
      href: '/panel/tags',
    },
    {
      label: '个人设置',
      icon: 'i-lucide-settings',
      defaultOpen: true,
      children: [
        {
          label: '个人信息',
        },
        {
          label: '密码修改',
        },
      ],
    },
  ]

  const { user: userSession } = useUserSession()

  const user = computed(() => userSession.value as User | null)
</script>
<template>
  <UDashboardSidebar
    collapsible
    resizable
    :ui="{ footer: 'border-t border-default' }"
  >
    <template #header="{ collapsed }">
      <h1 v-if="!collapsed" class="font-semibold text-xl text-center w-full">
        Neekko33's Blog
      </h1>
      <UIcon
        v-else
        name="i-simple-icons-nuxtdotjs"
        class="size-5 text-primary mx-auto"
      />
    </template>

    <template #default="{ collapsed }">
      <UNavigationMenu
        :collapsed="collapsed"
        :items="items"
        orientation="vertical"
      />
    </template>

    <template #footer="{ collapsed }">
      <UButton
        :avatar="{
          src: user?.avatar,
          size: 'md',
        }"
        :label="collapsed ? undefined : user?.email"
        :ui="{ label: 'font-bold text-md ml-1' }"
        color="neutral"
        variant="ghost"
        class="w-full"
        :block="collapsed"
      />
    </template>
  </UDashboardSidebar>
</template>
