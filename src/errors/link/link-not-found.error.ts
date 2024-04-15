interface LinkNotFoundErrorProps {
  message: string
  statusCode: number
}

export class LinkNotFoundError extends Error {
  private props: LinkNotFoundErrorProps

  constructor(
    message: string = 'Link not found.',
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
