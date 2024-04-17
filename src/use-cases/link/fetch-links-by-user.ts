import { Link } from '../../entities/link'
import { Either, left, right } from '../../errors/either'
import { UserNotFoundError } from '../../errors/user/user-not-found.error'
import { LinksRepository } from '../../repositories/link/links-repository'
import { UsersRepository } from '../../repositories/user/users-repository'

interface FetchLinksByUserUseCaseRequest {
  userId: string
}

type FetchLinksByUserUseCaseResponse = Either<UserNotFoundError, Link[]>

export class FetchLinksByUserUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private usersRepository: UsersRepository,
  ) {}

  public async execute({
    userId,
  }: FetchLinksByUserUseCaseRequest): Promise<FetchLinksByUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    const links = await this.linksRepository.fetchByUser(userId)

    return right(links)
  }
}
