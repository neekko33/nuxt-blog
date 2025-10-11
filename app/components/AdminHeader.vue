<script setup lang="ts">
  const { clear: clearUserSession } = useUserSession()
  const logout = async () => {
    await clearUserSession()
    await navigateTo('/')
  }
</script>
<template>
  <UDashboardNavbar title="Inbox">
    <template #leading>
      <UDashboardSidebarCollapse />
    </template>
    <template #right>
      <UButton
        icon="i-lucide-user-2"
        color="error"
        variant="ghost"
        aria-label="Logout"
        @click="logout"
      >
        退出登录
      </UButton>
    </template>
  </UDashboardNavbar>
</template>
