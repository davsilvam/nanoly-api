import { beforeEach, describe, expect, it } from 'vitest'

import { FindURLByIdUseCase } from './find-url-by-id'
import { URL } from '../../entities/url'
import { URLNotFoundError } from '../../errors/url/url-not-found.error'
import { InMemoryURLsRepository } from '../../repositories/url/in-memory-urls-repository'

let urlsRepository: InMemoryURLsRepository
let sut: FindURLByIdUseCase

describe('find url by id use case', () => {
  beforeEach(() => {
    urlsRepository = new InMemoryURLsRepository()
    sut = new FindURLByIdUseCase(urlsRepository)
  })

  it('should be able to get a url by id', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const url = await urlsRepository.findById(urlId)

    if (!url)
      throw new Error('URL not found.')

    const result = await sut.execute({ id: url.id })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(URL)
  })

  it('should not be able to get a url by a non-existent id', async () => {
    const result = await sut.execute({ id: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(URLNotFoundError)
  })
})
