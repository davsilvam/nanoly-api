import type { User } from '@/domain/entities/user.entity'

export interface CreateUserRequest {
  name: string
  email: string
  passwordHash: string
}

export interface UsersRepository {
  create: (user: User) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
  findById: (id: string) => Promise<User | null>
}
