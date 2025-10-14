import prisma from "~~/lib/prisma"
export default defineEventHandler(async event => {
  const session = await requireUserSession(event)

  const userId = session.user.id
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      avatar: true,
      bio: true,
      email: true,
    },
  })

  return user
})