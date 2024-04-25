import { PrismaUrlsRepository } from '../../../../infra/repositories/prisma/prisma-urls-repository'
import { PrismaUsersRepository } from '../../../../infra/repositories/prisma/prisma-users-repository'
import { DeleteUrlUseCase } from '../delete-url'

export function makeDeleteUrlUseCase() {
  const urlsRepository = new PrismaUrlsRepository()
  const usersRepository = new PrismaUsersRepository()
  const deleteUrlUseCase = new DeleteUrlUseCase(urlsRepository, usersRepository)

  return deleteUrlUseCase
}
