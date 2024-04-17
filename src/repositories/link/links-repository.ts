import type { Link } from '../../entities/link'

export interface CreateLinkRequest {
  shortUrl: string
  longUrl: string
  userId: string
}

export interface UpdateLinkRequest {
  id: string
  shortUrl?: string
  longUrl?: string
  clicksCount?: number
}

export interface LinksRepository {
  create: (request: CreateLinkRequest) => Promise<string>
  findById: (id: string) => Promise<Link | null>
  findByShortUrl: (shortUrl: string) => Promise<Link | null>
  fetchByUser: (userId: string) => Promise<Link[]>
  update: (request: UpdateLinkRequest) => Promise<void>
  delete: (id: string) => Promise<void>
}
