import { readdirSync, writeFileSync } from 'fs';
import path from 'path';

import { TSESLint } from '@typescript-eslint/experimental-utils';
import camelcase from 'camelcase';

import { rules } from './rules';

const run = async (): Promise<void> => {
  const collator = new Intl.Collator('en', { numeric: true });

  const configRootPath = path.resolve(__dirname, '../src/configs');
  const configIds = readdirSync(configRootPath)
    .map((f) => path.basename(f, '.ts'))
    .sort(collator.compare.bind(collator));
  const ruleIds = rules.map((r) => r.ruleId).sort(collator.compare.bind(collator));
  const configImports = configIds.map((id) => `import ${camelcase(id)} from './configs/${id}';`).join('\n');
  const ruleImports = ruleIds.map((id) => `import ${camelcase(id)} from './rules/${id}';`).join('\n');
  const configs = configIds.map((id) => `'${id}': ${camelcase(id)}`).join(',');
  const rulesField = ruleIds.map((id) => `'${id}': ${camelcase(id)}`).join(',');

  writeFileSync(
    'src/index.ts',
    `/**
 * DON'T EDIT THIS FILE.
 * This file was generated automatically by 'scripts/update-src-index.ts'.
 */
${configImports}
${ruleImports}

export default {
  configs: {
    ${configs},
  },
  rules: {
    ${rulesField}
  },
};
`,
  );

  await TSESLint.ESLint.outputFixes((await new TSESLint.ESLint({ fix: true }).lintFiles(['src/index.ts'])) as never);
};

run().catch(console.error);
