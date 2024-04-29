import { UrlNotFoundError } from './errors/url-not-found.error'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import type { UrlsRepository } from '../../repositories/urls-repository'

interface GetRedirectUrlUseCaseRequest {
  shortUrl: string
}

type GetRedirectUrlUseCaseResponse = Either<UrlNotFoundError, string>

export class GetRedirectUrlUseCase {
  constructor(private urlsRepository: UrlsRepository) { }

  public async execute({
    shortUrl,
  }: GetRedirectUrlUseCaseRequest): Promise<GetRedirectUrlUseCaseResponse> {
    const url = await this.urlsRepository.findByShortUrl(shortUrl)

    if (!url)
      return left(new UrlNotFoundError())

    this.urlsRepository.updateClicksCount(url.id, url.clicksCount + 1)

    return right(url.longUrl)
  }
}