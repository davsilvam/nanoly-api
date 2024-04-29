import type { CreateUrlRequest, UpdateUrlRequest, UrlsRepository } from '../../../application/repositories/urls-repository'
import type { UrlProps } from '../../../domain/entities/url'
import { Url } from '../../../domain/entities/url'

export class InMemoryUrlsRepository implements UrlsRepository {
  private urls: Url[] = []

  create({ longUrl, shortUrl, userId }: CreateUrlRequest): Promise<string> {
    const url = new Url({
      longUrl,
      shortUrl,
      userId,
    })

    this.urls.push(url)

    return Promise.resolve(url.id)
  }

  findById(id: string): Promise<UrlProps | null> {
    const url = this.urls.find(item => item.id === id)

    return Promise.resolve(url?.toObject() || null)
  }

  findByShortUrl(shortUrl: string): Promise<UrlProps | null> {
    const url = this.urls.find(item => item.shortUrl === shortUrl)

    if (!url)
      return Promise.resolve(null)

    return Promise.resolve(url.toObject())
  }

  fetchByUser(userId: string): Promise<UrlProps[]> {
    const urls = this.urls.filter(url => url.userId === userId)

    return Promise.resolve(urls.map(url => url.toObject()))
  }

  update({
    id,
    shortUrl,
    longUrl,
    clicksCount,
  }: UpdateUrlRequest): Promise<void> {
    const urlIndex = this.urls.findIndex(url => url.id === id)

    if (urlIndex === -1)
      throw new Error('Url not found.')

    if (shortUrl)
      this.urls[urlIndex].shortUrl = shortUrl

    if (longUrl)
      this.urls[urlIndex].longUrl = longUrl

    if (clicksCount)
      this.urls[urlIndex].clicksCount = clicksCount

    return Promise.resolve()
  }

  updateClicksCount(id: string, clicksCount: number): Promise<void> {
    const urlIndex = this.urls.findIndex(url => url.id === id)

    if (urlIndex === -1)
      throw new Error('Url not found.')

    this.urls[urlIndex].clicksCount = clicksCount

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