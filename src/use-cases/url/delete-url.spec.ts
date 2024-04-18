import { beforeEach, describe, expect, it } from 'vitest'

import { DeleteURLUseCase } from './delete-url'
import { URLNotFoundError } from '../../errors/url/url-not-found.error'
import { InMemoryURLsRepository } from '../../repositories/url/in-memory-urls-repository'

let urlsRepository: InMemoryURLsRepository
let sut: DeleteURLUseCase

describe('delete url use case', () => {
  beforeEach(() => {
    urlsRepository = new InMemoryURLsRepository()
    sut = new DeleteURLUseCase(urlsRepository)
  })

  it('should be able to delete a url by id', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const result = await sut.execute({ id: urlId })

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to delete a url by a non-existent id', async () => {
    const result = await sut.execute({ id: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(URLNotFoundError)
  })
})
