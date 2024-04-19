import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeRegisterUseCase } from '../../../use-cases/user/factories'

const options = {
  schema: {
    summary: 'Register a new user',
    tags: ['user'],
    body: z.object({
      name: z.string().min(3),
      email: z.string().email().min(5),
      password: z.string().min(6),
    }),
    response: {
      201: z.object({
        user_id: z.string(),
      }),
      400: z.object({
        message: z.string(),
        errors: z.record(z.array(z.string())).optional(),
      }),
      409: z.object({
        message: z.string(),
      }),
    },
  },
}

export async function register(app: FastifyInstance) {
  return app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    options,
    async (request, reply) => {
      const { name, email, password } = request.body

      const registerUseCase = makeRegisterUseCase()

      const result = await registerUseCase.execute({ name, email, password })

      if (result.isLeft()) {
        const error = result.value
        return reply.status(error.statusCode).send({ message: error.message })
      }

      return reply.status(201).send({ user_id: result.value })
    },
  )
}
