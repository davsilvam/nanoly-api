import type { Url } from './url.entity'

import type { Encrypter } from '@/application/use-cases/user/cryptography/encrypter'
import { InvalidCredentialsError } from '@/application/use-cases/user/errors/invalid-credentials.error'
import { Entity } from '@/core/domain/entity'
import { type Either, left, right } from '@/core/logic/either'
import type { Replace } from '@/core/logic/replace'

export interface UserProps {
  name: string
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
  urls: Url[]
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

  get urls() {
    return this.props.urls
  }

  static create(
    props: Replace<
      UserProps,
      {
        createdAt?: Date
        updatedAt?: Date
        urls?: Url[]
      }
    >,
    id?: string,
  ) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        urls: props.urls ?? [],
      },
      id,
    )

    return user
  }

  static async hashPassword(password: string, encrypter: Encrypter): Promise<string> {
    return await encrypter.hash(password)
  }

  public async comparePassword(password: string, encrypter: Encrypter): Promise<boolean> {
    return await encrypter.compare(password, this.passwordHash)
  }

  public async authenticate(password: string, encrypter: Encrypter): Promise<Either<InvalidCredentialsError, this>> {
    const passwordMatches = await this.comparePassword(password, encrypter)

    if (!passwordMatches)
      return left(new InvalidCredentialsError())

    return right(this)
  }

  public addUrl(url: Url): void {
    this.props.urls.push(url)
  }

  public removeUrl(urlId: string): void {
    this.props.urls = this.props.urls.filter(url => url.id !== urlId)
  }
}
