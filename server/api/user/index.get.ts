import { prisma } from '~~/server/db/db'

export default defineEventHandler(async () => {
  const user = await prisma.user.findFirst({
    omit: ['password', 'createdAt', 'updatedAt'],
  })
  const postsCount = await prisma.post.count()
  const categoriesCount = await prisma.category.count()
  const tagsCount = await prisma.tag.count()

  return {
    ...user,
    postsCount,
    categoriesCount,
    tagsCount,
  }
})
