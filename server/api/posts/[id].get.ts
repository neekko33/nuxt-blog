import { eq } from 'drizzle-orm'
import { db } from '~~/server/db/db'
import { postsTable } from '~~/server/db/schema'
export default defineEventHandler(async event => {
  const id = event.context.params?.id

  if (!id) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Post ID is required',
    })
  }

  const post = await db.query.postsTable.findFirst({
    where: eq(postsTable.id, Number(id)),
    with: {
      category: true,
      postsTags: {
        with: {
          tag: true,
        },
      },
    },
  })

  if (!post) {
    return null
  }

  const formattedPost: Post = {
    id: post.id,
    title: post.title,
    description: post.description,
    content: post.content,
    created_at: post.created_at,
    tags: post.postsTags.map(pt => pt.tag),
    category: post.category,
  }

  return formattedPost
})
