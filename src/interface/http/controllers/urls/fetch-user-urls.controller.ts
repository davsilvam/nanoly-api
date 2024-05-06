import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchUserUrlsUseCase } from '../../../factories/urls'

export async function fetchUserUrls(request: FastifyRequest, reply: FastifyReply) {
  const fetchUserUrlsUseCase = makeFetchUserUrlsUseCase()

  const result = await fetchUserUrlsUseCase.execute({
    userId: request.user.sign.sub,
  })

  if (result.isLeft()) {
    const error = result.value
    return reply.status(error.statusCode).send({
      message: error.message,
    })
  }

  reply.status(200).send(result.value.map(url => ({
    id: url.id,
    long_url: url.longUrl,
    short_url: url.shortUrl,
    clicks_count: url.clicksCount,
    created_at: url.createdAt,
    updated_at: url.updatedAt,
    user_id: url.userId,
  })))
}
