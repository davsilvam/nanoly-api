import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { URLNotFoundError } from '../../errors/url/url-not-found.error'
import type { URLsRepository } from '../../repositories/url/url-repository'

interface DeleteURLUseCaseRequest {
  id: string
}

type DeleteURLUseCaseResponse = Either<URLNotFoundError, void>

export class DeleteURLUseCase {
  constructor(private urlsRepository: URLsRepository) { }

  public async execute({
    id,
  }: DeleteURLUseCaseRequest): Promise<DeleteURLUseCaseResponse> {
    const url = await this.urlsRepository.findById(id)

    if (!url)
      return left(new URLNotFoundError())

    return right(await this.urlsRepository.delete(id))
  }
}
