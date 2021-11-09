import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-object-issealed';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.isSealed' },
};

new RuleTester().run('no-object-issealed', rule, {
  valid: ['Object', 'Object.foo', 'let Object = 0; Object.isSealed'],
  invalid: [{ code: 'Object.isSealed', errors: [error] }],
});
