import type { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate.controller'
import { getProfile } from './get-profile.controller'
import { refreshToken } from './refresh-token.controller'
import { register } from './register.controller'

export async function usersRoutes(app: FastifyInstance) {
  await register(app, '/users')
  await authenticate(app, '/sessions')
  await refreshToken(app, '/token/refresh')
  await getProfile(app, '/users/profile')
}
