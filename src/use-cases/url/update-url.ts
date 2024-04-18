import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { UrlNotFoundError } from '../../errors/url/url-not-found.error'
import type { UrlsRepository } from '../../repositories/url/url-repository'

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
