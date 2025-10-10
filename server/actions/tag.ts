'use server'
import { db } from '@/lib/db/db'
import { tagsTable } from '@/lib/db/schema'
import { Tag } from '@/types/types'

export async function getAllTags() {
  const tags: Tag[] = await db.select().from(tagsTable)
  return tags
}

export async function getTags(pageNum: number, pageSize: number) {
  const total = await db.$count(tagsTable)
  const tags = await db.query.tagsTable.findMany({
    limit: pageSize,
    offset: (pageNum - 1) * pageSize,
  })

  return {
    data: tags,
    total,
  }
}
