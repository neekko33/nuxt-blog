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
    {
      name: 'remember',
      label: '记住我',
      type: 'checkbox',
    },
  ]

  const providers = [
    {
      label: 'Google',
      icon: 'i-simple-icons-google',
      onClick: () => {
        toast.add({ title: 'Google', description: 'Login with Google' })
      },
    },
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      onClick: () => {
        toast.add({ title: 'GitHub', description: 'Login with GitHub' })
      },
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
      await navigateTo('/admin')
    } catch {
      toast.add({
        title: '登录失败',
        description: '请检查您的凭据并重试。',
        type: 'error',
      })
      return
    }
  }
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
        :providers="providers"
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
