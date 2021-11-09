import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-object-freeze';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.freeze' },
};

new RuleTester().run('no-object-freeze', rule, {
  valid: ['Object', 'Object.foo', 'let Object = 0; Object.freeze'],
  invalid: [{ code: 'Object.freeze', errors: [error] }],
});
