import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts"], // Apply to TypeScript files
    ignores: ["node_modules/", "dist/"], // Ignore these directories
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "prettier/prettier": [
        "error",
        {
          trailingComma: "all", // ✅ Add this line
          semi: true,
          singleQuote: false,
          arrowParens: "always",
          // add other Prettier rules here if needed
        },
      ],
    },
    settings: {
      // Add any settings here if needed
    },
  },
  {
    // Apply Prettier config to all files
    files: ["**/*.{ts,js}"],
    ...prettierConfig,
  },
];
