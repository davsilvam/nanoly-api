import { Link } from '../../entities/link'
import type {
  CreateLinkRequest,
  LinksRepository,
  UpdateLinkRequest,
} from './links-repository'

export class InMemoryLinksRepository implements LinksRepository {
  private links: Link[] = []

  create({ longUrl, shortUrl, userId }: CreateLinkRequest): Promise<string> {
    const link = new Link({ longUrl, shortUrl, userId })

    this.links.push(link)

    return Promise.resolve(link.id)
  }

  findById(id: string): Promise<Link | null> {
    const link = this.links.find(item => item.id === id) || null

    return Promise.resolve(link)
  }

  findByShortUrl(shortUrl: string): Promise<Link | null> {
    const link = this.links.find(item => item.shortUrl === shortUrl) || null

    return Promise.resolve(link)
  }

  fetchByUser(userId: string): Promise<Link[]> {
    const links = this.links.filter(item => item.userId === userId)

    return Promise.resolve(links)
  }

  update({
    id,
    shortUrl,
    longUrl,
    clicksCount,
  }: UpdateLinkRequest): Promise<void> {
    const linkIndex = this.links.findIndex(item => item.id === id)

    if (shortUrl)
      this.links[linkIndex].shortUrl = shortUrl

    if (longUrl)
      this.links[linkIndex].longUrl = longUrl

    if (clicksCount)
      this.links[linkIndex].clicksCount = clicksCount

    return Promise.resolve()
  }

  delete(id: string): Promise<void> {
    const linkIndex = this.links.findIndex(item => item.id === id)

    if (linkIndex === -1)
      throw new Error('Link not found.')

    this.links.splice(linkIndex, 1)

    return Promise.resolve()
  }
}
