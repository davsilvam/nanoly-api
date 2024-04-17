import type { Link } from '../../entities/link'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import type { LinksRepository } from '../../repositories/link/links-repository'

interface FindLinkByShortUrlUseCaseRequest {
  shortUrl: string
}

type FindLinkByShortUrlUseCaseResponse = Either<LinkNotFoundError, Link>

export class FindLinkByShortUrlUseCase {
  constructor(private linksRepository: LinksRepository) {}

  public async execute({
    shortUrl,
  }: FindLinkByShortUrlUseCaseRequest): Promise<FindLinkByShortUrlUseCaseResponse> {
    const link = await this.linksRepository.findByShortUrl(shortUrl)

    if (!link)
      return left(new LinkNotFoundError())

    return right(link)
  }
}
