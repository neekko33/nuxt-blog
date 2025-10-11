<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  const items: NavigationMenuItem[][] = [
    [
      {
        label: '仪表盘',
        icon: 'i-lucide-house',
        active: true,
      },
      {
        label: '文章管理',
        icon: 'i-lucide-file-heart',
      },
      {
        label: '分类管理',
        icon: 'i-lucide-folder',
      },
      {
        label: '标签管理',
        icon: 'i-lucide-tag',
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
    ],
  ]
</script>
<template>
  <UDashboardSidebar
    collapsible
    resizable
    :ui="{ footer: 'border-t border-default' }"
  >
    <template #header="{ collapsed }">
      <Logo v-if="!collapsed" class="h-5 w-auto shrink-0" />
      <UIcon
        v-else
        name="i-simple-icons-nuxtdotjs"
        class="size-5 text-primary mx-auto"
      />
    </template>

    <template #default="{ collapsed }">
      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[0]"
        orientation="vertical"
      />

      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[1]"
        orientation="vertical"
        class="mt-auto"
      />
    </template>

    <template #footer="{ collapsed }">
      <UButton
        :avatar="{
          src: 'https://github.com/benjamincanac.png',
        }"
        :label="collapsed ? undefined : 'Benjamin'"
        color="neutral"
        variant="ghost"
        class="w-full"
        :block="collapsed"
      />
    </template>
  </UDashboardSidebar>
</template>
