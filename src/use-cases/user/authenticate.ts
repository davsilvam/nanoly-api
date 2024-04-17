import { compare } from 'bcrypt'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import type { UsersRepository } from '../../repositories/user/users-repository'
import { InvalidCredentialsError } from '../../errors/user/invalid-credentials.error'
import type { User } from '../../entities/user'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<InvalidCredentialsError, User>

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user)
      return left(new InvalidCredentialsError())

    const passwordMatch = await compare(password, user.passwordHash)

    if (!passwordMatch)
      return left(new InvalidCredentialsError())

    return right(user)
  }
}
