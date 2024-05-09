interface EmailBadFormattedErrorProps {
  message: string
  statusCode: number
}

export class EmailBadFormattedError extends Error {
  private props: EmailBadFormattedErrorProps

  constructor(
    message: string = 'Email bad formatted.',
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
