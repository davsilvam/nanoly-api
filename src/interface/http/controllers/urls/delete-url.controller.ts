import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeDeleteUrlUseCase } from '../../../factories/urls'
import { verifyJWT } from '../../middlewares/verify-jwt'

const options = {
  schema: {
    summary: 'Delete a url',
    tags: ['url'],
    params: z.object({
      id: z.string().uuid(),
    }),
    response: {
      204: z.void(),
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

export async function deleteUrl(app: FastifyInstance, path: string) {
  return app.withTypeProvider<ZodTypeProvider>().delete(
    path,
    options,
    async (request, reply) => {
      const { id } = request.params as { id: string }

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
    },
  )
}