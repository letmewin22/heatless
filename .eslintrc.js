module.exports = {
  parser: '@typescript-eslint/parser', // uses babel-eslint transforms
  settings: {
    react: {
      version: 'detect', // detect react version
    },
  },
  env: {
    node: true, // defines things like process.env when generating through node
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'no-anonymous-exports-page-templates': 'off',
    'limited-exports-page-templates': 'off',
    'arrow-parens': [1, 'as-needed', { requireForBlockBody: false }],
    'comma-dangle': 'off',
    'no-console': 'off',
    'unicorn/prefer-text-content': 'off',
    'no-new': 'off',
    'no-unused-vars': 'warn',
    'prefer-const': 'warn',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'prettier/prettier': [
      'off',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
