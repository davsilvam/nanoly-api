import { GetRedirectUrlUseCase } from '../../../application/use-cases/url/get-redirect-url'
import { PrismaUrlsRepository } from '../../../infra/repositories/prisma/prisma-urls-repository'

export function makeGetRedirectUrlUseCase() {
  const urlsRepository = new PrismaUrlsRepository()
  const getRedirectUrl = new GetRedirectUrlUseCase(urlsRepository)

  return getRedirectUrl
}
