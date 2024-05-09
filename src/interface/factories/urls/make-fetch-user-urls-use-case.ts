import { FetchUserUrlsUseCase } from '@/application/use-cases/url/fetch-user-urls'
import { PrismaUrlsRepository } from '@/infra/database/prisma/repositories/prisma-urls-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export function makeFetchUserUrlsUseCase() {
  const urlsRepository = new PrismaUrlsRepository()
  const usersRepository = new PrismaUsersRepository()
  const fetchUserUrlsUseCase = new FetchUserUrlsUseCase(urlsRepository, usersRepository)

  return fetchUserUrlsUseCase
}
