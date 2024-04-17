import { compare } from 'bcrypt'
import { Either, left, right } from '../../errors/either'
import { UserRepository } from '../../repositories/user/user-repository'
import { InvalidCredentialsError } from '../../errors/user/invalid-credentials.error'
import { User } from '../../entities/user'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<InvalidCredentialsError, User>

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left(new InvalidCredentialsError())
    }

    const passwordMatch = await compare(password, user.passwordHash)

    if (!passwordMatch) {
      return left(new InvalidCredentialsError())
    }

    return right(user)
  }
}
