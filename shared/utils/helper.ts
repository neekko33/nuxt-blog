import { z } from 'zod'
import type { H3Event, EventHandlerRequest } from 'h3'

export const postSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
  content: z.string().min(1),
  category_id: z.number().int().positive(),
  tag_ids: z.array(z.number().int().positive()),
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

