import { z } from 'zod'
import type { H3Event, EventHandlerRequest } from 'h3'

export const postSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  categoryId: z.number().int().positive(),
  tagIds: z.array(z.number().int().positive()),
})

export const TagOrCategorySchema = z.object({
  name: z.string().min(1).max(100),
})

export const getIdParam = (event: H3Event<EventHandlerRequest>) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Post ID is required',
    })
  }

  return id
}

