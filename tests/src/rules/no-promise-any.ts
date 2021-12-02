import type { TSESLint } from '@typescript-eslint/experimental-utils';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-promise-any';
import { RuleTester } from '../../tester';

const error = (promiseAny?: 'Promise.any'): TSESLint.TestCaseError<'forbidden'> => ({
  messageId: 'forbidden',
  line: 1,
  type: promiseAny ? AST_NODE_TYPES.MemberExpression : AST_NODE_TYPES.Identifier,
  data: { name: promiseAny ?? 'AggregateError' },
});

new RuleTester().run('no-promise-any', rule, {
  valid: ['Promise.all', 'Error', 'RangeError'],
  invalid: [
    { code: 'Promise.any', errors: [{ ...error('Promise.any'), column: 1 }] },
    { code: 'AggregateError', errors: [{ ...error(), column: 1 }] },
    { code: 'console.log(e instanceof AggregateError)', errors: [{ ...error(), column: 26 }] },
  ],
});
