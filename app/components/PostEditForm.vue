<script setup lang="ts">
  import { MdEditor } from 'md-editor-v3'
  import 'md-editor-v3/lib/style.css'

  const props = defineProps({
    post: {
      type: Object as () => Post,
      required: false,
      default: () => ({
        title: '',
        content: '',
        category: '',
        tags: [],
      }),
    },
  })

  const [{ data: tagsData }, { data: categoriesData }] = await Promise.all([
    useFetch('/api/tags'),
    useFetch('/api/categories'),
  ])

  const tags = computed(() =>
    TagOrCategoryResponseSchema.array().parse(tagsData.value?.data || [])
  )
  const tagOptions = computed(() =>
    tags.value.map(t => ({ label: t.name, value: t.id }))
  )
  const categories = computed(() =>
    TagOrCategoryResponseSchema.array().parse(categoriesData.value?.data || [])
  )
  const categoryOptions = computed(() =>
    categories.value.map(c => ({ label: c.name, value: c.id }))
  )

  const editPost = reactive({
    ...props.post,
    categoryId:
      categories.value.find(c => c.name === props.post.category)?.id ||
      undefined,
    tagIds: props.post.tags
      .map(t => tags.value.find(tag => tag.name === t)?.id || null)
      .filter(Boolean) as number[],
  })

  const toast = useToast()
  const handleSubmit = async () => {
    const payload = {
      title: editPost.title,
      content: editPost.content,
      categoryId: editPost.categoryId,
      tagIds: editPost.tagIds,
    }
    try {
      if (!editPost.id) {
        await $fetch('/api/admin/posts', {
          method: 'POST',
          body: payload,
        })
      } else {
        await $fetch(`/api/admin/posts/${editPost.id}`, {
          method: 'PUT',
          body: payload,
        })
      }
      toast.add({
        description: '文章保存成功',
        color: 'success',
      })
      navigateTo('/admin/posts')
    } catch {
      toast.add({
        description: '保存文章失败，请稍后重试',
        color: 'error',
      })
    }
  }
</script>
<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <h1 class="text-2xl font-bold">{{ editPost.id ? '编辑文章' : '新建文章' }}</h1>
      <div>
        <UButton
          to="/admin/posts"
          color="neutral"
          variant="subtle"
          class="mr-4"
        >
          返回列表
        </UButton>
        <UButton
          color="primary"
          class="cursor-pointer"
          variant="subtle"
          @click="handleSubmit"
        >
          保存修改
        </UButton>
      </div>
    </div>
    <UForm class="space-y-6">
      <div class="flex space-x-4">
        <UFormField label="标题" class="flex-1">
          <UInput
            v-model="editPost.title"
            class="w-full"
            name="title"
            placeholder="请输入文章标题"
            required
          />
        </UFormField>
        <UFormField label="分类" class="w-1/5">
          <USelect
            v-model="editPost.categoryId"
            :items="categoryOptions"
            class="w-full"
            name="category"
            placeholder="请选择文章分类"
          />
        </UFormField>
        <UFormField label="标签" class="w-1/4">
          <USelect
            v-model="editPost.tagIds"
            :items="tagOptions"
            class="w-full"
            name="tags"
            placeholder="请选择文章标签"
            multiple
          />
        </UFormField>
      </div>
      <!-- <div>
        <UFormField label="简介">
          <UTextarea
            v-model="editPost.description"
            class="w-full"
            name="description"
            placeholder="请输入文章简介"
            :rows="4"
          />
        </UFormField>
      </div> -->
      <div>
        <UFormField label="内容">
          <MdEditor v-model="editPost.content" />
        </UFormField>
      </div>
    </UForm>
  </div>
</template>
