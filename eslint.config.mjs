import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["node_modules/**", ".next/**", "coverage/**", "src/generated/**"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [...tseslint.configs.recommended],
    rules: {
      "no-eval": "error",
      "no-script-url": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);
