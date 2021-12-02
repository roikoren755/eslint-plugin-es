import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-atomics';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.Identifier,
  data: { name: 'Atomics' },
};

new RuleTester().run('no-atomics', rule, {
  valid: ['Array', 'Object', 'let Atomics = 0; Atomics'],
  invalid: [
    { code: 'Atomics', errors: [{ ...error, column: 1 }] },
    { code: 'function f() { Atomics }', errors: [{ ...error, column: 16 }] },
  ],
});
