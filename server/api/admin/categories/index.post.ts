import { prisma } from '~~/server/db/db'

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, body =>
    TagOrCategoryRequestSchema.parse(body)
  )

  try {
    await prisma.category.create({
      data: body,
    })
  } catch {
    createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to create category',
    })
  }

  return { success: true }
})
