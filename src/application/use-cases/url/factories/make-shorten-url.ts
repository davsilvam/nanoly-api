import { PrismaUrlsRepository } from '../../../../infra/repositories/prisma/prisma-urls-repository'
import { PrismaUsersRepository } from '../../../../infra/repositories/prisma/prisma-users-repository'
import { ShortenUrlUseCase } from '../shorten-url'

export function makeShortenUrlUseCase() {
  const urlsRepository = new PrismaUrlsRepository()
  const usersRepository = new PrismaUsersRepository()
  const shortenUrlUseCase = new ShortenUrlUseCase(urlsRepository, usersRepository)

  return shortenUrlUseCase
}
