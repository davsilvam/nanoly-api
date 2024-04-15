import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinkRepository } from '../../repositories/link/in-memory-link-repository'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import { DeleteLinkUseCase } from './delete-link'

let linksRepository: InMemoryLinkRepository
let sut: DeleteLinkUseCase

describe('Delete Link Use Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinkRepository()
    sut = new DeleteLinkUseCase(linksRepository)
  })

  it('should be able to delete a link by id', async () => {
    const { linkId } = await linksRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const response = await sut.execute({ id: linkId })

    expect(response.isRight()).toBe(true)
  })

  it('should not be able to delete a link by a non-existent id', async () => {
    const response = await sut.execute({ id: 'non-existent-id' })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(LinkNotFoundError)
  })
})
