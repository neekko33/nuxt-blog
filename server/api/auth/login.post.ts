import bcrypt from 'bcryptjs'
import { z } from 'zod'
import prisma from '~~/lib/prisma'

const SignInSchema = z.object({
  email: z.email({ message: '请输入有效的邮箱地址' }).trim(),
  password: z.string().min(6, { message: '密码长度至少为6位' }).trim(),
})

export default defineEventHandler(async event => {
  const { email, password } = await readValidatedBody(event, body =>
    SignInSchema.parse(body)
  )

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: '邮箱或密码错误',
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: '邮箱或密码错误',
    })
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    },
  })

  return {}
})
