import { UrlMapper } from '../mappers/url-mapper'
import { prisma } from '../prisma-client'

import type { UpdateUrlRequest, UrlsRepository } from '@/application/repositories/urls-repository'
import type { Url } from '@/domain/entities/url.entity'

export class PrismaUrlsRepository implements UrlsRepository {
  async create(url: Url): Promise<Url> {
    const createdUrl = await prisma.url.create({
      data: UrlMapper.toPersistence(url),
    })

    return UrlMapper.toDomain(createdUrl)
  }

  async findById(id: string): Promise<Url | null> {
    const url = await prisma.url.findUnique({
      where: {
        id,
      },
    })

    if (!url)
      return null

    return UrlMapper.toDomain(url)
  }

  async findByShortUrl(shortUrl: string): Promise<Url | null> {
    const url = await prisma.url.findUnique({
      where: {
        shortUrl,
      },
    })

    if (!url)
      return null

    return UrlMapper.toDomain(url)
  }

  async fetchByUser(userId: string, page: number): Promise<Url[]> {
    const urls = await prisma.url.findMany({
      where: {
        userId,
      },
      take: 10,
      skip: (page - 1) * 10,
    })

    return urls.map(UrlMapper.toDomain)
  }

  async update(request: UpdateUrlRequest): Promise<void> {
    await prisma.url.update({
      where: {
        id: request.id,
      },
      data: {
        longUrl: request.longUrl,
        shortUrl: request.shortUrl,
      },
    })
  }

  async updateClicksCount(id: string): Promise<void> {
    await prisma.url.update({
      where: {
        id,
      },
      data: {
        clicksCount: {
          increment: 1,
        },
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.url.delete({
      where: {
        id,
      },
    })
  }
}
