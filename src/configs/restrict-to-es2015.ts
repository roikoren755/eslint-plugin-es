/**
 * DON'T EDIT THIS FILE.
 * This file was generated by 'scripts/update-src-configs.ts' script.
 */
import type { TSESLint } from '@typescript-eslint/utils';

const config: TSESLint.Linter.Config = {
  extends: [
    require.resolve('./no-new-in-es2021'),
    require.resolve('./no-new-in-es2020'),
    require.resolve('./no-new-in-es2019'),
    require.resolve('./no-new-in-es2018'),
    require.resolve('./no-new-in-es2017'),
    require.resolve('./no-new-in-es2016'),
  ],
};

export default config;
