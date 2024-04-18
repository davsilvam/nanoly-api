import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { URLNotFoundError } from '../../errors/url/url-not-found.error'
import type { URLsRepository } from '../../repositories/url/url-repository'

interface UpdateURLUseCaseRequest {
  id: string
  shortUrl?: string
  longUrl?: string
  clicksCount?: number
}

type UpdateURLUseCaseResponse = Either<URLNotFoundError, void>

export class UpdateURLUseCase {
  constructor(private urlsRepository: URLsRepository) { }

  public async execute({
    id,
    shortUrl,
    longUrl,
    clicksCount,
  }: UpdateURLUseCaseRequest): Promise<UpdateURLUseCaseResponse> {
    const url = await this.urlsRepository.findById(id)

    if (!url)
      return left(new URLNotFoundError())

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
