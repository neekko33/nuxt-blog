import { db } from '~~/server/db/db'
import { categoriesTable } from '~~/server/db/schema'
import { desc } from 'drizzle-orm'
export default defineEventHandler(async event => {
  const { pageNum = '1', pageSize = '10' } = getQuery(event)

  const categories = await db.query.categoriesTable.findMany({
    with: {
      posts: {
        id: true,
      }
    },
    orderBy: [desc(categoriesTable.created_at)],
    limit: Number(pageSize),
    offset: (Number(pageNum) - 1) * Number(pageSize),
  })

  const total = await db.$count(categoriesTable)

  return {
    data: categories,
    total,
  }
})
