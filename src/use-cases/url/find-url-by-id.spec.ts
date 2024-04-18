import { beforeEach, describe, expect, it } from 'vitest'

import { FindUrlByIdUseCase } from './find-url-by-id'
import { Url } from '../../entities/url/url'
import { UrlNotFoundError } from '../../errors/url/url-not-found.error'
import { InMemoryUrlsRepository } from '../../repositories/url/in-memory-urls-repository'

let urlsRepository: InMemoryUrlsRepository
let sut: FindUrlByIdUseCase

describe('find url by id use case', () => {
  beforeEach(() => {
    urlsRepository = new InMemoryUrlsRepository()
    sut = new FindUrlByIdUseCase(urlsRepository)
  })

  it('should be able to get a url by id', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const url = await urlsRepository.findById(urlId)

    if (!url)
      throw new Error('Url not found.')

    const result = await sut.execute({ id: url.id })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(Url)
  })

  it('should not be able to get a url by a non-existent id', async () => {
    const result = await sut.execute({ id: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UrlNotFoundError)
  })
})
