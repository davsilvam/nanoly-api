import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinkRepository } from '../../repositories/link/in-memory-link-repository'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import { DeleteLinkUseCase } from './delete-link'

let linkRepository: InMemoryLinkRepository
let sut: DeleteLinkUseCase

describe('Delete Link Use Case', () => {
  beforeEach(() => {
    linkRepository = new InMemoryLinkRepository()
    sut = new DeleteLinkUseCase(linkRepository)
  })

  it('should be able to delete a link by id', async () => {
    const linkId = await linkRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const result = await sut.execute({ id: linkId })

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to delete a link by a non-existent id', async () => {
    const result = await sut.execute({ id: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(LinkNotFoundError)
  })
})
