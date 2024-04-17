import type { Link } from '../../entities/link'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import type { LinksRepository } from '../../repositories/link/links-repository'

interface FindLinkByIdUseCaseRequest {
  id: string
}

type FindLinkByIdUseCaseResponse = Either<LinkNotFoundError, Link | null>

export class FindLinkByIdUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    id,
  }: FindLinkByIdUseCaseRequest): Promise<FindLinkByIdUseCaseResponse> {
    const link = await this.linksRepository.findById(id)

    if (!link)
      return left(new LinkNotFoundError())

    return right(link)
  }
}
