import { db } from '~~/server/db/db'
import { postsTable, postsTagsTable } from '~~/server/db/schema'

export default defineEventHandler(async event => {
  const { title, description, content, category_id, tag_ids } =
    await readValidatedBody(event, body => postSchema.parse(body))

  const user = await db.query.usersTable.findFirst()

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'User not found',
    })
  }

  try {
    await db.transaction(async tx => {
      const [newPost] = await tx
        .insert(postsTable)
        .values({
          title,
          description,
          content,
          category_id,
          user_id: user.id,
        })
        .returning()

      if (tag_ids.length > 0) {
        await tx.insert(postsTagsTable).values(
          tag_ids.map(tag_id => ({
            post_id: newPost.id,
            tag_id,
          }))
        )
      }
    })
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to create post.ERR: ' + (e as Error).message,
    })
  }

  return { success: true }
})
