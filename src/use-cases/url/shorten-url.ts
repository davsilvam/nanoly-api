import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { ShortURLAlreadyExistsError } from '../../errors/url/short-url-already-exists.error'
import { UserNotFoundError } from '../../errors/user/user-not-found.error'
import type { URLsRepository } from '../../repositories/url/url-repository'
import type { UsersRepository } from '../../repositories/user/users-repository'

interface ShortenURLUseCaseRequest {
  shortUrl: string
  longUrl: string
  userId: string
}

type ShortenURLUseCaseResponse = Either<
  ShortURLAlreadyExistsError | UserNotFoundError,
  string
>

export class ShortenURLUseCase {
  constructor(
    private urlsRepository: URLsRepository,
    private usersRepository: UsersRepository,
  ) { }

  async execute({
    longUrl,
    shortUrl,
    userId,
  }: ShortenURLUseCaseRequest): Promise<ShortenURLUseCaseResponse> {
    const shortUrlAlreadyExists
      = await this.urlsRepository.findByShortUrl(shortUrl)

    if (shortUrlAlreadyExists)
      return left(new ShortURLAlreadyExistsError())

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
