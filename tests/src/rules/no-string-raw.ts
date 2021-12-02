import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-string-raw';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'String.raw' },
};

new RuleTester().run('no-string-raw', rule, {
  valid: ['String', 'String.fromCodePoint', 'let String = 0; String.raw'],
  invalid: [{ code: 'String.raw', errors: [error] }],
});
