import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-object-isfrozen';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.isFrozen' },
};

new RuleTester().run('no-object-isfrozen', rule, {
  valid: ['Object', 'Object.foo', 'let Object = 0; Object.isFrozen'],
  invalid: [{ code: 'Object.isFrozen', errors: [error] }],
});
