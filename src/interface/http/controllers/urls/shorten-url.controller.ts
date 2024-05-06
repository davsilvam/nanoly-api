import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeShortenUrlUseCase } from '../../../factories/urls'
import type { ShortenUrlRequestSchema } from '../../schemas/urls.schema'

export async function shortenUrl(request: FastifyRequest, reply: FastifyReply) {
  const { long_url: longUrl, short_url: shortUrl, user_id: userId } = request.body as ShortenUrlRequestSchema

  const shortenUrlUseCase = makeShortenUrlUseCase()

  const result = await shortenUrlUseCase.execute({
    shortUrl,
    longUrl,
    userId,
  })

  if (result.isLeft()) {
    const error = result.value
    return reply.status(error.statusCode).send({
      message: error.message,
    })
  }

  reply.status(201).send({ url_id: result.value })
}
