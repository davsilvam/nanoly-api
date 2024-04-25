import { PrismaUrlsRepository } from '../../../../infra/repositories/prisma/prisma-urls-repository'
import { GetRedirectUrlUseCase } from '../get-redirect-url'

export function makeGetRedirectUrlUseCase() {
  const urlsRepository = new PrismaUrlsRepository()
  const getRedirectUrl = new GetRedirectUrlUseCase(urlsRepository)

  return getRedirectUrl
}
