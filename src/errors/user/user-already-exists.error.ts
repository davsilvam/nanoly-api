interface UserAlreadyExistsErrorProps {
  message: string
  statusCode: number
}

export class UserAlreadyExistsError extends Error {
  private props: UserAlreadyExistsErrorProps

  constructor(
    message: string = 'User already exists.',
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
