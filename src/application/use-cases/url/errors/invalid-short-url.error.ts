interface InvalidShortUrlErrorProps {
  message: string
  statusCode: number
}

export class InvalidShortUrlError extends Error {
  private props: InvalidShortUrlErrorProps

  constructor(
    message: string = 'Short Url must have between 4 and 16 characters.',
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
