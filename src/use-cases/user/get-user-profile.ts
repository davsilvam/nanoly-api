import type { UserProps } from '../../entities/user/user'
import { type Either, left, right } from '../../errors/either'
import { UserNotFoundError } from '../../errors/user/user-not-found.error'
import type { UsersRepository } from '../../repositories/user/users-repository'

interface GetUserProfileUseCaseRequest {
  id: string
}

type GetUserProfileUseCaseResponse = Either<UserNotFoundError, UserProps>

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) { }

  public async execute({ id }: GetUserProfileUseCaseRequest):
  Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user)
      return left(new UserNotFoundError())

    return right(user)
  }
}
