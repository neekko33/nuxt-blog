import { prisma } from '~~/server/db/db'

export default defineEventHandler(async event => {
  const { title, content, categoryId, tagIds } =
    await readValidatedBody(event, body => postSchema.parse(body))

  const user = await prisma.user.findFirst({
    select: {
      id: true,
    },
  })

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'User not found',
    })
  }

  try {
    await prisma.$transaction(async tx => {
      const newPost = await tx.post.create({
        data: {
          title,
          content,
          categoryId,
          authorId: user.id,
        },
      })

      if (tagIds.length) {
        await tx.postTag.createMany({
          data: tagIds.map(tagId => ({
            postId: newPost.id,
            tagId,
          }))
        })
      }
    })
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to create post.ERR: ' + (e as Error).message,
    })
  }

  return { success: true }
})
