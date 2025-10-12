import { prisma } from '~~/server/db/db'
export default defineEventHandler(async event => {
  const { pageNum = '1', pageSize = '10' } = getQuery(event)

  const categories = await prisma.category.findMany({
    include: {
      posts: {
        select: {
          id: true,
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
    take: Number(pageSize),
    skip: (Number(pageNum) - 1) * Number(pageSize),
  })

  const total = await prisma.category.count()
  const response = categories.map(category => ({
    ...category,
    posts: category.posts.length,
  }))

  return {
    data: response,
    total,
  }
})
