import type { Prisma, Url as RawUrl } from '@prisma/client'

import { Url } from '@/domain/entities/url.entity'

export class UrlMapper {
  static toDomain(raw: RawUrl): Url {
    const user = Url.create({
      longUrl: raw.longUrl,
      shortUrl: raw.shortUrl,
      clicksCount: raw.clicksCount,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      userId: raw.userId,
    }, raw.id)

    return user
  }

  static toPersistence(url: Url): Prisma.UrlCreateInput {
    const raw: Prisma.UrlCreateInput = {
      id: url.id,
      longUrl: url.longUrl,
      shortUrl: url.shortUrl,
      clicksCount: url.clicksCount,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
      user: {
        connect: {
          id: url.userId,
        },
      },
    }

    return raw
  }
}
