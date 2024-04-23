import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

const options = {
  schema: {
    summary: 'Refresh a user token',
    tags: ['user'],
    response: {
      200: z.object({
        token: z.string(),
      }),
    },
  },
}

export async function refreshToken(app: FastifyInstance, path: string) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    path,
    options,
    async (request, reply) => {
      await request.jwtVerify({ onlyCookie: true })

      const token = await reply.jwtSign(
        {
          sign: {
            sub: request.user.sign.sub,
          },
        },
      )

      const refreshToken = await reply.jwtSign(
        {
          sign: {
            sub: request.user.sign.sub,
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
