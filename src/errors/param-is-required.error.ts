interface ParamIsRequiredErrorProps {
  message: string
  statusCode: number
}

export class ParamIsRequiredError extends Error {
  private props: ParamIsRequiredErrorProps

  constructor(
    message: string = 'Parameter is required.',
    statusCode: number = 422,
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
