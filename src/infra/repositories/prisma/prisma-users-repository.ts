import type { UserProps } from '../../../domain/entities/user'
import type { CreateUserRequest, UsersRepository } from '../../../domain/repositories/users-repository'
import { prisma } from '../../lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create({ name, email, passwordHash }: CreateUserRequest): Promise<string> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    })

    return user.id
  }

  async findByEmail(email: string): Promise<UserProps | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user)
      return null

    return user
  }

  async findById(id: string): Promise<UserProps | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user)
      return null

    return user
  }
}
