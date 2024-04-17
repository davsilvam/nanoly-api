interface InvalidCredentialsErrorProps {
  message: string
  statusCode: number
}

export class InvalidCredentialsError extends Error {
  private props: InvalidCredentialsErrorProps

  constructor(
    message: string = 'Invalid credentials.',
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
