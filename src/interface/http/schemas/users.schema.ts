import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const authenticateRequestSchema = z.object({
  email: z.string({
    required_error: 'Email is required.',
    invalid_type_error: 'Email must be a string.',
  })
    .email('Invalid email.'),
  password: z.string({
    required_error: 'Password is required.',
    invalid_type_error: 'Password must be a string.',
  })
    .min(6, 'Password must have at least 6 characters.'),
})

const authenticateResponseSchema = z.object({
  token: z.string(),
})

export type AuthenticateRequestSchema = z.infer<typeof authenticateRequestSchema>
export type AuthenticateResponseSchema = z.infer<typeof authenticateResponseSchema>

const registerRequestSchema = z.object({
  ...authenticateRequestSchema.shape,
  name: z.string({
    required_error: 'Name is required.',
    invalid_type_error: 'Name must be a string.',
  })
    .min(3, 'Name must have at least 3 characters.'),
})

const registerResponseSchema = z.object({
  user_id: z.string().uuid(),
})

export type RegisterRequestSchema = z.infer<typeof registerRequestSchema>
export type RegisterResponseSchema = z.infer<typeof registerResponseSchema>

const getProfileResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type GetProfileResponseSchema = z.infer<typeof getProfileResponseSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  authenticateRequestSchema,
  authenticateResponseSchema,
  registerRequestSchema,
  registerResponseSchema,
  getProfileResponseSchema,
}, {
  $id: 'users',
})
