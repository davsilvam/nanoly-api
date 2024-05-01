import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  rules: {
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
})
