import { ShortenUrlUseCase } from '../../../application/use-cases/url/shorten-url'
import { PrismaUrlsRepository } from '../../../infra/repositories/prisma/prisma-urls-repository'
import { PrismaUsersRepository } from '../../../infra/repositories/prisma/prisma-users-repository'

export function makeShortenUrlUseCase() {
  const urlsRepository = new PrismaUrlsRepository()
  const usersRepository = new PrismaUsersRepository()
  const shortenUrlUseCase = new ShortenUrlUseCase(urlsRepository, usersRepository)

  return shortenUrlUseCase
}
