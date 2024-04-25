import { InvalidCredentialsError } from './errors/invalid-credentials.error'
import type { UserProps } from '../../../domain/entities/user/user'
import type { Either } from '../../../domain/errors/either'
import { left, right } from '../../../domain/errors/either'
import type { UsersRepository } from '../../../domain/repositories/users-repository'
import type { Encrypter } from '../../../infra/cryptography/encrypter'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<InvalidCredentialsError, UserProps>

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private encrypter: Encrypter,
  ) { }

  public async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user)
      return left(new InvalidCredentialsError())

    const passwordMatch = await this.encrypter.compare(password, user.passwordHash)

    if (!passwordMatch)
      return left(new InvalidCredentialsError())

    return right(user)
  }
}
