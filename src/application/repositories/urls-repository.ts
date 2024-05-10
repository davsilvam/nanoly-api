import type { Url } from '../../domain/entities/url.entity'

export interface UpdateUrlRequest {
  id: string
  shortUrl?: string
  longUrl?: string
}

export interface UrlsRepository {
  create: (url: Url) => Promise<Url>
  findById: (id: string) => Promise<Url | null>
  findByShortUrl: (shortUrl: string) => Promise<Url | null>
  fetchByUser: (userId: string, page: number) => Promise<Url[]>
  update: (request: UpdateUrlRequest) => Promise<void>
  updateClicksCount: (id: string) => Promise<void>
  delete: (id: string) => Promise<void>
}
