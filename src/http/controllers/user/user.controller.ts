import type { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'

export async function userController(app: FastifyInstance) {
  await register(app)
  await authenticate(app)
  await refresh(app)
  await profile(app)
}
