import type { Encrypter } from './cryptography/encrypter'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'
import type { UsersRepository } from '../../repositories/users-repository'

import type { Either } from '@/core/logic/either'
import { left, right } from '@/core/logic/either'
import { User } from '@/domain/entities/user.entity'
import { Email } from '@/domain/value-objects/email'
import { EmailBadFormattedError } from '@/domain/value-objects/errors/email-bad-formatted.error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterUseCaseResponse = Either<
  InvalidCredentialsError | EmailBadFormattedError | UserAlreadyExistsError,
  User
>

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private encrypter: Encrypter,
  ) { }

  public async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    if (!name || !email || !password)
      return left(new InvalidCredentialsError())

    const isInvalidEmail = !Email.validate(email)

    if (isInvalidEmail)
      return left(new EmailBadFormattedError())

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists)
      return left(new UserAlreadyExistsError())

    const passwordHash = await this.encrypter.hash(password)

    const user = User.create({
      name,
      email,
      passwordHash,
    })

    await this.usersRepository.create(user)

    return right(user)
  }
}
