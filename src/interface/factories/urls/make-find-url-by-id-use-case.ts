import { FindUrlByIdUseCase } from '../../../application/use-cases/url/find-url-by-id'
import { PrismaUrlsRepository } from '../../../infra/repositories/prisma/prisma-urls-repository'
import { PrismaUsersRepository } from '../../../infra/repositories/prisma/prisma-users-repository'

export function makeFindUrlByIdUseCase() {
  const urlsRepository = new PrismaUrlsRepository()
  const usersRepository = new PrismaUsersRepository()
  const findUrlByIdUseCase = new FindUrlByIdUseCase(urlsRepository, usersRepository)

  return findUrlByIdUseCase
}
