import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-object-defineproperties';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.defineProperties' },
};

new RuleTester().run('no-object-defineproperties', rule, {
  valid: ['Object', 'Object.foo', 'let Object = 0; Object.defineProperties'],
  invalid: [{ code: 'Object.defineProperties', errors: [error] }],
});
