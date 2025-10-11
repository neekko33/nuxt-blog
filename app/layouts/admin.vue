<script setup lang="ts">
  definePageMeta({
    middleware: 'authenticated',
  })
</script>

<template>
  <UDashboardGroup>
    <AdminSidebar />
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar title="Inbox">
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>
        </UDashboardNavbar>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
