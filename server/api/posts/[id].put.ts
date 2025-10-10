import { db } from '~~/server/db/db'
import { eq } from 'drizzle-orm'
import { postsTable, postsTagsTable } from '~~/server/db/schema'
export default defineEventHandler(async event => {
  const id = getIdParam(event)

  const { title, description, content, category_id, tag_ids } = await readValidatedBody(event, body => postSchema.parse(body))
  
  try {
    await db.transaction(async tx => {
      await tx.update(postsTable).set({ title, description, content, category_id }).where(eq(postsTable.id, Number(id)))
      await tx.delete(postsTagsTable).where(eq(postsTagsTable.post_id, Number(id)))
      if (tag_ids.length > 0) {
        await tx.insert(postsTagsTable).values(
          tag_ids.map(tag_id => ({
            post_id: Number(id),
            tag_id,
          }))
        )
      }
    })
  } catch {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to update post',
    })
  }

  return { success: true }
})