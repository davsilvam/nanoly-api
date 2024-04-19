import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

const refreshOptionsSwaggerInfo = {
  summary: 'Refresh a user token',
  tags: ['user'],
}

const refreshOptionsRequest = {
  user: z.object({
    sub: z.string(),
  }),
}

const refreshOptionsResponse = {
  200: {
    token: z.string(),
  },
}

const refreshOptions = {
  schema: {
    ...refreshOptionsSwaggerInfo,
    ...refreshOptionsRequest,
    response: refreshOptionsResponse,
  },
}

export async function refresh(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/token/refresh',
    refreshOptions,
    async (request, reply) => {
      await request.jwtVerify({ onlyCookie: true })

      const token = await reply.jwtSign(
        {
          sign: {
            sub: request.user.sub,
          },
        },
      )

      const refreshToken = await reply.jwtSign(
        {
          sign: {
            sub: request.user.sub,
            expiresIn: '7d',
          },
        },
      )

      return reply
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          sameSite: true,
          httpOnly: true,
        })
        .status(200)
        .send({
          token,
        })
    },
  )
}
