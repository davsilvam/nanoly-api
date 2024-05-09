import { PrismaClient } from '@prisma/client'

import { env } from '@/config/env'

export const prisma = new PrismaClient({
  errorFormat: 'pretty',
  log: env.NODE_ENV === 'dev' ? ['query', 'warn', 'error'] : [],
})
