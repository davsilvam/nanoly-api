import { hash } from 'bcrypt'
import { Either, left, right } from '../../errors/either'
import { UserAlreadyExistsError } from '../../errors/user/user-already-exists.error'
import { UserRepository } from '../../repositories/user/user-repository'
import { InvalidCredentialsError } from '../../errors/user/invalid-credentials.error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterUseCaseResponse = Either<
  UserAlreadyExistsError | InvalidCredentialsError,
  string
>

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    if (!name || !email || !password) {
      return left(new InvalidCredentialsError())
    }

    const user = await this.userRepository.findByEmail(email)

    if (user) {
      return left(new UserAlreadyExistsError())
    }

    const passwordHash = await hash(password, 6)

    const result = await this.userRepository.create({
      name,
      email,
      passwordHash,
    })

    return right(result)
  }
}
