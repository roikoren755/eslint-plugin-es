import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import path from 'path';

((ruleId: string): void => {
  if (!ruleId) {
    console.error('Usage: npm run new <RuleID>');
    process.exitCode = 1;

    return;
  }

  if (!/^[a-z0-9-]+$/u.test(ruleId)) {
    console.error("Invalid RuleID '%s'.", ruleId);
    process.exitCode = 1;

    return;
  }

  const ruleFile = path.resolve(__dirname, `../src/rules/${ruleId}.ts`);
  const testFile = path.resolve(__dirname, `../tests/src/rules/${ruleId}.ts`);
  const docFile = path.resolve(__dirname, `../docs/rules/${ruleId}.md`);

  writeFileSync(
    ruleFile,
    `import { createRule } from '../utils/create-rule';

export const category = 'ES2021';
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
    `import { RuleTester } = from '../../tester';
import rule from '../../../src/rules/${ruleId}';

if (!RuleTester.isSupported(2021)) {
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

<eslint-playground type="bad" code="/*eslint es-roikoren/${ruleId}: error */

" />
`,
  );

  execSync(`code "${ruleFile}"`);
  execSync(`code "${testFile}"`);
  execSync(`code "${docFile}"`);
})(process.argv[2]);
