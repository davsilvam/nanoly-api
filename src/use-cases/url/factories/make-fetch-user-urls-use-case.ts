import { PrismaUrlsRepository } from '../../../repositories/url/prisma-urls-repository'
import { PrismaUsersRepository } from '../../../repositories/user/prisma-users-repository'
import { FetchUserUrlsUseCase } from '../fetch-user-urls'

export function makeFetchUserUrlsUseCase() {
  const urlsRepository = new PrismaUrlsRepository()
  const usersRepository = new PrismaUsersRepository()
  const fetchUserUrlsUseCase = new FetchUserUrlsUseCase(urlsRepository, usersRepository)

  return fetchUserUrlsUseCase
}
