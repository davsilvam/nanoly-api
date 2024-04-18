import type { URL } from '../../entities/url'

export interface CreateURLRequest {
  shortUrl: string
  longUrl: string
  userId: string
}

export interface UpdateURLRequest {
  id: string
  shortUrl?: string
  longUrl?: string
  clicksCount?: number
}

export interface URLsRepository {
  create: (request: CreateURLRequest) => Promise<string>
  findById: (id: string) => Promise<URL | null>
  findByShortUrl: (shortUrl: string) => Promise<URL | null>
  fetchByUser: (userId: string) => Promise<URL[]>
  update: (request: UpdateURLRequest) => Promise<void>
  delete: (id: string) => Promise<void>
}
