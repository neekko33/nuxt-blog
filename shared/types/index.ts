export type Post = {
  id: number
  title: string
  content?: string
  createdAt: Date
  updatedAt?: Date
  tags: string[]
  category?: string
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
