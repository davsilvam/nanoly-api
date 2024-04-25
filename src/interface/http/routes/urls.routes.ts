import type { FastifyInstance } from 'fastify'

import { deleteUrl } from '../controllers/urls/delete-url.controller'
import { fetchUserUrls } from '../controllers/urls/fetch-user-urls.controller'
import { findUrlById } from '../controllers/urls/find-url-by-id.controller'
import { getRedirectUrl } from '../controllers/urls/get-redirect-url.controller'
import { shortenUrl } from '../controllers/urls/shorten-url.controller'

export async function urlsRoutes(app: FastifyInstance) {
  await shortenUrl(app, '/urls')

  await getRedirectUrl(app, '/urls/:shortUrl/redirect')
  await findUrlById(app, '/urls/:id')
  await fetchUserUrls(app, '/users/profile/urls')

  await deleteUrl(app, '/urls/:id')
}
