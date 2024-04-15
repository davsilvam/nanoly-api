import { beforeEach, describe, expect, it } from 'vitest'
import { CreateLinkUseCase } from './create-link'
import { InMemoryLinkRepository } from '../../repositories/link/in-memory-link-repository'
import { ShortUrlAlreadyExistsError } from '../../errors/link/short-url-already-exists.error'
import { Link } from '../../entities/link'

let linksRepository: InMemoryLinkRepository
let sut: CreateLinkUseCase

describe('Create Link Use Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinkRepository()
    sut = new CreateLinkUseCase(linksRepository)
  })

  it('should be able to create a link', async () => {
    const result = await sut.execute({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value).toMatchObject({ linkId: expect.any(String) })
  })

  it('should not be able to create a link with an existing short url', async () => {
    await sut.execute({
      longUrl: 'https://www.google.com',
      shortUrl: 'existing-short-url',
      userId: 'user-id',
    })

    const result = await sut.execute({
      longUrl: 'https://www.yahoo.com',
      shortUrl: 'existing-short-url',
      userId: 'user-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ShortUrlAlreadyExistsError)
  })
})
