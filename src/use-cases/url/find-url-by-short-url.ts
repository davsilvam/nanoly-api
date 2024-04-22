import type { UrlProps } from '../../entities/url/url'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { UrlNotFoundError } from '../../errors/url/url-not-found.error'
import type { UrlsRepository } from '../../repositories/url/url-repository'

interface FindUrlByShortUrlUseCaseRequest {
  shortUrl: string
}

type FindUrlByShortUrlUseCaseResponse = Either<UrlNotFoundError, string>

export class FindUrlByShortUrlUseCase {
  constructor(private urlsRepository: UrlsRepository) { }

  public async execute({
    shortUrl,
  }: FindUrlByShortUrlUseCaseRequest): Promise<FindUrlByShortUrlUseCaseResponse> {
    const url = await this.urlsRepository.findByShortUrl(shortUrl)

    if (!url)
      return left(new UrlNotFoundError())

    this.urlsRepository.updateClicksCount(url.id, url.clicksCount + 1)

    return right(url.longUrl)
  }
}
