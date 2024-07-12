const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
    {files: ["**/*.{js,mjs,cjs,ts}"]},
    {languageOptions: { globals: globals.browser }},
    pluginJs.configs.recommended,
    eslintPluginPrettierRecommended, 
    ...tseslint.configs.recommended,
];

