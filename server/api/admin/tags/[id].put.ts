import { prisma } from '~~/server/db/db'
export default defineEventHandler(async event => {
  const id = getIdParam(event)
  const body = await readValidatedBody(event, body => TagOrCategoryRequestSchema.parse(body))

  const tag = await prisma.tag.update({
    where: { id: Number(id) },
    data: body,
  })
  
  return tag
})