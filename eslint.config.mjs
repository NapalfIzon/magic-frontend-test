import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "next/typescript"
  ),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "prettier/prettier": "error",
    },
  },
];

export default eslintConfig;
