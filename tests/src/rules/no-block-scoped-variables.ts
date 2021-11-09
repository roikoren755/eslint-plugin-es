import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-block-scoped-variables';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.VariableDeclaration, data: {} };

new RuleTester().run('no-block-scoped-variables', rule, {
  valid: ['var a = 1', 'function f(a) {}', 'function f(a = 1) {}', 'try {} catch (e) {}'],
  invalid: [
    { code: 'const a = 1', errors: [{ ...error, column: 1 }] },
    { code: 'let a = 1', errors: [{ ...error, column: 1 }] },
    { code: '{ const a = 1 }', errors: [{ ...error, column: 3 }] },
    { code: '{ let a = 1 }', errors: [{ ...error, column: 3 }] },
    { code: 'function wrap() { const a = 1 }', errors: [{ ...error, column: 19 }] },
    { code: 'function wrap() { let a = 1 }', errors: [{ ...error, column: 19 }] },
  ],
});
