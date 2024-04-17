import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import type { LinksRepository } from '../../repositories/link/links-repository'

interface UpdateLinkUseCaseRequest {
  id: string
  shortUrl?: string
  longUrl?: string
  clicksCount?: number
}

type UpdateLinkUseCaseResponse = Either<LinkNotFoundError, void>

export class UpdateLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  public async execute({
    id,
    shortUrl,
    longUrl,
    clicksCount,
  }: UpdateLinkUseCaseRequest): Promise<UpdateLinkUseCaseResponse> {
    const link = await this.linksRepository.findById(id)

    if (!link)
      return left(new LinkNotFoundError())

    return right(
      await this.linksRepository.update({
        id,
        shortUrl,
        longUrl,
        clicksCount,
      }),
    )
  }
}
