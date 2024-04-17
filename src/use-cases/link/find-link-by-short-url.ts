import { Link } from '../../entities/link'
import { Either, left, right } from '../../errors/either'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import { LinkRepository } from '../../repositories/link/link-repository'

interface FindLinkByShortUrlUseCaseRequest {
  shortUrl: string
}

type FindLinkByShortUrlUseCaseResponse = Either<LinkNotFoundError, Link>

export class FindLinkByShortUrlUseCase {
  constructor(private linkRepository: LinkRepository) {}

  public async execute({
    shortUrl,
  }: FindLinkByShortUrlUseCaseRequest): Promise<FindLinkByShortUrlUseCaseResponse> {
    const link = await this.linkRepository.findByShortUrl(shortUrl)

    if (!link) {
      return left(new LinkNotFoundError())
    }

    return right(link)
  }
}
