import { User } from './user'
import type { CreateUserRequest } from '../../repositories/users-repository'

export class UserMapper {
  static toEntity({ name, email, passwordHash }: CreateUserRequest): User {
    return new User({
      name,
      email,
      passwordHash,
    })
  }
}
