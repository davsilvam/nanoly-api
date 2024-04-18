import { beforeEach, describe, expect, it } from 'vitest'

import { UpdateURLUseCase } from './update-url'
import { URL } from '../../entities/url'
import { URLNotFoundError } from '../../errors/url/url-not-found.error'
import { InMemoryURLsRepository } from '../../repositories/url/in-memory-urls-repository'

let urlsRepository: InMemoryURLsRepository
let sut: UpdateURLUseCase

describe('update url use case', () => {
  beforeEach(() => {
    urlsRepository = new InMemoryURLsRepository()
    sut = new UpdateURLUseCase(urlsRepository)
  })

  it('should be able to update a url by id', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const url = await urlsRepository.findById(urlId)

    if (!url)
      throw new Error('URL not found.')

    const result = await sut.execute({
      id: url.id,
      longUrl: 'https://www.google.com.br',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeUndefined()

    const updatedURL = await urlsRepository.findById(urlId)

    expect(updatedURL).toBeInstanceOf(URL)
    expect(updatedURL?.longUrl).toBe('https://www.google.com.br')
  })

  it('should not be able to update a url by a non-existent id', async () => {
    const result = await sut.execute({
      id: 'non-existent-id',
      longUrl: 'https://www.google.com.br',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(URLNotFoundError)
  })
})
