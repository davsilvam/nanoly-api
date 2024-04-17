import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinkRepository } from '../../repositories/link/in-memory-link-repository'
import { Link } from '../../entities/link'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import { FindLinkByShortUrlUseCase } from './find-link-by-short-url'

let linkRepository: InMemoryLinkRepository
let sut: FindLinkByShortUrlUseCase

describe('Find Link By Short Url Case', () => {
  beforeEach(() => {
    linkRepository = new InMemoryLinkRepository()
    sut = new FindLinkByShortUrlUseCase(linkRepository)
  })

  it('should be able to get a link by short url', async () => {
    const linkId = await linkRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const link = await linkRepository.findById(linkId)

    if (!link) {
      throw new Error('Link not found.')
    }

    const result = await sut.execute({ shortUrl: link.shortUrl })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(Link)
  })

  it('should not be able to get a link by a non-existent short url', async () => {
    const result = await sut.execute({ shortUrl: 'non-existent-short-url' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(LinkNotFoundError)
  })
})
