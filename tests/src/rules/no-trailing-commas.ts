import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-trailing-commas';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.ObjectExpression, data: {} };

new RuleTester().run('no-trailing-commas', rule, {
  valid: [
    'var a = []',
    'var a = [a]',
    'var a = [a,b]',
    'var a = {}',
    'var a = {a}',
    'var a = {a,b}',
    'function f(a,) {}',
    'f(a,)',
  ],
  invalid: [
    { code: 'var a = [1,]', errors: [{ ...error, column: 9, type: AST_NODE_TYPES.ArrayExpression }] },
    { code: 'var obj = {a,}', errors: [{ ...error, column: 11 }] },
    { code: 'var obj = {a:1,}', errors: [{ ...error, column: 11 }] },
  ],
});
