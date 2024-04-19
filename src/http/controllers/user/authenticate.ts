import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeAuthenticateUseCase } from '../../../use-cases/user/factories'

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
    token: z.string(),
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

      const token = await reply.jwtSign({
        sign: {
          sub: result.value.id,
        },
      })

      const refreshToken = await reply.jwtSign({
        sign: {
          sub: result.value.id,
          expiresIn: '7d',
        },
      })

      return reply.setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      }).status(200).send({
        token,
      })
    },
  )
}
