import { hash } from 'bcrypt'
import type { Either } from '../../errors/either'
import { left, right } from '../../errors/either'
import { UserAlreadyExistsError } from '../../errors/user/user-already-exists.error'
import type { UsersRepository } from '../../repositories/user/users-repository'
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
  constructor(private usersRepository: UsersRepository) {}

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

    const passwordHash = await hash(password, 6)

    const result = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    })

    return right(result)
  }
}
