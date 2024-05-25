import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchUserUrlsUseCase } from '../../../factories/urls'
import type { FetchUsersUrlsQueryParamsSchema } from '../../schemas/urls.schema'

export async function fetchUserUrls(request: FastifyRequest<{
  Querystring: FetchUsersUrlsQueryParamsSchema
}>, reply: FastifyReply) {
  const { page } = request.query

  if (page < 1) {
    return reply.status(400).send({
      message: 'Invalid page.',
    })
  }

  const fetchUserUrlsUseCase = makeFetchUserUrlsUseCase()

  const result = await fetchUserUrlsUseCase.execute({
    userId: request.user.sign.sub,
    page,
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
