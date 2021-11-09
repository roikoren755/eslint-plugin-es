import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-object-preventextensions';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.preventExtensions' },
};

new RuleTester().run('no-object-preventextensions', rule, {
  valid: ['Object', 'Object.foo', 'let Object = 0; Object.preventExtensions'],
  invalid: [{ code: 'Object.preventExtensions', errors: [error] }],
});
