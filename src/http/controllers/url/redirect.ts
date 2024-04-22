import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeFindUrlByShortUrlUseCase } from '../../../use-cases/url/factories'

const options = {
  schema: {
    summary: 'Redirect to a url by short url',
    tags: ['url'],
    params: z.object({
      shortUrl: z.string(),
    }),
    response: {
      200: z.object({
        redirect_url: z.string().url(),
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

export async function redirect(app: FastifyInstance) {
  return app.withTypeProvider<ZodTypeProvider>().get(
    '/urls/redirect/:shortUrl',
    options,
    async (request, reply) => {
      const { shortUrl } = request.params

      const findUrlByShortUrlUseCase = makeFindUrlByShortUrlUseCase()

      const result = await findUrlByShortUrlUseCase.execute({
        shortUrl,
      })

      if (result.isLeft()) {
        const error = result.value
        return reply.status(error.statusCode).send({
          message: error.message,
        })
      }

      reply.status(200).send({
        redirect_url: result.value,
      })
    },
  )
}
