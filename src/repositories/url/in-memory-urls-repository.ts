import type {
  CreateURLRequest,
  URLsRepository,
  UpdateURLRequest,
} from './url-repository'
import { URL } from '../../entities/url'

export class InMemoryURLsRepository implements URLsRepository {
  private urls: URL[] = []

  create({ longUrl, shortUrl, userId }: CreateURLRequest): Promise<string> {
    const url = new URL({ longUrl, shortUrl, userId })

    this.urls.push(url)

    return Promise.resolve(url.id)
  }

  findById(id: string): Promise<URL | null> {
    const url = this.urls.find(item => item.id === id) || null

    return Promise.resolve(url)
  }

  findByShortUrl(shortUrl: string): Promise<URL | null> {
    const url = this.urls.find(item => item.shortUrl === shortUrl) || null

    return Promise.resolve(url)
  }

  fetchByUser(userId: string): Promise<URL[]> {
    const urls = this.urls.filter(item => item.userId === userId)

    return Promise.resolve(urls)
  }

  update({
    id,
    shortUrl,
    longUrl,
    clicksCount,
  }: UpdateURLRequest): Promise<void> {
    const urlIndex = this.urls.findIndex(item => item.id === id)

    if (shortUrl)
      this.urls[urlIndex].shortUrl = shortUrl

    if (longUrl)
      this.urls[urlIndex].longUrl = longUrl

    if (clicksCount)
      this.urls[urlIndex].clicksCount = clicksCount

    return Promise.resolve()
  }

  delete(id: string): Promise<void> {
    const urlIndex = this.urls.findIndex(item => item.id === id)

    if (urlIndex === -1)
      throw new Error('URL not found.')

    this.urls.splice(urlIndex, 1)

    return Promise.resolve()
  }
}
