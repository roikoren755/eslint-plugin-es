import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-weak-map';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.Identifier,
  data: { name: 'WeakMap' },
};

new RuleTester().run('no-weak-map', rule, {
  valid: ['Array', 'Object', 'let WeakMap = 0; WeakMap'],
  invalid: [
    { code: 'WeakMap', errors: [{ ...error, column: 1 }] },
    { code: 'function f() { WeakMap }', errors: [{ ...error, column: 16 }] },
  ],
});
