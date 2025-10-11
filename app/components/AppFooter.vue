<script setup lang="ts">
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">Neekko33's Blog © {{ new Date().getFullYear() }}</p>
    </template>

    <template #right>
      <p class="text-muted text-sm">
        Powered by
        <a href="https://nuxt.com" target="_blank" class="underline">
          Nuxt.js
        </a>
      </p>
    </template>
  </UFooter>
</template>