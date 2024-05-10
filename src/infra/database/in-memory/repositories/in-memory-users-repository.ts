import type { UsersRepository } from '@/application/repositories/users-repository'
import type { User } from '@/domain/entities/user.entity'

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async create(user: User): Promise<User> {
    this.users.push(user)

    return Promise.resolve(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(item => item.email === email)

    if (!user)
      return Promise.resolve(null)

    return Promise.resolve(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(item => item.id === id)

    if (!user)
      return Promise.resolve(null)

    return Promise.resolve(user)
  }
}
