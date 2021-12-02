import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-rest-parameters';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.RestElement, data: {} };

new RuleTester().run('no-rest-parameters', rule, {
  valid: [
    '[a, ...b]',
    '[a, ...b] = array',
    'f(...a)',
    'new F(...a)',
    'function f([...a]) {}',
    '({...a})',
    '({...a} = obj)',
  ],
  invalid: [
    { code: 'function f(...a) {}', errors: [{ ...error, column: 12 }] },
    { code: '(function(...a) {})', errors: [{ ...error, column: 11 }] },
    { code: '(...a) => {}', errors: [{ ...error, column: 2 }] },
    { code: '({ f(...a) {} })', errors: [{ ...error, column: 6 }] },
    { code: 'class A { f(...a) {} }', errors: [{ ...error, column: 13 }] },
    { code: '(class { f(...a) {} })', errors: [{ ...error, column: 12 }] },
  ],
});
