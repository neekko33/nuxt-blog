import { prisma } from '~~/server/db/db'

async function getTotal(categoryId: string = '', tagId: string = '') {
  const total = await prisma.post.count({
    where: {
      categoryId: categoryId ? Number(categoryId) : undefined,
      tags: {
        some: {
          tagId: tagId ? Number(tagId) : undefined
        }
      }
    }
  })
  return total
}

export default defineEventHandler(async event => {
  const {
    pageNum = '1',
    pageSize = '10',
    category = '',
    tag = '',
  } = getQuery(event)

  const total = await getTotal(category as string, tag as string)
  const posts = await prisma.post.findMany({
    where: {
      categoryId: category ? Number(category) : undefined,
      tags: {
        some: {
          tagId: tag ? Number(tag) : undefined
        }
      }
    },
    include: {
      category: true,
      tags: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    skip: (Number(pageNum) - 1) * Number(pageSize),
    take: Number(pageSize),
  })

  const postsFormatted: Post[] = posts.map(post => ({
    id: post.id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    category: post.category.name,
    tags: post.tags,
  }))

  return {
    data: postsFormatted,
    total,
  }
})
