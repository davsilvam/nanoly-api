import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const shortenUrlRequestSchema = z.object({
  long_url: z.string({
    required_error: 'Long url is required.',
  })
    .url('Invalid long url.'),
  short_url: z.string({
    required_error: 'Short url is required.',
  })
    .min(4, 'Short url must have at least 4 characters.')
    .max(16, 'Short url must have at most 16 characters.'),
  user_id: z.string({
    required_error: 'User id is required.',
  })
    .uuid('Invalid user id.'),
})

const shortenUrlResponseSchema = z.object({
  url_id: z.string(),
})

export type ShortenUrlRequestSchema = z.infer<typeof shortenUrlRequestSchema>
export type ShortenUrlResponseSchema = z.infer<typeof shortenUrlResponseSchema>

const fetchUsersUrlsResponseSchema = z.object({
  id: z.string().uuid(),
  long_url: z.string().url(),
  short_url: z.string(),
  clicks_count: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
  user_id: z.string().uuid(),
}).array()

export type FetchUsersUrlsResponseSchema = z.infer<typeof fetchUsersUrlsResponseSchema>

const getRedirectUrlRequestSchema = z.object({
  shortUrl: z.string({
    message: 'Short url is required.',
  }),
})

const getRedirectUrlResponseSchema = z.object({
  redirect_url: z.string().url(),
})

export type GetRedirectUrlRequestSchema = z.infer<typeof getRedirectUrlRequestSchema>
export type GetRedirectUrlResponseSchema = z.infer<typeof getRedirectUrlResponseSchema>

const findUrlByIdRequestSchema = z.object({
  id: z.string({
    required_error: 'Url id is required.',
  })
    .uuid('Invalid url id.'),
})

const findUrlByIdResponseSchema = z.object({
  id: z.string().uuid(),
  long_url: z.string().url(),
  short_url: z.string(),
  clicks_count: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
  user_id: z.string().uuid(),
})

export type FindUrlByIdRequestSchema = z.infer<typeof findUrlByIdRequestSchema>
export type FindUrlByIdResponseSchema = z.infer<typeof findUrlByIdResponseSchema>

const deleteUrlRequestSchema = z.object({
  id: z.string({
    required_error: 'Url id is required.',
  })
    .uuid('Invalid url id.'),
})

export type DeleteUrlRequestSchema = z.infer<typeof deleteUrlRequestSchema>

export const { schemas: urlsSchemas, $ref } = buildJsonSchemas({
  shortenUrlRequestSchema,
  shortenUrlResponseSchema,
  fetchUsersUrlsResponseSchema,
  getRedirectUrlResponseSchema,
  getRedirectUrlRequestSchema,
  findUrlByIdRequestSchema,
  findUrlByIdResponseSchema,
  deleteUrlRequestSchema,
}, {
  $id: 'urls',
})
