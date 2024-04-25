import { UrlNotFoundError } from './errors/url-not-found.error'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import type { UrlsRepository } from '../../repositories/urls-repository'

interface UpdateUrlUseCaseRequest {
  id: string
  shortUrl?: string
  longUrl?: string
  clicksCount?: number
}

type UpdateUrlUseCaseResponse = Either<UrlNotFoundError, void>

export class UpdateUrlUseCase {
  constructor(private urlsRepository: UrlsRepository) { }

  public async execute({
    id,
    shortUrl,
    longUrl,
    clicksCount,
  }: UpdateUrlUseCaseRequest): Promise<UpdateUrlUseCaseResponse> {
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
