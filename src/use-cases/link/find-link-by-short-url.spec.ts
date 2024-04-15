import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinkRepository } from '../../repositories/link/in-memory-link-repository'
import { Link } from '../../entities/link'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import { FindLinkByShortUrlUseCase } from './find-link-by-short-url'

let linksRepository: InMemoryLinkRepository
let sut: FindLinkByShortUrlUseCase

describe('Find Link By Short Url Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinkRepository()
    sut = new FindLinkByShortUrlUseCase(linksRepository)
  })

  it('should be able to get a link by short url', async () => {
    const { linkId } = await linksRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const link = await linksRepository.findById(linkId)

    if (!link) {
      throw new Error('Link not found.')
    }

    const response = await sut.execute({ shortUrl: link.shortUrl })

    expect(response.isRight()).toBe(true)
    expect(response.value).toBeInstanceOf(Link)
  })

  it('should not be able to get a link by a non-existent short url', async () => {
    const response = await sut.execute({ shortUrl: 'non-existent-short-url' })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(LinkNotFoundError)
  })
})
