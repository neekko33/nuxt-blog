'use server'

import { db } from '@/lib/db/db'
import { postsTable, postsTagsTable } from '@/lib/db/schema'
import { desc, and, exists, eq } from 'drizzle-orm'
import { Post, Tag } from '@/types/types'

export async function getPostsCount() {
  return db.$count(postsTable)
}

export async function getTotal(category: string = '', tag: string = '') {
  const total = await db.$count(
    postsTable,
    and(
      tag
        ? exists(
            db
              .select()
              .from(postsTagsTable)
              .where(
                and(
                  eq(postsTagsTable.post_id, postsTable.id),
                  eq(postsTagsTable.tag_id, Number(tag))
                )
              )
          )
        : undefined,
      category ? eq(postsTable.category_id, Number(category)) : undefined
    )
  )

  return total
}

export async function getAllPosts(
  pageNum: number,
  pageSize: number,
  category: string = '',
  tag: string = ''
) {
  const total = await getTotal(category, tag)
  const posts = await db.query.postsTable.findMany({
    where: (postsTable, { exists, and, eq }) =>
      and(
        tag
          ? exists(
              db
                .select()
                .from(postsTagsTable)
                .where(
                  and(
                    eq(postsTagsTable.post_id, postsTable.id),
                    eq(postsTagsTable.tag_id, Number(tag))
                  )
                )
            )
          : undefined,
        category ? eq(postsTable.category_id, Number(category)) : undefined
      ),
    with: {
      category: true,
      postsTags: {
        with: {
          tag: true,
        },
      },
    },
    orderBy: [desc(postsTable.created_at)],
    limit: pageSize,
    offset: (pageNum - 1) * pageSize,
  })

  const postsFormatted: Post[] = posts.map(post => ({
    id: post.id,
    title: post.title,
    description: post.description,
    created_at: post.created_at,
    category: post.category.name,
    tags: post.postsTags.map(pt => pt.tag),
  }))

  return {
    data: postsFormatted,
    total,
  }
}

export async function getPostBySlug(slug: string) {
  const post = await db.query.postsTable.findFirst({
    where: eq(postsTable.id, Number(slug)),
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
}

export async function updatePost(
  postId: number,
  data: {
    title: string
    description: string
    content: string
    categoryId: number
    tagIds: number[]
  }
) {
  try {
    // 1. 更新文章基本信息
    await db
      .update(postsTable)
      .set({
        title: data.title,
        description: data.description,
        content: data.content,
        category_id: data.categoryId,
        updated_at: new Date(),
      })
      .where(eq(postsTable.id, postId))

    // 2. 删除旧的标签关联
    await db
      .delete(postsTagsTable)
      .where(eq(postsTagsTable.post_id, postId))

    // 3. 添加新的标签关联
    if (data.tagIds.length > 0) {
      await db.insert(postsTagsTable).values(
        data.tagIds.map(tagId => ({
          post_id: postId,
          tag_id: tagId,
        }))
      )
    }

    return { success: true }
  } catch (error) {
    console.error('Failed to update post:', error)
    throw new Error('更新文章失败')
  }
}
