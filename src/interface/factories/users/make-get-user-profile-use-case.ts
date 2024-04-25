import { GetUserProfileUseCase } from '../../../application/use-cases/user/get-user-profile'
import { PrismaUsersRepository } from '../../../infra/repositories/prisma/prisma-users-repository'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}
