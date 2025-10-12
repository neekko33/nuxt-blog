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
  createdAt: Date
  updatedAt: Date
}

export type Category = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  posts?: { id: number }[]
}

export type User = {
  id: number
  email: string
  name: string
  avatar: string
  bio: string
}
