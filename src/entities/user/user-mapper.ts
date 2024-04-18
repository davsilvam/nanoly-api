import type { UserProps } from './user'
import { User } from './user'
import { UserDTO } from './user-dto'
import type { CreateUserRequest } from '../../repositories/user/users-repository'

export class UserMapper {
  static toEntity({ name, email, passwordHash }: CreateUserRequest): User {
    return new User({
      name,
      email,
      passwordHash,
    })
  }

  static toDTO(props: UserProps): UserDTO {
    return new UserDTO(props)
  }
}
