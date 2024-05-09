import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import type { Environment } from 'vitest'

import { env } from '../../src/config/env'
import { prisma } from '../../src/infra/database/prisma/prisma-client'

function generateDatabaseURL(schema: string) {
  if (!env.DATABASE_URL)
    throw new Error('Please provide a DATABASE_URL environment variable.')

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    // eslint-disable-next-line node/prefer-global/process
    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
