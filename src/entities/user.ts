import { randomUUID } from 'node:crypto'

interface UserProps {
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

  constructor({ name, email, passwordHash }: UserConstructorProps) {
    if (!name) {
      throw new Error('Name is required.')
    }

    if (!email) {
      throw new Error('Email is required.')
    }

    if (!passwordHash) {
      throw new Error('Password hash is required.')
    }

    this.props = {
      id: randomUUID(),
      name,
      email,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  get id() {
    return this.props.id
  }

  set id(id: string) {
    this.props.id = id
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get passwordHash() {
    return this.props.passwordHash
  }

  set passwordHash(passwordHash: string) {
    this.props.passwordHash = passwordHash
  }

  get createdAt() {
    return this.props.createdAt
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt
  }
}
