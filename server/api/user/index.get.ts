import { prisma } from '~~/server/db/db'

export default defineEventHandler(async () => {
  const user = await prisma.user.findFirst({
    omit: {
      password: true,
      createdAt: true,
      updatedAt: true,
    }
  })
  const postsCount = await prisma.post.count()
  const categoriesCount = await prisma.category.count()
  const tagsCount = await prisma.tag.count()

  return {
    ...user,
    count: {
      posts: postsCount,
      categories: categoriesCount,
      tags: tagsCount,
    }
  }
})
