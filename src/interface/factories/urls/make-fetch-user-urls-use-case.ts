import { FetchUserUrlsUseCase } from '../../../application/use-cases/url/fetch-user-urls'
import { PrismaUrlsRepository } from '../../../infra/repositories/prisma/prisma-urls-repository'
import { PrismaUsersRepository } from '../../../infra/repositories/prisma/prisma-users-repository'

export function makeFetchUserUrlsUseCase() {
  const urlsRepository = new PrismaUrlsRepository()
  const usersRepository = new PrismaUsersRepository()
  const fetchUserUrlsUseCase = new FetchUserUrlsUseCase(urlsRepository, usersRepository)

  return fetchUserUrlsUseCase
}
