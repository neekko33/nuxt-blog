<script setup lang="ts"></script>

<template>
  <UFooter class="h-20 flex items-center">
    <template #left>
      <p class="text-muted text-sm">
        Neekko33's Blog © {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <p class="text-muted text-sm">
        Powered by
        <a href="https://nuxt.com" target="_blank" class="font-semibold">
          Nuxt
        </a>
        &nbsp;&amp; Deployed on
        <a href="https://vercel.com" target="_blank" class="font-semibold">
          Vercel
        </a>
      </p>
    </template>
  </UFooter>
</template>
