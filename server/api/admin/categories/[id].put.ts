import prisma from '~~/lib/prisma'
export default defineEventHandler(async event => {
  const id = getIdParam(event)
  const body = await readValidatedBody(event, body => TagOrCategoryRequestSchema.parse(body))

  const category = await prisma.category.update({
    where: { id: Number(id) },
    data: body,
  })
  
  return category
})