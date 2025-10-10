import { db } from '~~/server/db/db'
import { tagsTable } from '~~/server/db/schema'
import { desc } from 'drizzle-orm'
export default defineEventHandler(async event => {
  const { pageNum = '1', pageSize = '10' } = getQuery(event)

  const tags = await db.query.tagsTable.findMany({
    orderBy: [desc(tagsTable.created_at)],
    limit: Number(pageSize),
    offset: (Number(pageNum) - 1) * Number(pageSize),
  })

  const total = await db.$count(tagsTable)

  return {
    data: tags,
    total,
  }
})
