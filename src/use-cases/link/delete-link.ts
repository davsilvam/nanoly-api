import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import type { LinksRepository } from '../../repositories/link/links-repository'

interface DeleteLinkUseCaseRequest {
  id: string
}

type DeleteLinkUseCaseResponse = Either<LinkNotFoundError, void>

export class DeleteLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  public async execute({
    id,
  }: DeleteLinkUseCaseRequest): Promise<DeleteLinkUseCaseResponse> {
    const link = await this.linksRepository.findById(id)

    if (!link)
      return left(new LinkNotFoundError())

    return right(await this.linksRepository.delete(id))
  }
}
