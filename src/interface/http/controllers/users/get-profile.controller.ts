import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileUseCase } from '../../../factories/users'

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const result = await getUserProfileUseCase.execute({
    id: request.user.sign.sub,
  })

  if (result.isLeft()) {
    const error = result.value
    return reply.status(error.statusCode).send({ message: error.message })
  }

  return reply.status(200).send({
    id: result.value.id,
    name: result.value.name,
    email: result.value.email,
    created_at: result.value.createdAt,
    updated_at: result.value.updatedAt,
  })
}
