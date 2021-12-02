import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-object-values';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.values' },
};

new RuleTester().run('no-object-values', rule, {
  valid: ['Object', 'Object.assign', 'let Object = 0; Object.values'],
  invalid: [{ code: 'Object.values', errors: [error] }],
});
