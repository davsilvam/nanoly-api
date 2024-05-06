import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { deleteUrl } from '../controllers/urls/delete-url.controller'
import { fetchUserUrls } from '../controllers/urls/fetch-user-urls.controller'
import { findUrlById } from '../controllers/urls/find-url-by-id.controller'
import { getRedirectUrl } from '../controllers/urls/get-redirect-url.controller'
import { shortenUrl } from '../controllers/urls/shorten-url.controller'
import { verifyJWT } from '../middlewares/verify-jwt'
import { $errorsRef } from '../schemas/common.schema'
import { $ref } from '../schemas/urls.schema'

export async function urlsRoutes(app: FastifyInstance) {
  app.post('/urls', {
    schema: {
      summary: 'Shorten a url',
      tags: ['url'],
      body: $ref('shortenUrlRequestSchema'),
      response: {
        201: $ref('shortenUrlResponseSchema'),
        400: $errorsRef('errorResponseSchema'),
        404: $errorsRef('errorResponseSchema'),
      },
    },
    onRequest: [verifyJWT],
  }, shortenUrl)

  app.get('/urls/:shortUrl/redirect', {
    schema: {
      summary: 'Redirect to a url by short url',
      tags: ['url'],
      params: $ref('getRedirectUrlRequestSchema'),
      response: {
        302: $ref('getRedirectUrlResponseSchema'),
        400: $errorsRef('errorResponseSchema'),
        404: $errorsRef('errorResponseSchema'),
      },
    },
  }, getRedirectUrl)

  app.get('/urls/:id', {
    schema: {
      summary: 'Find a url by id',
      tags: ['url'],
      params: $ref('findUrlByIdRequestSchema'),
      response: {
        200: $ref('findUrlByIdResponseSchema'),
        400: $errorsRef('errorResponseSchema'),
        404: $errorsRef('errorResponseSchema'),
      },
    },
    onRequest: [verifyJWT],
  }, findUrlById)

  app.get('/users/profile/urls', {
    schema: {
      summary: 'Fetch user url\'s',
      tags: ['url', 'user'],
      querystring: $ref('fetchUserUrlsQueryParamsSchema'),
      response: {
        200: $ref('fetchUserUrlsResponseSchema'),
        400: $errorsRef('errorResponseSchema'),
        404: $errorsRef('errorResponseSchema'),
      },
    },
    onRequest: [verifyJWT],
  }, fetchUserUrls)

  app.delete('/urls/:id', {
    schema: {
      summary: 'Delete a url',
      tags: ['url'],
      params: $ref('deleteUrlRequestSchema'),
      response: {
        204: z.void(),
        400: $errorsRef('errorResponseSchema'),
        401: $errorsRef('errorResponseSchema'),
        404: $errorsRef('errorResponseSchema'),
      },
    },
    onRequest: [verifyJWT],
  }, deleteUrl)
}
