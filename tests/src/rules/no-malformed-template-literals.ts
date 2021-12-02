import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-malformed-template-literals';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, column: 4, type: AST_NODE_TYPES.TemplateLiteral, data: {} };

new RuleTester().run('no-malformed-template-literals', rule, {
  valid: ['`foo`', 'tag`foo`', 'tag``'],
  invalid: [
    { code: 'tag`\\unicode`', errors: [error] },
    // eslint-disable-next-line no-template-curly-in-string
    { code: 'tag`\\unicode${a}\\unicode${b}\\unicode${c}unicode`', errors: [error] },
  ],
});
