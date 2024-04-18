import type { URL } from '../../entities/url'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { URLNotFoundError } from '../../errors/url/url-not-found.error'
import type { URLsRepository } from '../../repositories/url/url-repository'

interface FindURLByShortURLUseCaseRequest {
  shortUrl: string
}

type FindURLByShortURLUseCaseResponse = Either<URLNotFoundError, URL>

export class FindURLByShortURLUseCase {
  constructor(private urlsRepository: URLsRepository) { }

  public async execute({
    shortUrl,
  }: FindURLByShortURLUseCaseRequest): Promise<FindURLByShortURLUseCaseResponse> {
    const url = await this.urlsRepository.findByShortUrl(shortUrl)

    if (!url)
      return left(new URLNotFoundError())

    return right(url)
  }
}
