import { UrlNotFoundError } from './errors/url-not-found.error'
import type { UrlProps } from '../../../domain/entities/url'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import type { UrlsRepository } from '../../repositories/urls-repository'
import type { UsersRepository } from '../../repositories/users-repository'
import { UnauthorizedUserError } from '../user/errors/unauthorized-user.error'
import { UserNotFoundError } from '../user/errors/user-not-found.error'

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
