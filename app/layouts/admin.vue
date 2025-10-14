<script setup lang="ts">
useHead({
  title: 'Admin - Neekko33\'s Blog',
  meta: [
    {
      name: 'description',
      content: 'Admin dashboard for managing posts and settings on Neekko33\'s personal blog',
    },
  ],
})
</script>
<template>
  <UDashboardGroup>
    <AdminSidebar />
    <UDashboardPanel>
      <AdminHeader />
      <NuxtPage />
    </UDashboardPanel>
  </UDashboardGroup>
</template>
