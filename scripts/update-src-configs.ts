import { writeFileSync } from 'fs';
import path from 'path';

import { TSESLint } from '@typescript-eslint/utils';

import { categories } from './rules';

const Root = path.resolve(__dirname, '../src/configs');

const configNameToDisallowNewIn = (revision: number): string => {
  const year = revision <= 5 ? revision : 2009 + revision;

  return `no-new-in-es${year}`;
};

const configNameToRestrictToPreviousOf = (revision: number): string => {
  const prevRev = revision === 5 ? 3 : revision - 1;
  const year = prevRev <= 5 ? prevRev : 2009 + prevRev;

  return `restrict-to-es${year}`;
};

const wrapCode = (code: string): string => `/**
 * DON'T EDIT THIS FILE.
 * This file was generated by 'scripts/update-src-configs.ts' script.
 */
import type { TSESLint } from '@typescript-eslint/utils';

const config: TSESLint.Linter.Config = ${code};

export default config;
`;

const run = async (): Promise<void> => {
  for (const { experimental, revision, rules } of Object.values(categories)) {
    const ruleSetting = rules
      .map((r) => `'es-roikoren/${r.ruleId}':'${revision === 'typescript' ? 'off' : 'error'}'`)
      .join(',');
    const extendSetting = Object.values(categories)
      .filter((c) => c.revision !== 'typescript' && c.revision >= revision && !c.experimental)
      .map((c) => `require.resolve('./${configNameToDisallowNewIn(c.revision as number)}')`)
      .join(',');

    if (experimental) {
      writeFileSync(
        path.join(Root, 'no-new-in-esnext.ts'),
        wrapCode(`{ plugins: ['es-roikoren'], rules: { ${ruleSetting} } }`),
      );
    } else if (revision === 'typescript') {
      writeFileSync(
        path.join(Root, `typescript.ts`),
        wrapCode(`{ plugins: ['es-roikoren'], rules: { ${ruleSetting} } }`),
      );
    } else {
      writeFileSync(
        path.join(Root, `${configNameToDisallowNewIn(revision)}.ts`),
        wrapCode(`{ plugins: ['es-roikoren'], rules: { ${ruleSetting} } }`),
      );
      writeFileSync(
        path.join(Root, `${configNameToRestrictToPreviousOf(revision)}.ts`),
        wrapCode(`{ extends: [${extendSetting}] }`),
      );
    }
  }

  await TSESLint.ESLint.outputFixes((await new TSESLint.ESLint({ fix: true }).lintFiles(['src/configs'])) as never);
};

run().catch(console.error);
