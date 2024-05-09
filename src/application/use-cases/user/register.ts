import type { Encrypter } from './cryptography/encrypter'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'
import type { Either } from '../../../core/either'
import { left, right } from '../../../core/either'
import type { UsersRepository } from '../../repositories/users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterUseCaseResponse = Either<
  InvalidCredentialsError | UserAlreadyExistsError,
  string
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

    const user = await this.usersRepository.findByEmail(email)

    if (user)
      return left(new UserAlreadyExistsError())

    const passwordHash = await this.encrypter.hash(password)

    return right(await this.usersRepository.create({
      name,
      email,
      passwordHash,
    }))
  }
}
