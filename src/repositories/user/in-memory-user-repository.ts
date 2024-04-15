import { User } from '../../entities/user'
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserRepository,
} from './user-repository'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  create({
    name,
    email,
    passwordHash,
  }: CreateUserRequest): Promise<{ userId: string }> {
    const user = new User({ name, email, passwordHash })

    this.users.push(user)

    return Promise.resolve({
      userId: user.id,
    })
  }

  findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(item => item.email === email) || null

    return Promise.resolve(user)
  }

  findById(id: string): Promise<User | null> {
    const user = this.users.find(item => item.id === id) || null

    return Promise.resolve(user)
  }

  update({ id, email, name, passwordHash }: UpdateUserRequest): Promise<void> {
    const userIndex = this.users.findIndex(item => item.id === id)

    if (name) {
      this.users[userIndex].name = name
    }

    if (email) {
      this.users[userIndex].email = email
    }

    if (passwordHash) {
      this.users[userIndex].passwordHash = passwordHash
    }

    return Promise.resolve()
  }

  delete(id: string): Promise<void> {
    this.users = this.users.filter(item => item.id !== id)

    return Promise.resolve()
  }
}
