module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'airbnb-base'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    'comma-dangle': 0
  }
};
