import type { UrlProps } from '../../entities/url/url'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { UserNotFoundError } from '../../errors/user/user-not-found.error'
import type { UrlsRepository } from '../../repositories/url/url-repository'
import type { UsersRepository } from '../../repositories/user/users-repository'

interface FetchUserUrlsUseCaseRequest {
  userId: string
}

type FetchUserUrlsUseCaseResponse = Either<UserNotFoundError, UrlProps[]>

export class FetchUserUrlsUseCase {
  constructor(
    private urlsRepository: UrlsRepository,
    private usersRepository: UsersRepository,
  ) { }

  public async execute({
    userId,
  }: FetchUserUrlsUseCaseRequest): Promise<FetchUserUrlsUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user)
      return left(new UserNotFoundError())

    const urls = await this.urlsRepository.fetchByUser(userId)

    return right(urls)
  }
}
