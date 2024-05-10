import { ShortUrlBadFormattedError } from './errors/short-url-bad-formatted.error'

import { type Either, left, right } from '@/core/logic/either'

export class ShortUrl {
  protected constructor(private readonly shortUrl: string) { }

  get value(): string {
    return this.shortUrl
  }

  static validate(email: string): boolean {
    const shortUrlRegex = /^[a-zA-Z0-9]{4,16}$/

    return shortUrlRegex.test(email)
  }

  static create(shortUrl: string): Either<ShortUrlBadFormattedError, ShortUrl> {
    const isShortUrlBadFormatted = !this.validate(shortUrl)

    if (isShortUrlBadFormatted)
      return left(new ShortUrlBadFormattedError(shortUrl))

    return right(new ShortUrl(shortUrl))
  }
}
