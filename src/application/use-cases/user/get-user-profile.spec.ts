import { beforeEach, describe, expect, it } from 'vitest'

import { UserNotFoundError } from './errors/user-not-found.error'
import { GetUserProfileUseCase } from './get-user-profile'
import { InMemoryUsersRepository } from '../../../infra/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('get user profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get a user profile', async () => {
    const userId = await usersRepository.create({
      name: 'name',
      email: 'email',
      passwordHash: 'passwordHash',
    })

    const result = await sut.execute({ id: userId })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value.email).toEqual('email')
  })

  it('should not be able to get a user profile that does not exist', async () => {
    const result = await sut.execute({ id: 'invalid-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(UserNotFoundError)
  })

  it('should not be able to get a user profile with no id', async () => {
    const result = await sut.execute({ id: '' })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(UserNotFoundError)
  })
})
