import type { UpdateUrlRequest, UrlsRepository } from '@/application/repositories/urls-repository'
import type { Url } from '@/domain/entities/url.entity'

export class InMemoryUrlsRepository implements UrlsRepository {
  private urls: Url[] = []

  create(url: Url): Promise<Url> {
    this.urls.push(url)

    return Promise.resolve(url)
  }

  findById(id: string): Promise<Url | null> {
    const url = this.urls.find(item => item.id === id)

    if (!url)
      return Promise.resolve(null)

    return Promise.resolve(url)
  }

  findByShortUrl(shortUrl: string): Promise<Url | null> {
    const url = this.urls.find(item => item.shortUrl === shortUrl)

    if (!url)
      return Promise.resolve(null)

    return Promise.resolve(url)
  }

  fetchByUser(userId: string, page: number): Promise<Url[]> {
    const urls = this.urls.filter(url => url.userId === userId)

    const startIndex = (page - 1) * 10
    const endIndex = page * 10

    return Promise.resolve(urls.slice(startIndex, endIndex))
  }

  update({
    id,
    shortUrl,
    longUrl,
  }: UpdateUrlRequest): Promise<void> {
    const urlIndex = this.urls.findIndex(url => url.id === id)

    if (urlIndex === -1)
      throw new Error('Url not found.')

    if (shortUrl)
      this.urls[urlIndex].shortUrl = shortUrl

    if (longUrl)
      this.urls[urlIndex].longUrl = longUrl

    return Promise.resolve()
  }

  updateClicksCount(id: string): Promise<void> {
    const urlIndex = this.urls.findIndex(url => url.id === id)

    if (urlIndex === -1)
      throw new Error('Url not found.')

    this.urls[urlIndex].incrementClicksCount()

    return Promise.resolve()
  }

  delete(id: string): Promise<void> {
    const urlIndex = this.urls.findIndex(url => url.id === id)

    if (urlIndex === -1)
      throw new Error('Url not found.')

    this.urls.splice(urlIndex, 1)

    return Promise.resolve()
  }
}
