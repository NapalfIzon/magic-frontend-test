import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "next/typescript",
    "prettier"
  ),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

export default eslintConfig;
