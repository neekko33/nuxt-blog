import { z } from 'zod'
export const PostResponseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  category: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
})

export const PostRequestSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  categoryId: z.number().int().positive(),
  tagIds: z.array(z.number().int().positive()).optional(),
})

export const TagOrCategoryRequestSchema = z.object({
  name: z.string().min(1).max(100),
})

export const TagOrCategoryResponseSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
})