import { Link } from '../../entities/link'

export type CreateLinkRequest = {
  shortUrl: string
  longUrl: string
  userId: string
}

export type UpdateLinkRequest = {
  id: string
  shortUrl?: string
  longUrl?: string
  clicksCount?: number
}

export interface LinkRepository {
  create(request: CreateLinkRequest): Promise<{ linkId: string }>
  findById(id: string): Promise<Link | null>
  findByShortUrl(shortUrl: string): Promise<Link | null>
  fetchByUser(userId: string): Promise<Link[]>
  update(request: UpdateLinkRequest): Promise<void>
  delete(id: string): Promise<void>
}
