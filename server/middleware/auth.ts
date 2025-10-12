export default defineEventHandler(async event => {
  if (event.path.startsWith('/api/admin')) {
    try {
      const { user } = await requireUserSession(event)
      if (!user) {
        throw createError({ statusCode: 401, statusMessage: '未授权' })
      }
    } catch {
      throw createError({ statusCode: 401, statusMessage: '未授权' })
    }
  }
})
