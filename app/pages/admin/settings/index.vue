<script setup lang="ts">
  const items = [
    {
      label: '个人信息',
      icon: 'i-lucide-user',
      slot: 'account',
    },
    {
      label: '密码修改',
      icon: 'i-lucide-lock',
      slot: 'password',
    },
  ]

  const state = reactive({
    name: '',
    email: '',
    bio: '',
    avatar: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const { data } = await useFetch('/api/admin/profile')

  state.name = data.value?.name || ''
  state.email = data.value?.email || ''
  state.bio = data.value?.bio || ''
  state.avatar = data.value?.avatar || ''

  const toast = useToast()
  const handleUpdateProfile = async (type: 'profile' | 'password') => {
    if (type === 'password' && state.newPassword !== state.confirmPassword) {
      toast.add({
        title: '错误',
        description: '新密码和确认密码不匹配',
        color: 'error',
      })
      return
    }

    const body = type === 'profile'
      ? {
          name: state.name,
          email: state.email,
          bio: state.bio,
          avatar: state.avatar,
        }
      : {
          currentPassword: state.currentPassword,
          newPassword: state.newPassword,
        }

    try {
      await $fetch('/api/admin/profile', {
        method: 'PUT',
        body,
      })
      toast.add({
        title: '成功',
        description: '更新成功',
        color: 'success',
      })

      handleTabChange()
    } catch (error) {
      console.error('Failed to update profile:', error)
      toast.add({
        title: '错误',
        description: (error as Error).message || '更新失败',
        color: 'error',
      })
    }
  }

  const handleTabChange = () => {
    state.currentPassword = ''
    state.newPassword = ''
    state.confirmPassword = ''
  }
</script>
<template>
  <div class="flex justify-center h-full p-12">
    <UTabs :items="items" :ui="{ root: 'w-3xl' }" @update:model-value="handleTabChange">
      <template #account>
        <UForm :state="state" class="flex flex-col gap-6 pt-6">
          <UFormField label="姓名" name="name">
            <UInput v-model="state.name" class="w-full" />
          </UFormField>
          <UFormField label="邮箱" name="email">
            <UInput v-model="state.email" class="w-full" />
          </UFormField>
          <UFormField label="个人简介" name="bio">
            <UInput v-model="state.bio" class="w-full" />
          </UFormField>
          <UFormField label="头像URL" name="avatar">
            <UInput v-model="state.avatar" class="w-full" />
          </UFormField>
          <UButton type="button" color="primary" class="text-center w-full" size="lg" @click="handleUpdateProfile('profile')">保存更改</UButton>
        </UForm>
      </template>

      <template #password>
        <UForm :state="state" class="flex flex-col gap-6 pt-6">
          <UFormField label="当前密码" name="current" required>
            <UInput
              v-model="state.currentPassword"
              type="password"
              required
              placeholder="请输入当前密码"
              class="w-full"
            />
          </UFormField>
          <UFormField label="新密码" name="new" required>
            <UInput
              v-model="state.newPassword"
              type="password"
              required
              placeholder="请输入新密码"
              class="w-full"
            />
          </UFormField>
          <UFormField label="确认密码" name="confirm" required>
            <UInput
              v-model="state.confirmPassword"
              type="password"
              required
              placeholder="请输入确认密码"
              class="w-full"
            />
          </UFormField>
          <UButton type="button" color="primary" class="text-center w-full" size="lg" @click="handleUpdateProfile('password')">保存更改</UButton>
        </UForm>
      </template>
    </UTabs>
  </div>
</template>
