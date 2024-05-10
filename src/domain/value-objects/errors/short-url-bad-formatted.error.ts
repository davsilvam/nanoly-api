interface ShortUrlBadFormattedErrorProps {
  message: string
  statusCode: number
}

export class ShortUrlBadFormattedError extends Error {
  private props: ShortUrlBadFormattedErrorProps

  constructor(
    message: string = 'Short Url bad formatted.',
    statusCode: number = 400,
  ) {
    super(message)

    this.props = {
      message,
      statusCode,
    }
  }

  get message(): string {
    return this.props.message
  }

  get statusCode(): number {
    return this.props.statusCode
  }
}
