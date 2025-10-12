import { prisma } from '~~/server/db/db'
export default defineEventHandler(async event => {
  const { pageNum = '1', pageSize = '10' } = getQuery(event)
  
  const tags = await prisma.tag.findMany({
    include: { posts: true },
    orderBy: { updatedAt: 'desc' },
    take: Number(pageSize),
    skip: (Number(pageNum) - 1) * Number(pageSize),
  })

  const total = await prisma.tag.count()

  const response = tags.map(tag => ({
    ...tag,
    posts: tag.posts.length,
  }))

  return {
    data: response,
    total,
  }
})
