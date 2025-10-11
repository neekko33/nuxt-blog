<script setup lang="ts"></script>
<template>
  <div class="py-6 flex space-x-6">
    <div class="w-[350px] space-y-4">
      <AuthorInfo />
      <CategoriesCard />
    </div>
    <div class="flex-1">
      <ArticlesList />
    </div>
  </div>
</template>
