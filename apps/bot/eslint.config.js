import tseslint from 'typescript-eslint';

//export default [
//  { files: ['**/*.{js,mjs,cjs,ts}'] },
//  { languageOptions: { globals: globals.browser } },
//  pluginJs.configs.recommended,
//  eslintPluginPrettierRecommended,
//  eslint.configs.recommended,
//  ...tseslint.configs.recommended,
//];

export default tseslint.config(
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
);
