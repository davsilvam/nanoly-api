import type { Prisma, User as RawUser } from '@prisma/client'

import { User } from '@/domain/entities/user.entity'

export class UserMapper {
  static toDomain(raw: RawUser): User {
    const user = User.create({
      name: raw.name,
      email: raw.email,
      passwordHash: raw.passwordHash,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, raw.id)

    return user
  }

  static toPersistence(user: User): Prisma.UserCreateInput {
    const raw: Prisma.UserCreateInput = {
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      urls: {
        create: user.urls.map(url => ({
          longUrl: url.longUrl,
          shortUrl: url.shortUrl,
          clicksCount: url.clicksCount,
          createdAt: url.createdAt,
          updatedAt: url.updatedAt,
        })),
      },
    }

    return raw
  }
}
