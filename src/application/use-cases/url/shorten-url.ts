import { InvalidShortUrlError } from './errors/invalid-short-url.error'
import { ShortUrlAlreadyExistsError } from './errors/short-url-already-exists.error'
import type { UrlsRepository } from '../../repositories/urls-repository'
import type { UsersRepository } from '../../repositories/users-repository'
import { UserNotFoundError } from '../user/errors/user-not-found.error'

import { left, right } from '@/core/logic/either'
import type { Either } from '@/core/logic/either'
import { Url } from '@/domain/entities/url.entity'

interface ShortenUrlUseCaseRequest {
  shortUrl: string
  longUrl: string
  userId: string
}

type ShortenUrlUseCaseResponse = Either<
  InvalidShortUrlError | ShortUrlAlreadyExistsError | UserNotFoundError,
  Url
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
    if (shortUrl.length < 4 || shortUrl.length > 16)
      return left(new InvalidShortUrlError())

    const shortUrlAlreadyExists
      = await this.urlsRepository.findByShortUrl(shortUrl)

    if (shortUrlAlreadyExists)
      return left(new ShortUrlAlreadyExistsError())

    const user = await this.usersRepository.findById(userId)

    if (!user)
      return left(new UserNotFoundError())

    const url = Url.create({
      longUrl,
      shortUrl,
      userId,
    })

    await this.urlsRepository.create(url)

    return right(url)
  }
}
