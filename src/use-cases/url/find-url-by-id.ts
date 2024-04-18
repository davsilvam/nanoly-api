import type { URL } from '../../entities/url'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { URLNotFoundError } from '../../errors/url/url-not-found.error'
import type { URLsRepository } from '../../repositories/url/url-repository'

interface FindURLByIdUseCaseRequest {
  id: string
}

type FindURLByIdUseCaseResponse = Either<URLNotFoundError, URL | null>

export class FindURLByIdUseCase {
  constructor(private urlsRepository: URLsRepository) { }

  async execute({
    id,
  }: FindURLByIdUseCaseRequest): Promise<FindURLByIdUseCaseResponse> {
    const url = await this.urlsRepository.findById(id)

    if (!url)
      return left(new URLNotFoundError())

    return right(url)
  }
}
