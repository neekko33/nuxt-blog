export type Post = {
  id: number
  title: string
  content?: string
  createdAt: Date
  updatedAt?: Date
  tags: Tag[]
  category?: Category
}

export type Tag = {
  id: number
  name: string
}

export type Category = {
  id: number
  name: string
  posts?: { id: number }[]
}

export type User = {
  name: string
  avatarUrl: string
  bio: string
}
