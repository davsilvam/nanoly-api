// import type { FastifyInstance } from 'fastify'
// import type { ZodTypeProvider } from 'fastify-type-provider-zod'
// import { z } from 'zod'

// const registerOptionsSwaggerInfo = {
//   summary: 'Register a new user',
//   tags: ['user'],
// }

// const registerOptionsRequest = {
//   body: z.object({
//     name: z.string().min(3, 'Name must have at least 3 characters.'),
//     email: z.string().email('Invalid email.').min(5, 'Email must have at least 5 characters.'),
//     password: z.string().min(6, 'Password must have at least 6 characters.'),
//   }),
// }

// const registerOptionsResponse = {
//   201: z.object({
//     id: z.number(),
//   }),
//   409: z.object({
//     message: z.string(),
//   }),
// }

// const registerOptions = {
//   schema: {
//     ...registerOptionsSwaggerInfo,
//     ...registerOptionsRequest,
//     response: registerOptionsResponse,
//   },
// }

// export async function register(app: FastifyInstance) {
//   app.withTypeProvider<ZodTypeProvider>().post(
//     '/user/register',
//     registerOptions,
//     async (request, reply) => {

//     },
//   )
// }
