import type { UrlProps } from '../entities/url/url'

export interface CreateUrlRequest {
  shortUrl: string
  longUrl: string
  userId: string
}

export interface UpdateUrlRequest {
  id: string
  shortUrl?: string
  longUrl?: string
  clicksCount?: number
}

export interface UrlsRepository {
  create: (request: CreateUrlRequest) => Promise<string>
  findById: (id: string) => Promise<UrlProps | null>
  findByShortUrl: (shortUrl: string) => Promise<UrlProps | null>
  fetchByUser: (userId: string) => Promise<UrlProps[]>
  update: (request: UpdateUrlRequest) => Promise<void>
  updateClicksCount: (id: string, clicksCount: number) => Promise<void>
  delete: (id: string) => Promise<void>
}
