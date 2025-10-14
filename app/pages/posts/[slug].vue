<script setup lang="ts">
  import { MdPreview } from 'md-editor-v3'
  import 'md-editor-v3/lib/preview.css'

  const post = ref<Post>()
  const text = ref()
  const id = 'preview-only'

  const slug = useRoute().params.slug as string
  const { data } = await useFetch(`/api/posts/${slug}`)
  post.value = data.value
  text.value = post.value?.content

  const relatedPosts = ref<Post[]>([])
  const { data: relatedData } = await useFetch('/api/posts/related', {
    params: { slug: slug },
  })
  relatedPosts.value = relatedData.value

  useHead({
    title: post.value?.title || "Neekko33's Blog",
    meta: [
      {
        name: 'description',
        content: post.value?.title || "Neekko33's personal blog",
      },
    ],
  })
</script>
<template>
  <UPage>
    <UPageBody>
      <div v-if="post">
        <div class="mb-8">
          <h3 class="text-center mb-6 text-gray-400 font-semibold">
            {{ formatDate(post.createdAt) }}
          </h3>
          <h1 class="text-4xl font-bold text-center">{{ post.title }}</h1>
        </div>
        <MdPreview :id="id" :model-value="text" preview-theme="github" />
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

        <div v-if="relatedPosts?.length">
          <UBlogPosts orientation="horizontal">
            <UBlogPost
              v-for="relatedPost in relatedPosts"
              :key="relatedPost.id"
              :to="`/posts/${relatedPost.id}`"
              :title="relatedPost.title"
              :date="relatedPost.createdAt"
              :ui="{ title: 'text-lg' }"
            />
          </UBlogPosts>
        </div>
      </div>
    </UPageBody>
  </UPage>
</template>
