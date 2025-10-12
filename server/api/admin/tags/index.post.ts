import prisma from '~~/lib/prisma'

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, body =>
    TagOrCategoryRequestSchema.parse(body)
  )

  try {
    await prisma.tag.create({
      data: body,
    })
  } catch {
    createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to create tag',
    })
  }

  return { success: true }
})
