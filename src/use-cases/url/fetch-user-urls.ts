import type { URL } from '../../entities/url'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { UserNotFoundError } from '../../errors/user/user-not-found.error'
import type { URLsRepository } from '../../repositories/url/url-repository'
import type { UsersRepository } from '../../repositories/user/users-repository'

interface FetchUserURLsUseCaseRequest {
  userId: string
}

type FetchUserURLsUseCaseResponse = Either<UserNotFoundError, URL[]>

export class FetchUserURLsUseCase {
  constructor(
    private urlsRepository: URLsRepository,
    private usersRepository: UsersRepository,
  ) { }

  public async execute({
    userId,
  }: FetchUserURLsUseCaseRequest): Promise<FetchUserURLsUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user)
      return left(new UserNotFoundError())

    const urls = await this.urlsRepository.fetchByUser(userId)

    return right(urls)
  }
}
