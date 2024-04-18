import type { User, UserProps } from '../../entities/user/user'

export interface CreateUserRequest {
  name: string
  email: string
  passwordHash: string
}

export interface UsersRepository {
  create: (request: CreateUserRequest) => Promise<string>
  findByEmail: (email: string) => Promise<UserProps | null>
  findById: (id: string) => Promise<UserProps | null>
}
