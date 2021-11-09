import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-shared-array-buffer';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.Identifier,
  data: { name: 'SharedArrayBuffer' },
};

new RuleTester().run('no-shared-array-buffer', rule, {
  valid: ['Array', 'Object', 'let SharedArrayBuffer = 0; SharedArrayBuffer'],
  invalid: [
    {
      code: 'SharedArrayBuffer',
      errors: [{ ...error, column: 1 }],
    },
    {
      code: 'function f() { SharedArrayBuffer }',
      errors: [{ ...error, column: 16 }],
    },
  ],
});
