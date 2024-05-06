import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJWT from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  withRefResolver,
} from 'fastify-zod'

import { env } from './infra/config/env'
import { errorHandler } from './interface/error-handler'
import { urlsRoutes } from './interface/http/routes/urls.routes'
import { usersRoutes } from './interface/http/routes/users.routes'
import { errorsSchema } from './interface/http/schemas/common.schema'
import { urlsSchemas } from './interface/http/schemas/urls.schema'
import { userSchemas } from './interface/http/schemas/users.schema'

function buildServer() {
  const app = fastify()

  app.register(fastifyCors, {
    origin: '*',
  })

  app.register(fastifyJWT, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    sign: {
      expiresIn: '10m',
    },
  })

  app.register(fastifyCookie)

  for (const schema of [...errorsSchema, ...userSchemas, ...urlsSchemas])
    app.addSchema(schema)

  app.register(fastifySwagger, withRefResolver({
    swagger: {
      consumes: ['application/json'],
      produces: ['application/json'],
      info: {
        title: 'nanoly-api',
        description:
          'Especificações da API para o back-end da aplicação nanoly, um encurtador de url\'s.',
        version: '1.0.0',
      },
    },
  }))

  app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
  })

  app.setErrorHandler(errorHandler)

  app.get('/ping', () => {
    return 'pong'
  })

  app.register(usersRoutes)
  app.register(urlsRoutes)

  return app
}

export const app = buildServer()
