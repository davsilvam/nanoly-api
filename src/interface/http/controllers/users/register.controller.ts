import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeRegisterUseCase } from '../../../factories/users'
import type { RegisterRequestSchema } from '../../schemas/users.schema'

export async function register(request: FastifyRequest<{
  Body: RegisterRequestSchema
}>, reply: FastifyReply) {
  const { name, email, password } = request.body

  const registerUseCase = makeRegisterUseCase()

  const result = await registerUseCase.execute({ name, email, password })

  if (result.isLeft()) {
    const error = result.value
    return reply.status(error.statusCode).send({ message: error.message })
  }

  return reply.status(201).send({ user_id: result.value })
}
