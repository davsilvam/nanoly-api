import type { FastifyInstance } from 'fastify'

import { authenticate } from '../controllers/users/authenticate.controller'
import { getProfile } from '../controllers/users/get-profile.controller'
import { refreshToken } from '../controllers/users/refresh-token.controller'
import { register } from '../controllers/users/register.controller'

export async function usersRoutes(app: FastifyInstance) {
  await register(app, '/users')
  await authenticate(app, '/sessions')
  await refreshToken(app, '/token/refresh')
  await getProfile(app, '/users/profile')
}
