interface URLNotFoundErrorProps {
  message: string
  statusCode: number
}

export class URLNotFoundError extends Error {
  private props: URLNotFoundErrorProps

  constructor(
    message: string = 'URL not found.',
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
