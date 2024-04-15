interface ShortUrlAlreadyExistsErrorProps {
  message: string
  statusCode: number
}

export class ShortUrlAlreadyExistsError extends Error {
  private props: ShortUrlAlreadyExistsErrorProps

  constructor(
    message: string = 'Short url already exists.',
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
