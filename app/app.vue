<script setup lang="ts">
import { zh_cn } from '@nuxt/ui/locale';
</script>
<template>
  <div>
    <UApp :locale="zh_cn">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
