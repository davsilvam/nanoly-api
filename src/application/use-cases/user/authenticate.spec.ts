import { beforeEach, describe, expect, it } from 'vitest'

import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

import { User } from '@/domain/entities/user.entity'
import { EmailBadFormattedError } from '@/domain/value-objects/errors/email-bad-formatted.error'
import { Base64Encrypter } from '@/infra/cryptography/base64-encrypter'
import { InMemoryUsersRepository } from '@/infra/database/in-memory/repositories/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase
let PASSWORD_HASH: string

describe('authenticate use case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    const base64Encrypter = new Base64Encrypter()
    sut = new AuthenticateUseCase(usersRepository, base64Encrypter)

    PASSWORD_HASH = await base64Encrypter.hash('password')
  })

  it('should be able to authenticate a user', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      passwordHash: PASSWORD_HASH,
    })

    await usersRepository.create(user)

    const result = await sut.execute({
      email: 'johndoe@email.com',
      password: 'password',
    })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value).toEqual(user)
  })

  it('should not be able to authenticate a user with invalid credentials', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      passwordHash: PASSWORD_HASH,
    })

    await usersRepository.create(user)

    const result = await sut.execute({
      email: 'johndoe@email.com',
      password: 'invalid-password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate a user that does not exist', async () => {
    const result = await sut.execute({
      email: 'inexistent@email.com',
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
    expect(result.isLeft() && result.value).toBeInstanceOf(EmailBadFormattedError)
  })

  it('should not be able to authenticate a user with no password', async () => {
    const result = await sut.execute({
      email: 'johndoe@email.com',
      password: '',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(InvalidCredentialsError)
  })
})
