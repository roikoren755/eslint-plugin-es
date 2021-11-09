import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-string-fromcodepoint';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'String.fromCodePoint' },
};

new RuleTester().run('no-string-fromcodepoint', rule, {
  valid: ['String', 'String.raw', 'let String = 0; String.fromCodePoint'],
  invalid: [{ code: 'String.fromCodePoint', errors: [error] }],
});
