import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  const id = getIdParam(event)

  try {
    await db.delete(postsTable).where(eq(postsTable.id, Number(id)))
  } catch {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to delete post',
    })
  }

  return { success: true }
})