interface ShortURLAlreadyExistsErrorProps {
  message: string
  statusCode: number
}

export class ShortURLAlreadyExistsError extends Error {
  private props: ShortURLAlreadyExistsErrorProps

  constructor(
    message: string = 'Short URL already exists.',
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
