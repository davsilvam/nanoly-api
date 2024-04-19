import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeGetUserProfileUseCase } from '../../../use-cases/user/factories'
import { verifyJWT } from '../../middlewares/verify-jwt'

const options = {
  schema: {
    summary: 'Get user profile',
    tags: ['user'],
    request: {
      200: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        created_at: z.date(),
        updated_at: z.date(),
      }),
      404: z.object({
        message: z.string(),
      }),
    },
  },
  onRequest: [verifyJWT],
}

export async function profile(app: FastifyInstance) {
  return app.withTypeProvider<ZodTypeProvider>().get(
    '/me',
    options,
    async (request, reply) => {
      const getUserProfileUseCase = makeGetUserProfileUseCase()

      const result = await getUserProfileUseCase.execute({
        id: request.user.sign.sub,
      })

      if (result.isLeft())
        return reply.status(404).send({ message: result.value.message })

      reply.status(200).send({
        id: result.value.id,
        name: result.value.name,
        email: result.value.email,
        created_at: result.value.createdAt,
        updated_at: result.value.updatedAt,
      })
    },
  )
}
