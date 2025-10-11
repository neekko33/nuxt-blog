<script setup lang="ts">
  import { MdPreview, MdCatalog } from 'md-editor-v3'
  import 'md-editor-v3/lib/preview.css'

  const post = ref<Post>()
  const text = ref()
  const id = 'preview-only'
  const scrollElement = 'body'

  const slug = useRoute().params.slug as string
  const { data } = await useFetch(`/api/posts/${slug}`)
  post.value = data.value
  text.value = post.value?.content

  const relatedPosts = ref<Post[]>([])
  const { data: relatedData } = await useFetch('/api/posts/related', {
    params: { slug: slug },
  })
  relatedPosts.value = relatedData.value
</script>
<template>
  <UPage>
    <UPageBody>
      <div class="bg-white shadow rounded-lg lg:py-12 py-6 lg:px-16 px-6">
        <h1 class="text-3xl font-bold text-center">{{ post.title }}</h1>
        <div
          class="flex items-center justify-center space-x-6 my-6 text-gray-500 text-sm"
        >
          <div class="inline-flex items-center space-x-1">
            <Icon name="heroicons:calendar-date-range-16-solid" size="16" />
            <span>{{ new Date(post.createdAt).toLocaleDateString() }} </span>
          </div>
          <div class="inline-flex items-center space-x-1">
            <Icon name="heroicons:archive-box-solid" size="16" />
            <span>{{ post.category }}</span>
          </div>
          <div class="inline-flex items-center space-x-1">
            <Icon name="heroicons:user-16-solid" size="16" />
            <span>Neekko33</span>
          </div>
        </div>
        <MdPreview :id="id" :model-value="text" />
        <MdCatalog :editor-id="id" :scroll-element="scrollElement" />

        <div class="mt-6">
          <UBadge
            v-for="tag in post.tags"
            :key="tag"
            color="neutral"
            variant="soft"
            class="mr-2"
          >
            {{ tag }}
          </UBadge>
        </div>

        <USeparator class="my-8" label="相关文章" />

        <div>
          <UBlogPosts orientation="horizontal">
            <UBlogPost
              v-for="relatedPost in relatedPosts"
              :key="relatedPost.slug"
              :to="`/posts/${relatedPost.id}`"
              :title="relatedPost.title"
              :date="relatedPost.date"
            />
          </UBlogPosts>
        </div>
      </div>
    </UPageBody>
  </UPage>
</template>
