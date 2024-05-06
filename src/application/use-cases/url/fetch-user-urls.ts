import type { UrlProps } from '../../../domain/entities/url'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import type { UrlsRepository } from '../../repositories/urls-repository'
import type { UsersRepository } from '../../repositories/users-repository'
import { UserNotFoundError } from '../user/errors/user-not-found.error'

interface FetchUserUrlsUseCaseRequest {
  userId: string
  page: number
}

type FetchUserUrlsUseCaseResponse = Either<UserNotFoundError, UrlProps[]>

export class FetchUserUrlsUseCase {
  constructor(
    private urlsRepository: UrlsRepository,
    private usersRepository: UsersRepository,
  ) { }

  public async execute({
    userId,
    page,
  }: FetchUserUrlsUseCaseRequest): Promise<FetchUserUrlsUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user)
      return left(new UserNotFoundError())

    const urls = await this.urlsRepository.fetchByUser(userId, page)

    return right(urls)
  }
}
