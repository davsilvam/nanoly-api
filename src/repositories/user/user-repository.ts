import { User } from '../../entities/user'

export type CreateUserRequest = {
  name: string
  email: string
  passwordHash: string
}

export type UpdateUserRequest = {
  id: string
  name?: string
  email?: string
  passwordHash?: string
}

export interface UserRepository {
  create(request: CreateUserRequest): Promise<{ userId: string }>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  update(request: UpdateUserRequest): Promise<void>
  delete(id: string): Promise<void>
}
