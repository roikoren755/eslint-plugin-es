import { TSESLint } from '@typescript-eslint/utils';
import { builtin } from 'globals';
import semver from 'semver';

const eslintVersion = new TSESLint.Linter().version;
const getEcmaVersion = (): TSESLint.EcmaVersion => {
  if (semver.gte(eslintVersion, '8.0.0')) {
    return 2022;
  }

  if (semver.gte(eslintVersion, '7.8.0')) {
    return 2021;
  }

  return 2020;
};
const ecmaVersion = getEcmaVersion();

console.log('ECMAScript Version: %d', ecmaVersion);

export const RuleTester = TSESLint.RuleTester as typeof TSESLint.RuleTester & {
  setDefaultConfig: (config: Partial<TSESLint.RuleTesterConfig>) => void;
  isSupported: (targetEcmaVersion: number) => boolean;
};

RuleTester.setDefaultConfig({ parserOptions: { ecmaVersion, sourceType: 'script' }, globals: builtin });

RuleTester.isSupported = (targetEcmaVersion) => targetEcmaVersion <= ecmaVersion;
