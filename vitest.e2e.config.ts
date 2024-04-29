import { defineConfig, mergeConfig } from 'vitest/config'

import vitestConfig from './vitest.config'

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      include: ['**/*.e2e-{test,spec}.ts'],
      environmentMatchGlobs: [['src/**', 'prisma/vitest-environment-prisma']],
    },
  }),
)