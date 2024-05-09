import { UserMapper } from '../mappers/user-mapper'
import { prisma } from '../prisma-client'

import type { UsersRepository } from '@/application/repositories/users-repository'
import type { User } from '@/domain/entities/user.entity'

export class PrismaUsersRepository implements UsersRepository {
  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: UserMapper.toPersistence(user),
    })

    return UserMapper.toDomain(createdUser)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user)
      return null

    return UserMapper.toDomain(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user)
      return null

    return UserMapper.toDomain(user)
  }
}
