import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeShortenUrlUseCase } from '../../../use-cases/url/factories'

const options = {
  schema: {
    summary: 'Shorten a url',
    tags: ['url'],
    body: z.object({
      longUrl: z.string(),
      shortUrl: z.string(),
      userId: z.string().uuid(),
    }),
    response: {
      201: z.object({
        url_id: z.string(),
      }),
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

export async function shortenUrl(app: FastifyInstance, path: string) {
  return app.withTypeProvider<ZodTypeProvider>().post(
    path,
    options,
    async (request, reply) => {
      const { longUrl, shortUrl, userId } = request.body

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
    },
  )
}
