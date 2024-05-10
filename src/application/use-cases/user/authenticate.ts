import type { User } from '@prisma/client'

import type { Encrypter } from './cryptography/encrypter'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'
import type { UsersRepository } from '../../repositories/users-repository'

import type { Either } from '@/core/logic/either'
import { left } from '@/core/logic/either'
import { Email } from '@/domain/value-objects/email'
import { EmailBadFormattedError } from '@/domain/value-objects/errors/email-bad-formatted.error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  EmailBadFormattedError | InvalidCredentialsError,
  User
>

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private encrypter: Encrypter,
  ) { }

  public async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const isEmailBadFormatted = Email.create(email).isLeft()

    if (isEmailBadFormatted)
      return left(new EmailBadFormattedError())

    const user = await this.usersRepository.findByEmail(email)

    if (!user)
      return left(new InvalidCredentialsError())

    return user.authenticate(password, this.encrypter)
  }
}
