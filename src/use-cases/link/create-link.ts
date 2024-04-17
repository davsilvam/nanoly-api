import { Either, left, right } from '../../errors/either'
import { ShortUrlAlreadyExistsError } from '../../errors/link/short-url-already-exists.error'
import { UserNotFoundError } from '../../errors/user/user-not-found.error'
import { LinkRepository } from '../../repositories/link/link-repository'
import { UserRepository } from '../../repositories/user/user-repository'

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
    private linkRepository: LinkRepository,
    private userRepository: UserRepository,
  ) {}

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

    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    const linkId = await this.linkRepository.create({
      longUrl,
      shortUrl,
      userId,
    })

    return right(linkId)
  }
}
