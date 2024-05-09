import { ShortenUrlUseCase } from '@/application/use-cases/url/shorten-url'
import { PrismaUrlsRepository } from '@/infra/database/prisma/repositories/prisma-urls-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export function makeShortenUrlUseCase() {
  const urlsRepository = new PrismaUrlsRepository()
  const usersRepository = new PrismaUsersRepository()
  const shortenUrlUseCase = new ShortenUrlUseCase(urlsRepository, usersRepository)

  return shortenUrlUseCase
}
