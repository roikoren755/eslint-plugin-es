import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-async-iteration';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.FunctionExpression, data: {} };

new RuleTester().run('no-async-iteration', rule, {
  valid: [
    'async function f() {}',
    'const f = async function() {}',
    'const f = async () => {}',
    '({ async method() {} })',
    'class A { async method() {} }',
    '(class { async method() {} })',
    'for (const a of b);',
  ],
  invalid: [
    {
      code: 'async function* f() {}',
      errors: [{ ...error, column: 1, type: AST_NODE_TYPES.FunctionDeclaration }],
    },
    {
      code: 'const f = async function*() {}',
      errors: [{ ...error, column: 11 }],
    },
    {
      code: '({ async* method() {} })',
      errors: [{ ...error, column: 17 }],
    },
    {
      code: 'class A { async* method() {} }',
      errors: [{ ...error, column: 24 }],
    },
    {
      code: '(class { async* method() {} })',
      errors: [{ ...error, column: 23 }],
    },
    {
      code: 'async function f() { for await (a of b); }',
      errors: [{ ...error, column: 22, type: AST_NODE_TYPES.ForOfStatement }],
    },
    {
      code: 'async function f() { for await (var a of b); }',
      errors: [{ ...error, column: 22, type: AST_NODE_TYPES.ForOfStatement }],
    },
    {
      code: 'async function f() { for await (let a of b); }',
      errors: [{ ...error, column: 22, type: AST_NODE_TYPES.ForOfStatement }],
    },
    {
      code: 'async function f() { for await (const a of b); }',
      errors: [{ ...error, column: 22, type: AST_NODE_TYPES.ForOfStatement }],
    },
  ],
});
