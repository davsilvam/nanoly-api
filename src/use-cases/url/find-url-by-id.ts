import type { UrlProps } from '../../entities/url/url'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { UrlNotFoundError } from '../../errors/url/url-not-found.error'
import type { UrlsRepository } from '../../repositories/url/url-repository'

interface FindUrlByIdUseCaseRequest {
  id: string
}

type FindUrlByIdUseCaseResponse = Either<UrlNotFoundError, UrlProps | null>

export class FindUrlByIdUseCase {
  constructor(private urlsRepository: UrlsRepository) { }

  async execute({
    id,
  }: FindUrlByIdUseCaseRequest): Promise<FindUrlByIdUseCaseResponse> {
    const url = await this.urlsRepository.findById(id)

    if (!url)
      return left(new UrlNotFoundError())

    return right(url)
  }
}
