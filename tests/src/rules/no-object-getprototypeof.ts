import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-object-getprototypeof';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.getPrototypeOf' },
};

new RuleTester().run('no-object-getprototypeof', rule, {
  valid: ['Object', 'Object.foo', 'let Object = 0; Object.getPrototypeOf'],
  invalid: [{ code: 'Object.getPrototypeOf', errors: [error] }],
});
