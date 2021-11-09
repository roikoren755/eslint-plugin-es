import fs from 'fs';
import path from 'path';
import { TSESLint } from '@typescript-eslint/experimental-utils';
import camelcase from 'camelcase';

import { rules } from './rules';

const run = async (): Promise<void> => {
  const collator = new Intl.Collator('en', { numeric: true });

  const configRootPath = path.resolve(__dirname, '../src/configs');
  const configIds = fs
    .readdirSync(configRootPath)
    .map((f) => path.basename(f, '.ts'))
    .sort(collator.compare.bind(collator));
  const ruleIds = rules.map((r) => r.ruleId).sort(collator.compare.bind(collator));

  fs.writeFileSync(
    'src/index.ts',
    `/**
 * DON'T EDIT THIS FILE.
 * This file was generated automatically by 'scripts/update-src-index.ts'.
 */
${configIds.map((id) => `import ${camelcase(id)} from './configs/${id}';`).join('\n')}
${ruleIds.map((id) => `import ${camelcase(id)} from './rules/${id}';`).join('\n')}

export default {
  configs: {
    ${configIds.map((id) => `'${id}': ${camelcase(id)}`).join(',')},
  },
  rules: {
    ${ruleIds.map((id) => `'${id}': ${camelcase(id)}`).join(',')}
  },
};
`,
  );

  await TSESLint.ESLint.outputFixes((await new TSESLint.ESLint({ fix: true }).lintFiles(['src/index.ts'])) as never);
};

run().catch(console.error);
