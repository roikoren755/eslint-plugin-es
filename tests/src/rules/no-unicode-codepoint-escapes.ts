import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-unicode-codepoint-escapes';

const baseError = { messageId: 'forbidden' as const, line: 1, data: {} };
const identifierError = { ...baseError, type: AST_NODE_TYPES.Identifier };
const literalError = { ...baseError, type: AST_NODE_TYPES.Literal };
const templateError = { ...baseError, type: AST_NODE_TYPES.TemplateElement };

new RuleTester().run('no-unicode-codepoint-escapes', rule, {
  valid: [
    'foo = 1',
    '\\u0045 = 1',
    "'foo'",
    "'\\u0045'",
    "'u{20}'",
    "'\\\\u{20}'",
    '`foo`',
    '`\\u0045`',
    '`u{20}`',
    '`\\\\u{20}`',
    'tag`\\unicode`',
    'tag`\\u{ZZZ}`',
  ],
  invalid: [
    { code: '\\u{45} = 1', output: '\\u0045 = 1', errors: [{ ...identifierError, column: 1 }] },
    { code: 'a\\u{45}b = 1', output: 'a\\u0045b = 1', errors: [{ ...identifierError, column: 2 }] },
    { code: "'\\u{45}'", output: "'\\u0045'", errors: [{ ...literalError, column: 2 }] },
    { code: "'a\\u{45}b'", output: "'a\\u0045b'", errors: [{ ...literalError, column: 3 }] },
    { code: '`\\u{45}`', output: '`\\u0045`', errors: [{ ...templateError, column: 2 }] },
    { code: 'tag`\\u{45}`', output: 'tag`\\u0045`', errors: [{ ...templateError, column: 5 }] },
    {
      // eslint-disable-next-line no-template-curly-in-string
      code: '`\\u{45}${a}\\u{46}`',
      // eslint-disable-next-line no-template-curly-in-string
      output: '`\\u0045${a}\\u0046`',
      errors: [
        { ...templateError, column: 2 },
        { ...templateError, column: 12 },
      ],
    },
    {
      // eslint-disable-next-line no-template-curly-in-string
      code: 'tag`\\u{45}${a}\\u{46}`',
      // eslint-disable-next-line no-template-curly-in-string
      output: 'tag`\\u0045${a}\\u0046`',
      errors: [
        { ...templateError, column: 5 },
        { ...templateError, column: 15 },
      ],
    },
    {
      // eslint-disable-next-line no-template-curly-in-string
      code: 'tag`\\u{XXXZX}${a}\\u{46}`',
      // eslint-disable-next-line no-template-curly-in-string
      output: 'tag`\\u{XXXZX}${a}\\u0046`',
      errors: [{ ...templateError, column: 18 }],
    },
    { code: '"\\u{20BB7}"', output: '"\\uD842\\uDFB7"', errors: [{ ...literalError, column: 2 }] },
    { code: '`\\u{20BB7}`', output: '`\\uD842\\uDFB7`', errors: [{ ...templateError, column: 2 }] },
    {
      code: `
a=\`\${a}\\u{D842}\\u{DFB7}\`
b="\\u{20BB7}"
`,
      output: `
a=\`\${a}\\uD842\\uDFB7\`
b="\\uD842\\uDFB7"
`,
      errors: [
        { ...templateError, line: 2, column: 8, endLine: 2, endColumn: 16 },
        { ...templateError, line: 2, column: 16, endLine: 2, endColumn: 24 },
        { ...literalError, line: 3, column: 4, endLine: 3, endColumn: 13 },
      ],
    },
  ],
});
