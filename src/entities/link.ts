import { randomUUID } from 'node:crypto'

interface LinkProps {
  id: string
  shortUrl: string
  longUrl: string
  clicksCount: number
  createdAt: Date
  updatedAt: Date
  userId: string
}

type LinkConstructorProps = Omit<
  LinkProps,
  'id' | 'clicksCount' | 'createdAt' | 'updatedAt'
>

export class Link {
  private props: LinkProps

  constructor({ shortUrl, longUrl, userId }: LinkConstructorProps) {
    if (!shortUrl) {
      throw new Error('Short URL is required.')
    }

    if (!longUrl) {
      throw new Error('Long URL is required.')
    }

    if (!userId) {
      throw new Error('User Id is required.')
    }

    this.props = {
      id: randomUUID(),
      shortUrl,
      longUrl,
      clicksCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
    }
  }

  get id() {
    return this.props.id
  }

  set id(id: string) {
    this.props.id = id
  }

  get shortUrl() {
    return this.props.shortUrl
  }

  set shortUrl(shortUrl: string) {
    this.props.shortUrl = shortUrl
  }

  get longUrl() {
    return this.props.longUrl
  }

  set longUrl(longUrl: string) {
    this.props.longUrl = longUrl
  }

  get clicksCount() {
    return this.props.clicksCount
  }

  set clicksCount(clicksCount: number) {
    this.props.clicksCount = clicksCount
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

  get userId() {
    return this.props.userId
  }

  set userId(user: string) {
    this.props.userId = user
  }
}
