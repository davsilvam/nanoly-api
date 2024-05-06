import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

export const errorResponseSchema = z.object({
  message: z.string(),
})

export const zodErrorResponseSchema = z.object({
  ...errorResponseSchema.shape,
  errors: z.record(z.array(z.string())).optional(),
})

export const { schemas: errorsSchema, $ref: $errorsRef } = buildJsonSchemas({
  errorResponseSchema,
  zodErrorResponseSchema,
}, {
  $id: 'errors',
})
