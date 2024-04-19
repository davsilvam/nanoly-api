import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeAuthenticateUseCase } from '../../use-cases/user/factories/make-authenticate-use-case'

const authenticateOptionsSwaggerInfo = {
  summary: 'Authenticate a user',
  tags: ['user'],
}

const authenticateOptionsRequest = {
  body: z.object({
    email: z.string().email('Invalid email.').min(5, 'Email must have at least 5 characters.'),
    password: z.string().min(6, 'Password must have at least 6 characters.'),
  }),
}

const authenticateOptionsResponse = {
  200: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
  }),
  400: z.object({
    message: z.string(),
  }),
}

const authenticateOptions = {
  schema: {
    ...authenticateOptionsSwaggerInfo,
    ...authenticateOptionsRequest,
    response: authenticateOptionsResponse,
  },
}

export async function authenticate(app: FastifyInstance) {
  return app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    authenticateOptions,
    async (request, reply) => {
      const { email, password } = request.body

      const authenticateUseCase = makeAuthenticateUseCase()

      const result = await authenticateUseCase.execute({ email, password })

      if (result.isLeft()) {
        const error = result.value
        return reply.status(error.statusCode).send({ message: error.message })
      }

      return reply.status(200).send({
        id: result.value.id,
        name: result.value.name,
        email: result.value.email,
        created_at: result.value.createdAt,
        updated_at: result.value.updatedAt,
      })
    },
  )
}
