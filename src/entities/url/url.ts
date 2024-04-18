import { randomUUID } from 'node:crypto'

export interface UrlProps {
  id: string
  longUrl: string
  shortUrl: string
  clicksCount: number
  createdAt: Date
  updatedAt: Date
  userId: string
}

type UrlConstructorProps = Omit<
  UrlProps,
  'id' | 'clicksCount' | 'createdAt' | 'updatedAt'
>

export class Url {
  private props: UrlProps

  get id() {
    return this.props.id
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

  get updatedAt() {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt
  }

  get userId() {
    return this.props.userId
  }

  constructor({ shortUrl, longUrl, userId }: UrlConstructorProps) {
    if (!shortUrl)
      throw new Error('Short Url is required.')

    if (!longUrl)
      throw new Error('Long Url is required.')

    if (!userId)
      throw new Error('User Id is required.')

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

  public toObject(): UrlProps {
    return this.props
  }
}
