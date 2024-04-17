import { beforeEach, describe, expect, it } from 'vitest'

import { RegisterUseCase } from './register'
import { InvalidCredentialsError } from '../../errors/user/invalid-credentials.error'
import { UserAlreadyExistsError } from '../../errors/user/user-already-exists.error'
import { InMemoryUsersRepository } from '../../repositories/user/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register a user', async () => {
    const result = await sut.execute({
      name: 'name',
      email: 'email',
      password: 'password',
    })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value).toStrictEqual(expect.any(String))
  })

  it('should be not able to register a user with no name', async () => {
    const result = await sut.execute({
      name: '',
      email: 'email',
      password: 'password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(
      InvalidCredentialsError,
    )
  })

  it('should be not able to register a user with no email', async () => {
    const result = await sut.execute({
      name: 'name',
      email: '',
      password: 'password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(
      InvalidCredentialsError,
    )
  })

  it('should be not able to register a user with no password', async () => {
    const result = await sut.execute({
      name: 'name',
      email: 'email',
      password: '',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(
      InvalidCredentialsError,
    )
  })

  it('should be not able to register a user with an existing email', async () => {
    const PASSWORD_HASH
      = '$2b$06$FuP7kzrmq7DyRTGqvhXGsutYdy1U0t.6hceAkvREgImL5UMUnEZju'

    await usersRepository.create({
      name: 'name',
      email: 'email',
      passwordHash: PASSWORD_HASH,
    })

    const result = await sut.execute({
      name: 'name',
      email: 'email',
      password: 'password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})
