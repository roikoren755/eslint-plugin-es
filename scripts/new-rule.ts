import { writeFileSync } from 'fs';
import path from 'path';

import { TSESLint } from '@typescript-eslint/experimental-utils';

const run = async (appliedRuleId: string): Promise<void> => {
  if (!appliedRuleId) {
    console.error('Usage: yarn new <RuleID>');
    process.exitCode = 1;

    return;
  }

  if (!/^[a-z0-9-]+$/u.test(appliedRuleId)) {
    console.error("Invalid RuleID '%s'.", appliedRuleId);
    process.exitCode = 1;

    return;
  }

  const ruleId = `no-${appliedRuleId}`;
  const ruleFile = path.resolve(__dirname, `../src/rules/${ruleId}.ts`);
  const testFile = path.resolve(__dirname, `../tests/src/rules/${ruleId}.ts`);
  const docFile = path.resolve(__dirname, `../docs/rules/${ruleId}.md`);

  writeFileSync(
    ruleFile,
    `import { createRule } from '../util/create-rule';

export const category = 'ES2022';
export default createRule<[], 'forbidden'>({
  name: '${ruleId}',
  meta: {
    type: 'problem',
    docs: { description: '', recommended: false },
    schema: [],
    messages: { forbidden: '' },
  },
  defaultOptions: [],
  create(context) {
    return {};
  },
});
`,
  );
  writeFileSync(
    testFile,
    `import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/${ruleId}';

const error = { messageId: 'forbidden' as const, line: 1, column: 1, type: AST_NODE_TYPES.MemberExpression, data: {} };

if (!RuleTester.isSupported(2022)) {
  console.log('Skip the tests of ${ruleId}.');
} else {
  new RuleTester().run('${ruleId}', rule, {
    valid: [],
    invalid: [],
  });
}
`,
  );
  writeFileSync(
    docFile,
    `# es-roikoren/${ruleId}
> 

This rule reports ??? as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

\`\`\`js
/*eslint es-roikoren/${ruleId}: error */

\`\`\`
`,
  );

  await TSESLint.ESLint.outputFixes((await new TSESLint.ESLint({ fix: true }).lintFiles([ruleFile, testFile])) as never);
};

run(process.argv[2]).catch(console.error);
