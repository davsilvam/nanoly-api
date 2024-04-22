import type { UrlProps } from '../../entities/url/url'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { UrlNotFoundError } from '../../errors/url/url-not-found.error'
import { UnauthorizedUserError } from '../../errors/user/unauthorized-user.error'
import { UserNotFoundError } from '../../errors/user/user-not-found.error'
import type { UrlsRepository } from '../../repositories/url/url-repository'
import type { UsersRepository } from '../../repositories/user/users-repository'

interface FindUrlByIdUseCaseRequest {
  id: string
  userId: string
}

type FindUrlByIdUseCaseResponse = Either<UrlNotFoundError | UserNotFoundError | UnauthorizedUserError, UrlProps>

export class FindUrlByIdUseCase {
  constructor(private urlsRepository: UrlsRepository, private usersRepository: UsersRepository) { }

  async execute({
    id,
    userId,
  }: FindUrlByIdUseCaseRequest): Promise<FindUrlByIdUseCaseResponse> {
    const url = await this.urlsRepository.findById(id)

    if (!url)
      return left(new UrlNotFoundError())

    const user = await this.usersRepository.findById(userId)

    if (!user)
      return left(new UserNotFoundError())

    if (url.userId !== userId)
      return left(new UnauthorizedUserError())

    return right(url)
  }
}
