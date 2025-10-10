import { prisma } from './db'
import bcryptjs from 'bcryptjs'
import 'dotenv/config'
import { faker } from '@faker-js/faker'

async function main() {
  const email = process.env.ADMIN_EMAIL
  const name = process.env.ADMIN_NAME
  const password = process.env.ADMIN_PASSWORD || 'password'

  const hashedPassword = await bcryptjs.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name: name!,
      email: email!,
      password: hashedPassword,
      bio: faker.lorem.sentence(),
      avatar: faker.image.avatar(),
    },
  })

  console.log('✅ Admin user created:')
  console.log(`   Email: ${email}`)

  if (!user) {
    console.error('❌ No user found. Please create an admin user first.')
    process.exit(1)
  }

  console.log('🌱 Seeding categories...')
  const categoryNames = ['技术', '生活', '随笔', '教程', '其他']

  // createMany 不返回创建的记录，需要分别创建或之后查询
  await prisma.category.createMany({
    data: categoryNames.map(name => ({ name })),
  })

  // 查询刚创建的 categories
  const categories = await prisma.category.findMany()

  console.log('🌱 Seeding tags...')
  await prisma.tag.createMany({
    data: Array.from({ length: 10 }, () => ({ name: faker.lorem.word() })),
  })

  // 查询刚创建的 tags
  const tags = await prisma.tag.findMany()

  console.log('🌱 Seeding posts...')
  await prisma.post.createMany({
    data: Array.from({ length: 30 }, () => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(10),
      authorId: user.id,
      categoryId: categories[Math.floor(Math.random() * categories.length)].id,
    })),
  })

  // 查询刚创建的 posts
  const posts = await prisma.post.findMany()

  console.log('🌱 Seeding posts-tags relations...')
  await prisma.postTag.createMany({
    data: Array.from({ length: 50 }, () => ({
      postId: posts[Math.floor(Math.random() * posts.length)].id,
      tagId: tags[Math.floor(Math.random() * tags.length)].id,
    })),
    skipDuplicates: true, // 避免重复的关联关系报错
  })

  console.log('✅ Fake data inserted successfully!')
}

main()
  .catch(err => {
    console.error('❌ Error:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })