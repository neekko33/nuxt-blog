import prisma from '~~/lib/prisma'

export default defineEventHandler(async event => {
  const id = getIdParam(event)
  try {
    await prisma.$transaction([
      prisma.postTag.deleteMany({
        where: { tagId: Number(id) },
      }),
      prisma.tag.delete({
        where: { id: Number(id) },
      }),
    ])
  } catch {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to delete tag',
    })
  }
  return { success: true }
})
