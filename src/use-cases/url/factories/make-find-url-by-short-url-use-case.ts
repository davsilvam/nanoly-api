import { PrismaUrlsRepository } from '../../../repositories/url/prisma-urls-repository'
import { FindUrlByShortUrlUseCase } from '../find-url-by-short-url'

export function makeFindUrlByShortUrlUseCase() {
  const urlsRepository = new PrismaUrlsRepository()
  const findUrlByShortUrl = new FindUrlByShortUrlUseCase(urlsRepository)

  return findUrlByShortUrl
}
