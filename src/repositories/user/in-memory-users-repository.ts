import type {
  CreateUserRequest,
  UsersRepository,
} from './users-repository'
import type { User, UserProps } from '../../entities/user/user'
import { UserMapper } from '../../entities/user/user-mapper'

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
