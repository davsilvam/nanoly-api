import { beforeEach, describe, expect, it } from 'vitest'

import { FindURLByShortURLUseCase } from './find-url-by-short-url'
import { URL } from '../../entities/url'
import { URLNotFoundError } from '../../errors/url/url-not-found.error'
import { InMemoryURLsRepository } from '../../repositories/url/in-memory-urls-repository'

let urlsRepository: InMemoryURLsRepository
let sut: FindURLByShortURLUseCase

describe('find url by short url case', () => {
  beforeEach(() => {
    urlsRepository = new InMemoryURLsRepository()
    sut = new FindURLByShortURLUseCase(urlsRepository)
  })

  it('should be able to get a url by short url', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const url = await urlsRepository.findById(urlId)

    if (!url)
      throw new Error('URL not found.')

    const result = await sut.execute({ shortUrl: url.shortUrl })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(URL)
  })

  it('should not be able to get a url by a non-existent short url', async () => {
    const result = await sut.execute({ shortUrl: 'non-existent-short-url' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(URLNotFoundError)
  })
})
