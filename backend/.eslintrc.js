module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:prettier/recommended'
  ],

  plugins: ['prettier'],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    use: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
      'prettier/prettier': 'error',

  }
}
