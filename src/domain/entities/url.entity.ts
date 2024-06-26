import { randomUUID } from 'node:crypto'

import { Entity } from '@/core/domain/entity'
import type { Replace } from '@/core/logic/replace'

export interface UrlProps {
  longUrl: string
  shortUrl: string
  clicksCount: number
  createdAt: Date
  updatedAt: Date
  userId: string
}

export class Url extends Entity<UrlProps> {
  get shortUrl() {
    return this.props.shortUrl
  }

  get longUrl() {
    return this.props.longUrl
  }

  get clicksCount() {
    return this.props.clicksCount
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

  static create(
    props: Replace<
      UrlProps,
      {
        clicksCount?: number
        createdAt?: Date
        updatedAt?: Date
      }
    >,
    id?: string,
  ) {
    const url = new Url(
      {
        ...props,
        clicksCount: props.clicksCount ?? 0,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )

    return url
  }

  public updateShortUrl(shortUrl: string) {
    this.props.shortUrl = shortUrl
    this.props.updatedAt = new Date()
  }

  public updateLongUrl(longUrl: string) {
    this.props.longUrl = longUrl
    this.props.updatedAt = new Date()
  }

  public incrementClicksCount() {
    this.props.clicksCount += 1
    this.props.updatedAt = new Date()
  }
}
