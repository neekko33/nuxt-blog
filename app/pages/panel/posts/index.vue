<script setup lang="ts">
  import type { TableColumn } from '@nuxt/ui'

  const pageNum = ref(1)
  const pageSize = ref(10)
  const { data, refresh } = await useFetch('/api/posts', {
    query: { pageNum: pageNum, pageSize: pageSize },
    watch: [pageNum],
  })

  const posts = computed(() =>
    PostResponseSchema.array().parse(data.value?.data || [])
  )

  const columns: TableColumn<Post>[] = [
    {
      header: '#',
      cell: info => info.row.index + 1 + (pageNum.value - 1) * pageSize.value,
    },
    {
      header: '标题',
      accessorKey: 'title',
    },
    {
      header: '分类',
      accessorKey: 'category',
    },
    {
      header: '标签',
      id: 'tags',
    },
    {
      header: '创建时间',
      accessorKey: 'createdAt',
      cell: info => (info.getValue() as Date).toLocaleDateString(),
    },
    {
      header: '更新时间',
      accessorKey: 'updatedAt',
      cell: info => (info.getValue() as Date).toLocaleDateString(),
    },
    {
      id: 'action',
    },
  ]

  const toast = useToast()
  const handleDeletePost = async (id: number, close: () => void) => {
    try {
      await $fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      })
      refresh()
      toast.add({
        title: '文章删除成功',
        color: 'success',
      })
    } catch {
      toast.add({
        title: '文章删除失败',
        color: 'error',
      })
    } finally {
      close()
    }
  }
</script>
<template>
  <div class="p-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold mb-4">文章管理</h1>
      <UButton :to="'/panel/posts/create'" class="mb-4" variant="soft" icon="i-lucide-plus">新建文章</UButton>
    </div>
    <UTable :data="posts" :columns="columns" class="flex-1">
      <template #tags-cell="{ row }">
        <div class="flex space-x-2">
          <UBadge
            v-for="tag in row.original.tags"
            :key="tag"
            size="md"
            variant="outline"
          >
            {{ tag }}
          </UBadge>
        </div>
      </template>
      <template #action-cell="{ row }">
        <div class="flex space-x-2">
          <UButton :to="`/panel/posts/edit/${row.original.id}`" variant="ghost"
            >编辑</UButton
          >
          <UModal
            title="文章删除"
            :close="true"
            :ui="{ header: 'border-0', body: 'border-0' }"
          >
            <UButton variant="ghost" color="error"> 删除 </UButton>
            <template #body>
              <p>确认删除此文章吗？</p>
            </template>
            <template #footer="{close}">
              <div class="flex justify-end w-full">
                <UButton
                  color="error"
                  size="lg"
                  @click="handleDeletePost(Number(row.original.id), close)"
                  >确认</UButton
                >
              </div>
            </template>
          </UModal>
        </div>
      </template>
    </UTable>
    <div class="w-full flex justify-center mt-6">
      <UPagination
        v-model:page="pageNum"
        :total="data?.total"
        :page-size="pageSize"
        class="mt-4"
      />
    </div>
  </div>
</template>
