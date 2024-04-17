import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../../repositories/user/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { User } from '../../entities/user'
import { InvalidCredentialsError } from '../../errors/user/invalid-credentials.error'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUseCase
const PASSWORD_HASH =
  '$2b$06$FuP7kzrmq7DyRTGqvhXGsutYdy1U0t.6hceAkvREgImL5UMUnEZju'

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate a user', async () => {
    await userRepository.create({
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
    await userRepository.create({
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
