import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/user/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { User } from '../../entities/user'
import { InvalidCredentialsError } from '../../errors/user/invalid-credentials.error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase
const PASSWORD_HASH =
  '$2b$06$FuP7kzrmq7DyRTGqvhXGsutYdy1U0t.6hceAkvREgImL5UMUnEZju'

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate a user', async () => {
    await usersRepository.create({
      name: 'name',
      email: 'email',
      passwordHash: PASSWORD_HASH,
    })

    const result = await sut.execute({
      email: 'email',
      password: 'password',
    })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value).toBeInstanceOf(User)
  })

  it('should not be able to authenticate a user with invalid credentials', async () => {
    await usersRepository.create({
      name: 'name',
      email: 'email',
      passwordHash: PASSWORD_HASH,
    })

    const result = await sut.execute({
      email: 'email',
      password: 'invalid-password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate a user that does not exist', async () => {
    const result = await sut.execute({
      email: 'email',
      password: 'password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate a user with no email', async () => {
    const result = await sut.execute({
      email: '',
      password: 'password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate a user with no password', async () => {
    const result = await sut.execute({
      email: 'email',
      password: '',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(InvalidCredentialsError)
  })
})
