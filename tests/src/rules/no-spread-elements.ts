import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-spread-elements';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.SpreadElement, data: {} };

new RuleTester().run('no-spread-elements', rule, {
  valid: ['[a, ...b] = array', 'function f(a, ...b) {}', 'for ([a, ...b] of c) {}', '({ ...a })', '({ ...a } = obj)'],
  invalid: [
    { code: 'f(...a, b)', errors: [{ ...error, column: 3 }] },
    { code: 'f(a, ...b)', errors: [{ ...error, column: 6 }] },
    { code: 'new F(...a, b)', errors: [{ ...error, column: 7 }] },
    { code: '[...a, b]', errors: [{ ...error, column: 2 }] },
  ],
});
