import { UserNotFoundError } from './errors/user-not-found.error'
import type { UserProps } from '../../../domain/entities/user'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import type { UsersRepository } from '../../repositories/users-repository'

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
