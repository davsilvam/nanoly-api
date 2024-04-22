import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { UrlNotFoundError } from '../../errors/url/url-not-found.error'
import { UnauthorizedUserError } from '../../errors/user/unauthorized-user.error'
import { UserNotFoundError } from '../../errors/user/user-not-found.error'
import type { UrlsRepository } from '../../repositories/url/url-repository'
import type { UsersRepository } from '../../repositories/user/users-repository'

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
