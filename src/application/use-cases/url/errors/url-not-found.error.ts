interface UrlNotFoundErrorProps {
  message: string
  statusCode: number
}

export class UrlNotFoundError extends Error {
  private props: UrlNotFoundErrorProps

  constructor(
    message: string = 'Url not found.',
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
