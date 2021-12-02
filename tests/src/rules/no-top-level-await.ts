import type { TSESLint } from '@typescript-eslint/experimental-utils';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-top-level-await';

const error = { messageId: 'forbidden' as const, line: 1, column: 1, type: AST_NODE_TYPES.AwaitExpression, data: {} };

if (!RuleTester.isSupported(2022)) {
  console.log('Skip the tests of no-top-level-await.');
} else {
  new RuleTester({ parserOptions: { sourceType: 'module' } } as TSESLint.RuleTesterConfig).run(
    'no-top-level-await',
    rule,
    {
      valid: [
        'async function f() { await expr }',
        'expr;',
        'const f = async function() { await expr }',
        'const f = async () => { await expr }',
        '({ async method() { await expr } })',
        'class A { async method() { await expr } }',
        '(class { async method() { await expr } })',
        'async function f() { for await (a of b); }',
        'async function f() { for await (var a of b); }',
        'async function f() { for await (let a of b); }',
        'async function f() { for await (const a of b); }',
        'function f() { async function f() { await expr } }',
      ],
      invalid: [
        { code: 'await expr()', errors: [{ ...error }] },
        { code: 'for await (a of b);', errors: [{ ...error, type: AST_NODE_TYPES.ForOfStatement }] },
        { code: 'for await (var a of b);', errors: [{ ...error, type: AST_NODE_TYPES.ForOfStatement }] },
        { code: 'for await (let a of b);', errors: [{ ...error, type: AST_NODE_TYPES.ForOfStatement }] },
        { code: 'for await (const a of b);', errors: [{ ...error, type: AST_NODE_TYPES.ForOfStatement }] },
        {
          code: `
await expr
async function f() {
  await expr
}
await expr`,
          errors: [
            { ...error, line: 2 },
            { ...error, line: 6 },
          ],
        },
        {
          code: `
await expr
async function f() {
  await expr
  async function f() {
    await expr
  }
}
await expr`,
          errors: [
            { ...error, line: 2 },
            { ...error, line: 9 },
          ],
        },
        {
          code: `
let jQuery;
try {
  jQuery = await import('https://cdn-a.com/jQuery');
} catch {
  jQuery = await import('https://cdn-b.com/jQuery');
}`,
          errors: [
            { ...error, line: 4, column: 12 },
            { ...error, line: 6, column: 12 },
          ],
        },
        { code: '{ await expr }', errors: [{ ...error, column: 3 }] },
        { code: '( await expr )', errors: [{ ...error, column: 3 }] },
        { code: 'fn( await expr )', errors: [{ ...error, column: 5 }] },
        { code: 'if (foo) { await expr }', errors: [{ ...error, column: 12 }] },
        { code: 'for (const foo of bar) { await expr }', errors: [{ ...error, column: 26 }] },
      ],
    },
  );
}
