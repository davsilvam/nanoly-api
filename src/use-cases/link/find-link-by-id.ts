import { Link } from '../../entities/link'
import { Either, left, right } from '../../errors/either'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import { LinkRepository } from '../../repositories/link/link-repository'

interface FindLinkByIdUseCaseRequest {
  id: string
}

type FindLinkByIdUseCaseResponse = Either<LinkNotFoundError, Link | null>

export class FindLinkByIdUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute({
    id,
  }: FindLinkByIdUseCaseRequest): Promise<FindLinkByIdUseCaseResponse> {
    const link = await this.linkRepository.findById(id)

    if (!link) {
      return left(new LinkNotFoundError())
    }

    return right(link)
  }
}
