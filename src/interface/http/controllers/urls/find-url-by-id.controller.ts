import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeFindUrlByIdUseCase } from '../../../factories/urls'
import type { FindUrlByIdRequestSchema } from '../../schemas/urls.schema'

export async function findUrlById(request: FastifyRequest<{
  Params: FindUrlByIdRequestSchema
}>, reply: FastifyReply) {
  const { id } = request.params

  const findUrlByIdUseCase = makeFindUrlByIdUseCase()

  const result = await findUrlByIdUseCase.execute({
    id,
    userId: request.user.sign.sub,
  })

  if (result.isLeft()) {
    const error = result.value
    return reply.status(error.statusCode).send({
      message: error.message,
    })
  }

  reply.status(200).send({
    id: result.value.id,
    long_url: result.value.longUrl,
    short_url: result.value.shortUrl,
    clicks_count: result.value.clicksCount,
    created_at: result.value.createdAt,
    updated_at: result.value.updatedAt,
    user_id: result.value.userId,
  })
}
