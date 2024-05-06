import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeAuthenticateUseCase } from '../../../factories/users'
import type { AuthenticateRequestSchema } from '../../schemas/users.schema'

export async function authenticate(request: FastifyRequest<{
  Body: AuthenticateRequestSchema
}>, reply: FastifyReply) {
  const { email, password } = request.body

  const authenticateUseCase = makeAuthenticateUseCase()

  const result = await authenticateUseCase.execute({ email, password })

  if (result.isLeft()) {
    const error = result.value
    return reply.status(error.statusCode).send({ message: error.message })
  }

  const token = await reply.jwtSign({
    sign: {
      sub: result.value.id,
    },
  })

  const refreshToken = await reply.jwtSign({
    sign: {
      sub: result.value.id,
      expiresIn: '7d',
    },
  })

  return reply.setCookie('refreshToken', refreshToken, {
    path: '/',
    secure: true,
    sameSite: true,
    httpOnly: true,
  }).status(200).send({
    token,
  })
}
