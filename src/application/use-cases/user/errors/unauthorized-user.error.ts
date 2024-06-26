interface UnauthorizedUserErrorProps {
  message: string
  statusCode: number
}

export class UnauthorizedUserError extends Error {
  private props: UnauthorizedUserErrorProps

  constructor(
    message: string = 'Unauthorized user.',
    statusCode: number = 401,
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
