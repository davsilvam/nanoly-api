import type { User } from '@prisma/client'

import { UserNotFoundError } from './errors/user-not-found.error'
import type { UsersRepository } from '../../repositories/users-repository'

import type { Either } from '@/core/logic/either'
import { left, right } from '@/core/logic/either'
import { prisma } from '@/infra/database/prisma/prisma-client'

interface GetUserProfileUseCaseRequest {
  id: string
}

type GetUserProfileUseCaseResponse = Either<UserNotFoundError, User>

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
