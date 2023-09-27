module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
  globals: {
    process: "readonly",
    it: "readonly",
    expect: "readonly",
    describe: "readonly",
  },
};
