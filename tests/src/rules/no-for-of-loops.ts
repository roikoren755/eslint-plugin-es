import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-for-of-loops';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.ForOfStatement, data: {} };

new RuleTester().run('no-for-of-loops', rule, {
  valid: ['for(;;);', 'for(a in b);', 'for(var a in b);', 'for(let a in b);', 'for(const a in b);'],
  invalid: [
    { code: 'for(a of b);', errors: [{ ...error, column: 1 }] },
    { code: 'for(var a of b);', errors: [{ ...error, column: 1 }] },
    { code: 'for(let a of b);', errors: [{ ...error, column: 1 }] },
    { code: 'for(const a of b);', errors: [{ ...error, column: 1 }] },
    { code: 'async function f() { for await (const a of b); }', errors: [{ ...error, column: 22 }] },
  ],
});
