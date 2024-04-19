import type { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { register } from './register'

export async function userController(app: FastifyInstance) {
  await register(app)
  await authenticate(app)
}
