import { prisma } from "~~/server/db/db"
export default defineEventHandler(async (event) => {
  const id = getIdParam(event)

  try {
    await prisma.post.delete({
      where: {
        id: Number(id)
      }
    })
  } catch {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to delete post',
    })
  }

  return { success: true }
})