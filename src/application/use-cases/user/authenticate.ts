import type { Encrypter } from './cryptography/encrypter'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'
import type { Either } from '../../../core/either'
import { left, right } from '../../../core/either'
import type { UserProps } from '../../../domain/entities/user.entity'
import type { UsersRepository } from '../../repositories/users-repository'

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
