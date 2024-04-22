import { PrismaUrlsRepository } from '../../../repositories/url/prisma-urls-repository'
import { PrismaUsersRepository } from '../../../repositories/user/prisma-users-repository'
import { ShortenUrlUseCase } from '../shorten-url'

export function makeShortenUrlUseCase() {
  const urlsRepository = new PrismaUrlsRepository()
  const usersRepository = new PrismaUsersRepository()
  const shortenUrlUseCase = new ShortenUrlUseCase(urlsRepository, usersRepository)

  return shortenUrlUseCase
}
