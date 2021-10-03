module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:node/recommended',
    'standard',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // quotes: ['error', 'single'],
    // 'no-console': 'off',
    'no-inner-declarations': 'off',
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    semi: [1, 'never'],
    'comma-dangle': ['error', 'only-multiline'],
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' },
    ],
    indent: [
      0,
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true,
        offsetTernaryExpressions: true,
        CallExpression: { arguments: 1 },
        FunctionExpression: { arguments: 1 },
        FunctionDeclaration: { arguments: 1 },
        ObjectExpression: { arguments: 1 },
        MemberExpression: { arguments: 1 },
        VariableDeclarator: { arguments: 1 },
      },
    ],
    'multiline-ternary': ['error', 'always-multiline'],
    'react-hooks/rules-of-hooks': 'error', // Проверяем правила хуков
    'react-hooks/exhaustive-deps': 'warn', // Проверяем зависимости эффекта
    'node/exports-style': ['error', 'module.exports'],
    'node/file-extension-in-import': ['error', 'always'],
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],
    'node/prefer-promises/dns': 'error',
    'node/prefer-promises/fs': 'error',
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        version: '>=8.0.0',
        ignores: ['dynamicImport'],
      },
    ],
  },
  reportUnusedDisableDirectives: true,
}
