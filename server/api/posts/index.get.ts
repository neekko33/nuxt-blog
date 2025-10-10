import { db } from '~~/server/db/db'
import { postsTable } from '~~/server/db/schema'
import { eq, and, desc } from 'drizzle-orm'

async function getTotal(category: string = '', tag: string = '') {
  const total = await db.$count(
    postsTable,
    and(
      tag
        ? exists(
            db
              .select()
              .from(postsTagsTable)
              .where(
                and(
                  eq(postsTagsTable.post_id, postsTable.id),
                  eq(postsTagsTable.tag_id, Number(tag))
                )
              )
          )
        : undefined,
      category ? eq(postsTable.category_id, Number(category)) : undefined
    )
  )

  return total
}

export default defineEventHandler(async event => {
  const { pageNum = '1', pageSize = '10', category = '', tag = '' } = getQuery(event)

  const total = await getTotal(category, tag)
  const posts = await db.query.postsTable.findMany({
    where: (postsTable, { exists, and, eq }) =>
      and(
        tag
          ? exists(
              db
                .select()
                .from(postsTagsTable)
                .where(
                  and(
                    eq(postsTagsTable.post_id, postsTable.id),
                    eq(postsTagsTable.tag_id, Number(tag))
                  )
                )
            )
          : undefined,
        category ? eq(postsTable.category_id, Number(category)) : undefined
      ),
    with: {
      category: true,
      postsTags: {
        with: {
          tag: true,
        },
      },
    },
    orderBy: [desc(postsTable.created_at)],
    limit: pageSize,
    offset: (pageNum - 1) * pageSize,
  })

  const postsFormatted: Post[] = posts.map(post => ({
    id: post.id,
    title: post.title,
    description: post.description,
    created_at: post.created_at,
    category: post.category.name,
    tags: post.postsTags.map(pt => pt.tag),
  }))

  return {
    data: postsFormatted,
    total,
  }
})
