import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-weak-set';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.Identifier,
  data: { name: 'WeakSet' },
};

new RuleTester().run('no-weak-set', rule, {
  valid: ['Array', 'Object', 'let WeakSet = 0; WeakSet'],
  invalid: [
    { code: 'WeakSet', errors: [{ ...error, column: 1 }] },
    { code: 'function f() { WeakSet }', errors: [{ ...error, column: 16 }] },
  ],
});
