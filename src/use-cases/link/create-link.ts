import { Either, left, right } from '../../errors/either'
import { ShortUrlAlreadyExistsError } from '../../errors/link/short-url-already-exists.error'
import { LinkRepository } from '../../repositories/link/link-repository'

interface CreateLinkUseCaseRequest {
  shortUrl: string
  longUrl: string
  userId: string
}

type CreateLinkUseCaseResponse = Either<
  ShortUrlAlreadyExistsError,
  { linkId: string }
>

export class CreateLinkUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute({
    longUrl,
    shortUrl,
    userId,
  }: CreateLinkUseCaseRequest): Promise<CreateLinkUseCaseResponse> {
    const shortUrlAlreadyExists =
      await this.linkRepository.findByShortUrl(shortUrl)

    if (shortUrlAlreadyExists) {
      return left(new ShortUrlAlreadyExistsError())
    }

    const result = await this.linkRepository.create({
      longUrl,
      shortUrl,
      userId,
    })

    return right(result)
  }
}
