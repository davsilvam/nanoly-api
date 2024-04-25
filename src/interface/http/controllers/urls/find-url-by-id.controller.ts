import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeFindUrlByIdUseCase } from '../../../../application/use-cases/url/factories'
import { verifyJWT } from '../../middlewares/verify-jwt'

const options = {
  schema: {
    summary: 'Find a url by id',
    tags: ['url'],
    params: z.object({
      id: z.string().uuid(),
    }),
    response: {
      200: z.object({
        id: z.string().uuid(),
        long_url: z.string().url(),
        short_url: z.string(),
        clicks_count: z.number(),
        created_at: z.date(),
        updated_at: z.date(),
        user_id: z.string().uuid(),
      }),
      400: z.object({
        message: z.string(),
        errors: z.record(z.array(z.string())).optional(),
      }),
      401: z.object({
        message: z.string(),
      }),
      404: z.object({
        message: z.string(),
      }),
    },
  },
  onRequest: [verifyJWT],
}

export async function findUrlById(app: FastifyInstance, path: string) {
  return app.withTypeProvider<ZodTypeProvider>().get(
    path,
    options,
    async (request, reply) => {
      const { id } = request.params as { id: string }

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
    },
  )
}
