<script setup lang="ts"></script>
<template>
  <div class="pt-6 flex space-x-6">
    <div class="w-[350px] space-y-4">
      <AuthorInfo />
      <CategoriesCard />
      <TagsCard />
    </div>
    <div class="flex-1">
      <ArticlesList />
    </div>
  </div>
</template>
