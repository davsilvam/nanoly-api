import type { UserProps } from './user'

export class UserDTO {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor(props: UserProps) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }
}
