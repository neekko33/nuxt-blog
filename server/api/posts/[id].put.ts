import { prisma } from '~~/server/db/db'
export default defineEventHandler(async event => {
  const id = getIdParam(event)

  const { title, content, categoryId, tagIds } = await readValidatedBody(
    event,
    body => postSchema.parse(body)
  )

  try {
    await prisma.$transaction(async tx => {
      await tx.post.update({
        where: { id: Number(id) },
        data: { title, content, categoryId },
      })
      await tx.postTag.deleteMany({
        where: { postId: Number(id) },
      })
      if (tagIds.length > 0) {
        await tx.postTag.createMany({
          data: tagIds.map(tagId => ({
            postId: Number(id),
            tagId,
          })),
        })
      }
    })
  } catch {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to update post',
    })
  }
  return { success: true }
})
