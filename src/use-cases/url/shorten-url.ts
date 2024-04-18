import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { ShortUrlAlreadyExistsError } from '../../errors/url/short-url-already-exists.error'
import { UserNotFoundError } from '../../errors/user/user-not-found.error'
import type { UrlsRepository } from '../../repositories/url/url-repository'
import type { UsersRepository } from '../../repositories/user/users-repository'

interface ShortenUrlUseCaseRequest {
  shortUrl: string
  longUrl: string
  userId: string
}

type ShortenUrlUseCaseResponse = Either<
  ShortUrlAlreadyExistsError | UserNotFoundError,
  string
>

export class ShortenUrlUseCase {
  constructor(
    private urlsRepository: UrlsRepository,
    private usersRepository: UsersRepository,
  ) { }

  async execute({
    longUrl,
    shortUrl,
    userId,
  }: ShortenUrlUseCaseRequest): Promise<ShortenUrlUseCaseResponse> {
    const shortUrlAlreadyExists
      = await this.urlsRepository.findByShortUrl(shortUrl)

    if (shortUrlAlreadyExists)
      return left(new ShortUrlAlreadyExistsError())

    const user = await this.usersRepository.findById(userId)

    if (!user)
      return left(new UserNotFoundError())

    const urlId = await this.urlsRepository.create({
      longUrl,
      shortUrl,
      userId,
    })

    return right(urlId)
  }
}
