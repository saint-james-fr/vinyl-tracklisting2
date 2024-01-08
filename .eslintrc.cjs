module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "complexity"],
  rules: {
    complexity: ["error", 10],
  },
  ignorePatterns: [
    "/app/test/**/*",
    "/node_modules/**/*",
    "jest.*",
    ".eslintrc.*",
    "/deploy/**/*",
    "vite.config.ts",
    "postcss.config.cjs",
  ],
};
