import { Either, left, right } from '../../errors/either'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import { LinkRepository } from '../../repositories/link/link-repository'

interface UpdateLinkUseCaseRequest {
  id: string
  shortUrl?: string
  longUrl?: string
  clicksCount?: number
}

type UpdateLinkUseCaseResponse = Either<LinkNotFoundError, void>

export class UpdateLinkUseCase {
  constructor(private linkRepository: LinkRepository) {}

  public async execute({
    id,
    shortUrl,
    longUrl,
    clicksCount,
  }: UpdateLinkUseCaseRequest): Promise<UpdateLinkUseCaseResponse> {
    const link = await this.linkRepository.findById(id)

    if (!link) {
      return left(new LinkNotFoundError())
    }

    return right(
      await this.linkRepository.update({
        id,
        shortUrl,
        longUrl,
        clicksCount,
      }),
    )
  }
}
