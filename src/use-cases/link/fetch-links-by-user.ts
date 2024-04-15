import { Link } from '../../entities/link'
import { Either, right } from '../../errors/either'
import { LinkRepository } from '../../repositories/link/link-repository'

interface FetchLinksByUserUseCaseRequest {
  userId: string
}

type FetchLinksByUserUseCaseResponse = Either<void, Link[]>

export class FetchLinksByUserUseCase {
  constructor(private linkRepository: LinkRepository) {}

  public async execute({
    userId,
  }: FetchLinksByUserUseCaseRequest): Promise<FetchLinksByUserUseCaseResponse> {
    const result = await this.linkRepository.fetchByUser(userId)

    return right(result)
  }
}
