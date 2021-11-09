import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-rest-spread-properties';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.RestElement, data: {} };

new RuleTester().run('no-rest-spread-properties', rule, {
  valid: ['[...a]', '[...a] = array', '({a: [...b]})', '({a: [...b]} = obj)', 'function f(...a) {}', 'f(...a)'],
  invalid: [
    { code: '({...a})', errors: [{ ...error, column: 3, type: AST_NODE_TYPES.SpreadElement }] },
    { code: '({...a} = obj)', errors: [{ ...error, column: 3 }] },
    { code: 'for ({...a} of x) {}', errors: [{ ...error, column: 7 }] },
    { code: 'function f({...a}) {}', errors: [{ ...error, column: 13 }] },
  ],
});
