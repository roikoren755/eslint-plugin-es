import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-object-defineproperty';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.defineProperty' },
};

new RuleTester().run('no-object-defineproperty', rule, {
  valid: ['Object', 'Object.foo', 'let Object = 0; Object.defineProperty'],
  invalid: [{ code: 'Object.defineProperty', errors: [error] }],
});
