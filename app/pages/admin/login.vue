<script setup lang="ts">
  import * as z from 'zod'
  import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

  const toast = useToast()

  const fields: AuthFormField[] = [
    {
      name: 'email',
      type: 'email',
      label: '邮箱',
      placeholder: '输入您的邮箱',
      required: true,
    },
    {
      name: 'password',
      label: '密码',
      type: 'password',
      placeholder: '输入您的密码',
      required: true,
    },
  ]

  const schema = z.object({
    email: z.email('Invalid email'),
    password: z
      .string('Password is required')
      .min(8, 'Must be at least 8 characters'),
  })

  type Schema = z.output<typeof schema>

  const { fetch: refreshSession } = useUserSession()
  async function onSubmit(payload: FormSubmitEvent<Schema>) {
    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: payload.data,
      })
      await refreshSession()
      toast.add({
        title: '登录成功',
        description: '欢迎回来！',
        color: 'success',
      })
      await navigateTo('/admin/posts', {
        external: true,
      })
    } catch {
      toast.add({
        title: '登录失败',
        description: '请检查您的凭据并重试。',
        color: 'error',
      })
    }
  }

  useHead({
    title: 'Admin Login - Neekko33\'s Blog',
    meta: [
      {
        name: 'description',
        content: 'Admin login page for Neekko33\'s personal blog',
      },
    ],
  })
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 p-4 bg-gray-100 h-screen"
  >
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="登录"
        description="输入您的凭据以访问您的帐户。"
        icon="i-lucide-user"
        :fields="fields"
        separator="或"
        :submit="{
          label: '登录',
          color: 'neutral',
        }"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
