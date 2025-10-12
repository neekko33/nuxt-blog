<script setup lang="ts">
  import type { TableColumn } from '@nuxt/ui'

  const pageNum = ref(1)
  const pageSize = ref(10)
  const { data, refresh } = await useFetch('/api/tags', {
    query: { pageNum: pageNum, pageSize: pageSize },
    watch: [pageNum],
  })

  const tags = computed(() =>
    TagOrCategoryResponseSchema.array().parse(data.value?.data || [])
  )

  const columns: TableColumn<Tag>[] = [
    {
      header: '#',
      cell: info => info.row.index + 1 + (pageNum.value - 1) * pageSize.value,
    },
    {
      header: '名称',
      accessorKey: 'name',
    },
    {
      header: '文章数量',
      accessorKey: 'posts',
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
  const editTag = reactive({
    name: '',
  })

  const handleEditTag = async (id: number, close: () => void) => {
    try {
      await $fetch(`/api/admin/tags/${id}`, {
        method: 'PUT',
        body: { name: editTag.name },
      })
      refresh()
      toast.add({
        title: '标签更新成功',
        color: 'success',
      })
      close()
    } catch {
      toast.add({
        title: '标签更新失败',
        color: 'error',
      })
    }
  }

  const handleDeleteTag = async (id: number, close: () => void) => {
    try {
      await $fetch(`/api/admin/tags/${id}`, {
        method: 'DELETE',
      })
      refresh()
      toast.add({
        title: '标签删除成功',
        color: 'success',
      })
    } catch {
      toast.add({
        title: '标签删除失败',
        color: 'error',
      })
    } finally {
      close()
    }
  }
  
  const handleCreateTag = async (close: () => void) => {
    try {
      await $fetch('/api/admin/tags', {
        method: 'POST',
        body: { name: editTag.name },
      })
      refresh()
      toast.add({
        title: '标签创建成功',
        color: 'success',
      })
      close()
    } catch {
      toast.add({
        title: '标签创建失败',
        color: 'error',
      })
    }
  }
</script>
<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold mb-4">分类管理</h1>
      <UModal title="编辑分类" :close="true">
        <UButton
          class="mb-4"
          variant="soft"
          icon="i-lucide-plus"
          @click="editTag.name = ''"
          >新建标签</UButton
        >
        <template #body>
          <UForm>
            <UFormField label="名称" class="flex-1">
              <UInput v-model="editTag.name" />
            </UFormField>
          </UForm>
        </template>
        <template #footer="{ close }">
          <div class="flex justify-end w-full">
            <UButton
              size="lg"
              @click="handleCreateTag(close)"
              >确认</UButton
            >
          </div>
        </template>
      </UModal>
    </div>
    <UTable :data="tags" :columns="columns" class="flex-1">
      <template #action-cell="{ row }">
        <div class="flex space-x-2">
          <UModal title="编辑标签" :close="true">
            <UButton
              variant="ghost"
              @click="editTag.name = row.original.name"
            >
              编辑
            </UButton>
            <template #body>
              <UForm>
                <UFormField label="名称" class="flex-1">
                  <UInput v-model="editTag.name" />
                </UFormField>
              </UForm>
            </template>
            <template #footer="{ close }">
              <div class="flex justify-end w-full">
                <UButton
                  size="lg"
                  @click="handleEditTag(Number(row.original.id), close)"
                  >确认</UButton
                >
              </div>
            </template>
          </UModal>
          <UModal
            title="标签删除"
            :close="true"
            :ui="{ header: 'border-0', body: 'border-0' }"
          >
            <UButton variant="ghost" color="error"> 删除 </UButton>
            <template #body>
              <p>确认删除此标签吗？</p>
            </template>
            <template #footer="{ close }">
              <div class="flex justify-end w-full">
                <UButton
                  color="error"
                  size="lg"
                  @click="handleDeleteTag(Number(row.original.id), close)"
                  >确认</UButton
                >
              </div>
            </template>
          </UModal>
        </div>
      </template>
    </UTable>
    <div
      v-if="data?.total && data.total > pageSize"
      class="w-full flex justify-center mt-6"
    >
      <UPagination
        v-model:page="pageNum"
        :total="data?.total"
        :page-size="pageSize"
        class="mt-4"
      />
    </div>
  </div>
</template>
