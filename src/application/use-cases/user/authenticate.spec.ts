import { beforeEach, describe, expect, it } from 'vitest'

import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'
import { BcryptEncrypter } from '../../../infra/cryptography/bcrypt-encrypter'
import { InMemoryUsersRepository } from '../../../infra/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase
const PASSWORD_HASH
  = '$2b$06$FuP7kzrmq7DyRTGqvhXGsutYdy1U0t.6hceAkvREgImL5UMUnEZju'

describe('authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    const bcryptEncrypter = new BcryptEncrypter()
    sut = new AuthenticateUseCase(usersRepository, bcryptEncrypter)
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
    expect(result.isRight() && result.value.email).toEqual('email')
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
      email: 'inexistent-email',
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
