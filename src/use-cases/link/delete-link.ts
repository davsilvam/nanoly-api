import { Either, left, right } from '../../errors/either'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import { LinkRepository } from '../../repositories/link/link-repository'

interface DeleteLinkUseCaseRequest {
  id: string
}

type DeleteLinkUseCaseResponse = Either<LinkNotFoundError, void>

export class DeleteLinkUseCase {
  constructor(private linkRepository: LinkRepository) {}

  public async execute({
    id,
  }: DeleteLinkUseCaseRequest): Promise<DeleteLinkUseCaseResponse> {
    const link = await this.linkRepository.findById(id)

    if (!link) {
      return left(new LinkNotFoundError())
    }

    return right(await this.linkRepository.delete(id))
  }
}
