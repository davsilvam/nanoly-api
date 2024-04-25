import type { UrlProps } from '../../../domain/entities/url/url'
import type { Either } from '../../../domain/errors/either'
import { left, right } from '../../../domain/errors/either'
import type { UrlsRepository } from '../../../domain/repositories/url-repository'
import type { UsersRepository } from '../../../domain/repositories/users-repository'
import { UserNotFoundError } from '../user/errors/user-not-found.error'

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
