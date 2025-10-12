import type { H3Event, EventHandlerRequest } from 'h3'
import { createError } from 'h3'

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

