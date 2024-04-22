import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeFetchUserUrlsUseCase } from '../../../use-cases/url/factories'

const options = {
  schema: {
    summary: 'Fetch user url\'s',
    tags: ['url', 'user'],
    response: {
      200: z.object({
        id: z.string().uuid(),
        long_url: z.string().url(),
        short_url: z.string().url(),
        clicks_count: z.number(),
        created_at: z.date(),
        updated_at: z.date(),
        user_id: z.string().uuid(),
      }).array(),
      400: z.object({
        message: z.string(),
        errors: z.record(z.array(z.string())).optional(),
      }),
      404: z.object({
        message: z.string(),
      }),
    },
  },
}

export async function fetch(app: FastifyInstance) {
  return app.withTypeProvider<ZodTypeProvider>().get(
    '/me/urls',
    options,
    async (request, reply) => {
      const user = request.user

      const fetchUserUrlsUseCase = makeFetchUserUrlsUseCase()

      const result = await fetchUserUrlsUseCase.execute({
        userId: user.sign.sub,
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
    },
  )
}
