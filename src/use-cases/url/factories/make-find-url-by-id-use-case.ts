import { PrismaUrlsRepository } from '../../../repositories/url/prisma-urls-repository'
import { PrismaUsersRepository } from '../../../repositories/user/prisma-users-repository'
import { FindUrlByIdUseCase } from '../find-url-by-id'

export function makeFindUrlByIdUseCase() {
  const urlsRepository = new PrismaUrlsRepository()
  const usersRepository = new PrismaUsersRepository()
  const findUrlByIdUseCase = new FindUrlByIdUseCase(urlsRepository, usersRepository)

  return findUrlByIdUseCase
}
