import type { UrlProps } from '../../../domain/entities/url'
import type { CreateUrlRequest, UpdateUrlRequest, UrlsRepository } from '../../../domain/repositories/url-repository'
import { prisma } from '../../lib/prisma'

export class PrismaUrlsRepository implements UrlsRepository {
  async create({ longUrl, shortUrl, userId }: CreateUrlRequest): Promise<string> {
    const url = await prisma.url.create({
      data: {
        longUrl,
        shortUrl,
        userId,
      },
      select: {
        id: true,
      },
    })

    return url.id
  }

  async findById(id: string): Promise<UrlProps | null> {
    const url = await prisma.url.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        longUrl: true,
        shortUrl: true,
        userId: true,
        clicksCount: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!url)
      return null

    return url
  }

  async findByShortUrl(shortUrl: string): Promise<UrlProps | null> {
    const url = await prisma.url.findUnique({
      where: {
        shortUrl,
      },
      select: {
        id: true,
        longUrl: true,
        shortUrl: true,
        userId: true,
        clicksCount: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!url)
      return null

    return url
  }

  async fetchByUser(userId: string): Promise<UrlProps[]> {
    const urls = await prisma.url.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        longUrl: true,
        shortUrl: true,
        userId: true,
        clicksCount: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return urls
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

  async updateClicksCount(id: string, clicksCount: number): Promise<void> {
    await prisma.url.update({
      where: {
        id,
      },
      data: {
        clicksCount,
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
