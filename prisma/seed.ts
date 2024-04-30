import { BcryptEncrypter } from '../src/infra/cryptography/bcrypt-encrypter'
import { prisma } from '../src/infra/lib/prisma'

async function seed() {
  const encrypter = new BcryptEncrypter()

  const passwordHash = await encrypter.hash('123456')

  const john = await prisma.user.create({
    data: {
      id: '69d95019-9648-4016-b0a8-051ba0e5eb65',
      email: 'johndoe@email.com',
      name: 'John Doe',
      passwordHash,
    },
  })

  const jane = await prisma.user.create({
    data: {
      id: 'ca8c8163-8115-447b-ac7d-71f5de638039',
      email: 'janedoe@email.com',
      name: 'Jane Doe',
      passwordHash,
    },
  })

  await prisma.url.create({
    data: {
      longUrl: 'https://google.com',
      shortUrl: 'google',
      userId: john.id,
    },
  })

  await prisma.url.create({
    data: {
      longUrl: 'https://facebook.com',
      shortUrl: 'facebook',
      userId: jane.id,
    },
  })

  await prisma.url.create({
    data: {
      longUrl: 'https://twitter.com',
      shortUrl: 'twitter',
      userId: john.id,
    },
  })
}

seed().then(() => {
  // eslint-disable-next-line no-console
  console.log('Database seeded!')
  prisma.$disconnect()
})
