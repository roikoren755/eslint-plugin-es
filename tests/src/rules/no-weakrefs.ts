import type { TSESLint } from '@typescript-eslint/experimental-utils';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-weakrefs';
import { RuleTester } from '../../tester';

const error = (name: string): TSESLint.TestCaseError<'forbidden'> => ({
  messageId: 'forbidden',
  line: 1,
  type: AST_NODE_TYPES.Identifier,
  data: { name },
});

new RuleTester().run('no-weakrefs', rule, {
  valid: ['Array', 'Object', 'let WeakRef = 0; WeakRef'],
  invalid: [
    { code: 'WeakRef', errors: [{ ...error('WeakRef'), column: 1 }] },
    { code: 'function f() { WeakRef }', errors: [{ ...error('WeakRef'), column: 16 }] },
    { code: 'FinalizationRegistry', errors: [{ ...error('FinalizationRegistry'), column: 1 }] },
    { code: 'function f() { FinalizationRegistry }', errors: [{ ...error('FinalizationRegistry'), column: 16 }] },
  ],
});
