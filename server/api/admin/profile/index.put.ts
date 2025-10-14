import prisma from '~~/lib/prisma'
import bcrypt from 'bcryptjs'
import { userProfileRequestSchema } from '~~/shared/utils/schema'

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, body =>
    userProfileRequestSchema.parse(body)
  )

  const userId = (await requireUserSession(event)).user.id
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  const { currentPassword, newPassword, ...data } = body

  if (currentPassword && newPassword) {
    console.log(currentPassword)
    const isPasswordValid =
      user && (await bcrypt.compare(currentPassword || '', user.password))

    if (!isPasswordValid) {
      return createError({
        statusCode: 404,
        statusMessage: 'Not Found',
        message: 'UnAuthorized',
      })
    }
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        ...(newPassword
          ? { password: await bcrypt.hash(newPassword, 10) }
          : {}),
      },
    })

    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    })
    
    return { success: true }
  } catch (error) {
    console.error(error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to update profile',
    })
  }
})
