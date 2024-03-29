/**
 * DON'T EDIT THIS FILE.
 * This file was generated by 'scripts/update-src-configs.ts' script.
 */
import type { TSESLint } from '@typescript-eslint/utils';

const config: TSESLint.Linter.Config = {
  plugins: ['es-roikoren'],
  rules: {
    'es-roikoren/no-async-functions': 'error',
    'es-roikoren/no-atomics': 'error',
    'es-roikoren/no-object-entries': 'error',
    'es-roikoren/no-object-getownpropertydescriptors': 'error',
    'es-roikoren/no-object-values': 'error',
    'es-roikoren/no-shared-array-buffer': 'error',
    'es-roikoren/no-string-prototype-padstart-padend': 'error',
    'es-roikoren/no-trailing-function-commas': 'error',
  },
};

export default config;
