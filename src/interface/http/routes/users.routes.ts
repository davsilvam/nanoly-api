import type { FastifyInstance } from 'fastify'

import { authenticate } from '../controllers/users/authenticate.controller'
import { getProfile } from '../controllers/users/get-profile.controller'
import { register } from '../controllers/users/register.controller'

export async function usersRoutes(app: FastifyInstance) {
  await register(app, '/users')
  await authenticate(app, '/sessions')
  await getProfile(app, '/users/profile')
}
