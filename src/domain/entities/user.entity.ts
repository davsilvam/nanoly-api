import { Entity } from '@/core/domain/entity'
import type { Replace } from '@/core/logic/replace'

export interface UserProps {
  name: string
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get passwordHash() {
    return this.props.passwordHash
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Replace<
      UserProps,
      {
        createdAt?: Date
        updatedAt?: Date
      }
    >,
    id?: string,
  ) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )

    return user
  }
}
