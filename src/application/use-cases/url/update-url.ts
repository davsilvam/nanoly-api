import { InvalidShortUrlError } from './errors/invalid-short-url.error'
import { ShortUrlAlreadyExistsError } from './errors/short-url-already-exists.error'
import { UrlNotFoundError } from './errors/url-not-found.error'
import type { UrlsRepository } from '../../repositories/urls-repository'

import { left, right } from '@/core/logic/either'
import type { Either } from '@/core/logic/either'

interface UpdateUrlUseCaseRequest {
  id: string
  shortUrl?: string
  longUrl?: string
  clicksCount?: number
}

type UpdateUrlUseCaseResponse = Either<InvalidShortUrlError | ShortUrlAlreadyExistsError | UrlNotFoundError, void>

export class UpdateUrlUseCase {
  constructor(private urlsRepository: UrlsRepository) { }

  public async execute({
    id,
    shortUrl,
    longUrl,
    clicksCount,
  }: UpdateUrlUseCaseRequest): Promise<UpdateUrlUseCaseResponse> {
    if (shortUrl) {
      if (shortUrl.length < 4 || shortUrl.length > 16)
        return left(new InvalidShortUrlError('Short Url must have between 4 and 16 characters.'))

      const shortUrlAlreadyExists = await this.urlsRepository.findByShortUrl(shortUrl)

      if (shortUrlAlreadyExists)
        return left(new ShortUrlAlreadyExistsError())
    }

    const url = await this.urlsRepository.findById(id)

    if (!url)
      return left(new UrlNotFoundError())

    return right(
      await this.urlsRepository.update({
        id,
        shortUrl,
        longUrl,
        clicksCount,
      }),
    )
  }
}
