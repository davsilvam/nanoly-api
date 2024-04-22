import type { FastifyInstance } from 'fastify'

import { deleteUrl } from './delete'
import { fetch } from './fetch'
import { findById } from './find-by-id'
import { redirect } from './redirect'
import { shorten } from './shorten'

export async function urlController(app: FastifyInstance) {
  await shorten(app)
  await redirect(app)
  await findById(app)
  await fetch(app)
  await deleteUrl(app)
}
