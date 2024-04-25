import { ShortUrlAlreadyExistsError } from './errors/short-url-already-exists.error'
import type { Either } from '../../../domain/errors/either'
import { left, right } from '../../../domain/errors/either'
import type { UrlsRepository } from '../../../domain/repositories/url-repository'
import type { UsersRepository } from '../../../domain/repositories/users-repository'
import { UserNotFoundError } from '../user/errors/user-not-found.error'

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
