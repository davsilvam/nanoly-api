import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeDeleteUrlUseCase } from '../../../factories/urls'
import type { DeleteUrlRequestSchema } from '../../schemas/urls.schema'

export async function deleteUrl(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as DeleteUrlRequestSchema

  const deleteUrlUseCase = makeDeleteUrlUseCase()

  const result = await deleteUrlUseCase.execute({
    id,
    userId: request.user.sign.sub,
  })

  if (result.isLeft()) {
    const error = result.value
    return reply.status(error.statusCode).send({
      message: error.message,
    })
  }

  reply.status(204).send()
}
