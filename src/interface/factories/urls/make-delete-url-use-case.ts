import { DeleteUrlUseCase } from '../../../application/use-cases/url/delete-url'
import { PrismaUrlsRepository } from '../../../infra/repositories/prisma/prisma-urls-repository'
import { PrismaUsersRepository } from '../../../infra/repositories/prisma/prisma-users-repository'

export function makeDeleteUrlUseCase() {
  const urlsRepository = new PrismaUrlsRepository()
  const usersRepository = new PrismaUsersRepository()
  const deleteUrlUseCase = new DeleteUrlUseCase(urlsRepository, usersRepository)

  return deleteUrlUseCase
}
