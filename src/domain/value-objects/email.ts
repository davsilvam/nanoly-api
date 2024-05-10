import { EmailBadFormattedError } from './errors/email-bad-formatted.error'

import { type Either, left, right } from '@/core/logic/either'

export class Email {
  protected constructor(private readonly email: string) { }

  get value(): string {
    return this.email
  }

  static validate(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return emailRegex.test(email)
  }

  static create(email: string): Either<EmailBadFormattedError, Email> {
    const isEmailBadFormatted = !this.validate(email)

    if (isEmailBadFormatted)
      return left(new EmailBadFormattedError(email))

    return right(new Email(email))
  }
}
