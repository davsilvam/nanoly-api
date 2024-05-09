import { UrlNotFoundError } from './errors/url-not-found.error'
import type { Either } from '../../../core/either'
import { left, right } from '../../../core/either'
import type { UrlsRepository } from '../../repositories/urls-repository'
import type { UsersRepository } from '../../repositories/users-repository'
import { UnauthorizedUserError } from '../user/errors/unauthorized-user.error'
import { UserNotFoundError } from '../user/errors/user-not-found.error'

interface DeleteUrlUseCaseRequest {
  id: string
  userId: string
}

type DeleteUrlUseCaseResponse = Either<UrlNotFoundError | UserNotFoundError | UnauthorizedUserError, void>

export class DeleteUrlUseCase {
  constructor(private urlsRepository: UrlsRepository, private usersRepository: UsersRepository) { }

  public async execute({
    id,
    userId,
  }: DeleteUrlUseCaseRequest): Promise<DeleteUrlUseCaseResponse> {
    const url = await this.urlsRepository.findById(id)

    if (!url)
      return left(new UrlNotFoundError())

    const user = await this.usersRepository.findById(userId)

    if (!user)
      return left(new UserNotFoundError())

    if (url.userId !== user.id)
      return left(new UnauthorizedUserError())

    return right(await this.urlsRepository.delete(id))
  }
}
