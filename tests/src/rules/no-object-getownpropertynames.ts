import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-object-getownpropertynames';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.getOwnPropertyNames' },
};

new RuleTester().run('no-object-getownpropertynames', rule, {
  valid: ['Object', 'Object.foo', 'let Object = 0; Object.getOwnPropertyNames'],
  invalid: [{ code: 'Object.getOwnPropertyNames', errors: [error] }],
});
