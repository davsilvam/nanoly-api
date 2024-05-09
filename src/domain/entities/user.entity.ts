import { randomUUID } from 'node:crypto'

export interface UserProps {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

type UserConstructorProps = Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>

export class User {
  private props: UserProps

  get id() {
    return this.props.id
  }

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

  constructor({ name, email, passwordHash }: UserConstructorProps) {
    if (!name)
      throw new Error('Name is required.')

    if (!email)
      throw new Error('Email is required.')

    if (!passwordHash)
      throw new Error('Password hash is required.')

    this.props = {
      id: randomUUID(),
      name,
      email,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  public toObject(): UserProps {
    return this.props
  }
}
