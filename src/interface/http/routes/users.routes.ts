import type { FastifyInstance } from 'fastify'

import { authenticate } from '../controllers/users/authenticate.controller'
import { getProfile } from '../controllers/users/get-profile.controller'
import { register } from '../controllers/users/register.controller'
import { verifyJWT } from '../middlewares/verify-jwt'
import { $errorsRef } from '../schemas/common.schema'
import { $ref } from '../schemas/users.schema'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', {
    schema: {
      summary: 'Register a new user',
      tags: ['users'],
      body: $ref('registerRequestSchema'),
      response: {
        201: $ref('registerResponseSchema'),
        400: $errorsRef('zodErrorResponseSchema'),
        409: $errorsRef('errorResponseSchema'),
      },
    },
  }, register)

  app.post('/sessions', {
    schema: {
      summary: 'Authenticate a user',
      tags: ['users'],
      body: $ref('authenticateRequestSchema'),
      response: {
        200: $ref('authenticateResponseSchema'),
        400: $errorsRef('zodErrorResponseSchema'),
        401: $errorsRef('errorResponseSchema'),
      },
    },
  }, authenticate)

  app
    .get('/users/profile', {
      schema: {
        summary: 'Get user profile',
        tags: ['users'],
        response: {
          200: $ref('getProfileResponseSchema'),
          404: $errorsRef('errorResponseSchema'),
        },
      },
    }, getProfile)
}
