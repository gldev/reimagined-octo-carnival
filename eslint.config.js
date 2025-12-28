import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: ["eslint.config.js", "node_modules/**", "dist/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        MutationObserver: "readonly",
        console: "readonly",
        requestAnimationFrame: "readonly",
        queueMicrotask: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-var": "error",
      "prefer-const": "warn",
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
    },
  },
];
