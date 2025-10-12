import prisma from '~~/lib/prisma'

export default defineEventHandler(async event => {
  const { slug } = getQuery(event)
  const post = await prisma.post.findUnique({
    where: { id: Number(slug) },
    include: {
      tags: true,
    },
  })

  const relatedPosts = await prisma.post.findMany({
    where: {
      id: {
        not: post?.id,
      },
      tags: {
        some: {
          tagId: {
            in: post?.tags.map(t => t.tagId) || [],
          },
        },
      },
    },
    select: {
      id: true,
      title: true,
      category: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: 3,
  })

  return relatedPosts.map(post => {
    return {
      id: post.id,
      title: post.title,
      date: post.createdAt,
    }
  })
})
