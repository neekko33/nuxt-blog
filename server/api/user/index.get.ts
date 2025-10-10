import { db } from '~~/server/db/db'
import { categoriesTable, postsTable, tagsTable } from '~~/server/db/schema'

export default defineEventHandler(async () => {
  const user = await db.query.usersTable.findFirst()
  const postsCount = await db.$count(postsTable)
  const categoriesCount = await db.$count(categoriesTable)
  const tagsCount = await db.$count(tagsTable)

  return {
    name: user.name,
    email: user.email,
    avatar_url: user.avatar_url,
    bio: user.bio,
    count: {
      posts: postsCount,
      categories: categoriesCount,
      tags: tagsCount,
    },
  }
})
