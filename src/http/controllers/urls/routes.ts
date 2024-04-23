import type { FastifyInstance } from 'fastify'

import { deleteUrl } from './delete-url.controller'
import { fetchUserUrls } from './fetch-user-urls.controller'
import { findUrlById } from './find-url-by-id.controller'
import { getRedirectUrl } from './get-redirect-url.controller'
import { shortenUrl } from './shorten-url.controller'

export async function urlsRoutes(app: FastifyInstance) {
  await shortenUrl(app, '/urls')

  await getRedirectUrl(app, '/urls/:shortUrl/redirect')
  await findUrlById(app, '/urls/:id')
  await fetchUserUrls(app, '/users/profile/urls')

  await deleteUrl(app, '/urls/:id')
}
