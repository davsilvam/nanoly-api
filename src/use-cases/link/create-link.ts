import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { ShortUrlAlreadyExistsError } from '../../errors/link/short-url-already-exists.error'
import { UserNotFoundError } from '../../errors/user/user-not-found.error'
import type { LinksRepository } from '../../repositories/link/links-repository'
import type { UsersRepository } from '../../repositories/user/users-repository'

interface CreateLinkUseCaseRequest {
  shortUrl: string
  longUrl: string
  userId: string
}

type CreateLinkUseCaseResponse = Either<
  ShortUrlAlreadyExistsError | UserNotFoundError,
  string
>

export class CreateLinkUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    longUrl,
    shortUrl,
    userId,
  }: CreateLinkUseCaseRequest): Promise<CreateLinkUseCaseResponse> {
    const shortUrlAlreadyExists
      = await this.linksRepository.findByShortUrl(shortUrl)

    if (shortUrlAlreadyExists)
      return left(new ShortUrlAlreadyExistsError())

    const user = await this.usersRepository.findById(userId)

    if (!user)
      return left(new UserNotFoundError())

    const linkId = await this.linksRepository.create({
      longUrl,
      shortUrl,
      userId,
    })

    return right(linkId)
  }
}
