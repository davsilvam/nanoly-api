import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { UrlNotFoundError } from '../../errors/url/url-not-found.error'
import type { UrlsRepository } from '../../repositories/url/url-repository'

interface DeleteUrlUseCaseRequest {
  id: string
}

type DeleteUrlUseCaseResponse = Either<UrlNotFoundError, void>

export class DeleteUrlUseCase {
  constructor(private urlsRepository: UrlsRepository) { }

  public async execute({
    id,
  }: DeleteUrlUseCaseRequest): Promise<DeleteUrlUseCaseResponse> {
    const url = await this.urlsRepository.findById(id)

    if (!url)
      return left(new UrlNotFoundError())

    return right(await this.urlsRepository.delete(id))
  }
}
