import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    settings: {
      react: {
        version: "detect" // Automatically detect the version of React
      }
    },
    rules: {
      "react/react-in-jsx-scope": 'off', // React is not required in scope
      "react/prop-types": 'off',  // Add this line to disable prop-types validation
      "indent": ["error", 2],  // 2 spaces for indentation
      "semi": ["error", "always"],  // Always put semicolons at the end of statements
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "variable",
          "format": ["camelCase", "PascalCase"],  // Variables should be in camelCase or PascalCase
        },
      ]
    }
  }
];