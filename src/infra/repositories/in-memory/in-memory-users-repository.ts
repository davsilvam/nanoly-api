import type { User, UserProps } from '../../../domain/entities/user/user'
import { UserMapper } from '../../../domain/entities/user/user-mapper'
import type {
  CreateUserRequest,
  UsersRepository,
} from '../../../domain/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async create({ name, email, passwordHash }: CreateUserRequest): Promise<string> {
    const user = UserMapper.toEntity({ name, email, passwordHash })

    this.users.push(user)

    return Promise.resolve(user.id)
  }

  async findByEmail(email: string): Promise<UserProps | null> {
    const user = this.users.find(item => item.email === email)

    if (!user)
      return Promise.resolve(null)

    return Promise.resolve(user.toObject())
  }

  async findById(id: string): Promise<UserProps | null> {
    const user = this.users.find(item => item.id === id)

    if (!user)
      return Promise.resolve(null)

    return Promise.resolve(user.toObject())
  }
}
