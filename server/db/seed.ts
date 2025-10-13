import prisma from '../../lib/prisma'
import bcryptjs from 'bcryptjs'
import 'dotenv/config'

async function main() {
  const email = process.env.ADMIN_EMAIL
  const name = process.env.ADMIN_NAME
  const password = process.env.ADMIN_PASSWORD || 'password'
  const bio = process.env.ADMIN_BIO || 'This is the admin user.'
  const avatar = process.env.ADMIN_AVATAR || 'https://i.pravatar.cc/150?img=3'

  const hashedPassword = await bcryptjs.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name: name!,
      email: email!,
      password: hashedPassword,
      bio: bio!,
      avatar: avatar!,
    },
  })

  console.log('✅ Admin user created:')
  console.log(`   Email: ${email}`)

  if (!user) {
    console.error('❌ No user found. Please create an admin user first.')
    process.exit(1)
  }
}

main()
  .catch(err => {
    console.error('❌ Error:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
