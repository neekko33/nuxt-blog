import prisma from '~~/lib/prisma'
export default defineEventHandler(async event => {
  const id = event.context.params?.id

  if (!id) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Post ID is required',
    })
  }

  const post = await prisma.post.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      category: true,
      tags: {
        include: {
          tag: true,
        }
      },
    },
  })

  if (!post) {
    return null
  }

  const formattedPost: Post = {
    id: post.id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    tags: post.tags.map(t => t.tag.name),
    category: post.category.name,
  }

  return formattedPost
})
