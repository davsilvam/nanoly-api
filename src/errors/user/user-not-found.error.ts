interface UserNotFoundErrorProps {
  message: string
  statusCode: number
}

export class UserNotFoundError extends Error {
  private props: UserNotFoundErrorProps

  constructor(
    message: string = 'User not found.',
    statusCode: number = 404,
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
