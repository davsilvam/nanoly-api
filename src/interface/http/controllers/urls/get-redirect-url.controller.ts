import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetRedirectUrlUseCase } from '../../../factories/urls'
import type { GetRedirectUrlRequestSchema } from '../../schemas/urls.schema'

export async function getRedirectUrl(request: FastifyRequest, reply: FastifyReply) {
  const { shortUrl } = request.params as GetRedirectUrlRequestSchema

  const getRedirectUrlUseCase = makeGetRedirectUrlUseCase()

  const result = await getRedirectUrlUseCase.execute({
    shortUrl,
  })

  if (result.isLeft()) {
    const error = result.value
    return reply.status(error.statusCode).send({
      message: error.message,
    })
  }

  reply.status(302).send({
    redirect_url: result.value,
  })
}
