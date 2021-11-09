import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-template-literals';

const baseError = { messageId: 'forbidden' as const, line: 1, data: {} };
const templateLiteralError = { ...baseError, type: AST_NODE_TYPES.TemplateLiteral };
const taggedTemplateError = { ...baseError, type: AST_NODE_TYPES.TaggedTemplateExpression };

new RuleTester().run('no-template-literals', rule, {
  valid: [
    "'foo'",
    '"bar"',
    `
const a1 = "foo"
const a2 = "foo"+bar+"baz"
    `,
  ],
  invalid: [
    { code: '`foo`', output: '"foo"', errors: [{ ...templateLiteralError, column: 1 }] },
    { code: 'tag`foo`', output: null, errors: [{ ...taggedTemplateError, column: 1 }] },
    // eslint-disable-next-line no-template-curly-in-string
    { code: '`foo${a}bar${b}baz`', output: '"foo"+a+"bar"+b+"baz"', errors: [{ ...templateLiteralError, column: 1 }] },
    {
      code: `
const a1 = \`foo\`
const a2 = \`foo\${bar}baz\`
const a3 = tag\`foo\`
            `,
      output: `
const a1 = "foo"
const a2 = "foo"+bar+"baz"
const a3 = tag\`foo\`
            `,
      errors: [
        { ...templateLiteralError, line: 2, column: 12 },
        { ...templateLiteralError, line: 3, column: 12 },
        { ...taggedTemplateError, line: 4, column: 12 },
      ],
    },
    // eslint-disable-next-line no-template-curly-in-string
    { code: '`${a}${b}`', output: '""+a+b', errors: [{ ...templateLiteralError, column: 1 }] },
    { code: '``', output: '""', errors: [{ ...templateLiteralError, column: 1 }] },
    // eslint-disable-next-line no-template-curly-in-string
    { code: '`${""}`', output: '""', errors: [{ ...templateLiteralError, column: 1 }] },
    // eslint-disable-next-line no-template-curly-in-string
    { code: "`${''}`", output: "''", errors: [{ ...templateLiteralError, column: 1 }] },
    { code: '`\n\t \'"\\`\\$\\${`', output: '"\\n\\t \'\\"`$${"', errors: [{ ...templateLiteralError, column: 1 }] },
    // eslint-disable-next-line no-template-curly-in-string
    { code: "`${'abc'}`", output: "'abc'", errors: [{ ...templateLiteralError, column: 1 }] },
  ],
});
