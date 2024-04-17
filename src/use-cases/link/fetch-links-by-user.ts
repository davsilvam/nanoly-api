import { Link } from '../../entities/link'
import { Either, left, right } from '../../errors/either'
import { UserNotFoundError } from '../../errors/user/user-not-found.error'
import { LinkRepository } from '../../repositories/link/link-repository'
import { UserRepository } from '../../repositories/user/user-repository'

interface FetchLinksByUserUseCaseRequest {
  userId: string
}

type FetchLinksByUserUseCaseResponse = Either<UserNotFoundError, Link[]>

export class FetchLinksByUserUseCase {
  constructor(
    private linkRepository: LinkRepository,
    private userRepository: UserRepository,
  ) {}

  public async execute({
    userId,
  }: FetchLinksByUserUseCaseRequest): Promise<FetchLinksByUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    const links = await this.linkRepository.fetchByUser(userId)

    return right(links)
  }
}
