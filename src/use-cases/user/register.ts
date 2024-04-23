import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { InvalidCredentialsError } from '../../errors/user/invalid-credentials.error'
import { UserAlreadyExistsError } from '../../errors/user/user-already-exists.error'
import type { UsersRepository } from '../../repositories/user/users-repository'
import type { Encrypter } from '../../utils/encrypter'

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
