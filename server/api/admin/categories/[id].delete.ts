import prisma from '~~/lib/prisma'

export default defineEventHandler(async event => {
  const id = getIdParam(event)
  try {
    await prisma.category.delete({
      where: { id: Number(id) },
    })
  } catch {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to delete category',
    })
  }
  return { success: true }
})
