import { beforeEach, describe, expect, it } from 'vitest'

import { InvalidCredentialsError } from './errors/invalid-credentials.error'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'
import { RegisterUseCase } from './register'

import { User } from '@/domain/entities/user.entity'
import { EmailBadFormattedError } from '@/domain/value-objects/errors/email-bad-formatted.error'
import { BcryptEncrypter } from '@/infra/cryptography/bcrypt-encrypter'
import { InMemoryUsersRepository } from '@/infra/database/in-memory/repositories/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    const bcryptEncrypter = new BcryptEncrypter()
    sut = new RegisterUseCase(usersRepository, bcryptEncrypter)
  })

  it('should be able to register a user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'password',
    })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value).toBeInstanceOf(User)
  })

  it('should be not able to register a user with no name', async () => {
    const result = await sut.execute({
      name: '',
      email: 'johndoe@email.com',
      password: 'password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(
      InvalidCredentialsError,
    )
  })

  it('should be not able to register a user with no email', async () => {
    const result = await sut.execute({
      name: 'John Doe',
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
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(
      InvalidCredentialsError,
    )
  })

  it('should be not able to register a user with an invalid email', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'invalid-email',
      password: 'password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(
      EmailBadFormattedError,
    )
  })

  it('should be not able to register a user with an existing email', async () => {
    const PASSWORD_HASH
      = '$2b$06$FuP7kzrmq7DyRTGqvhXGsutYdy1U0t.6hceAkvREgImL5UMUnEZju'

    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      passwordHash: PASSWORD_HASH,
    })

    await usersRepository.create(user)

    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})
