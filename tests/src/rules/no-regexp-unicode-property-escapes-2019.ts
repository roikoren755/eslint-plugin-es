import type { TSESLint } from '@typescript-eslint/experimental-utils';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-regexp-unicode-property-escapes-2019';
import { RuleTester } from '../../tester';

const error = (options?: { value?: string; notLiteral?: boolean }): TSESLint.TestCaseError<'forbidden'> => {
  const value = options?.value ? `Script=${options.value}` : 'Extended_Pictographic';
  const type = options?.notLiteral ? AST_NODE_TYPES.NewExpression : AST_NODE_TYPES.Literal;

  return { messageId: 'forbidden', line: 1, type, data: { value: `\\p{${value}}` } };
};

if (!RuleTester.isSupported(2019)) {
  console.log('Skip the tests of no-regexp-unicode-property-escapes-2019.');
} else {
  new RuleTester().run('no-regexp-unicode-property-escapes-2019', rule, {
    valid: [
      String.raw`/\p{Letter}/u`,
      String.raw`/\P{Letter}/u`,
      String.raw`/\p{Script=Hiragana}/u`,
      String.raw`/\P{Script=Hiragana}/u`,
      String.raw`/\p{Extended_Pictographic}/`,
      String.raw`/\P{Extended_Pictographic}/`,
      String.raw`/\p{Script=Dogr}/`,
      String.raw`/\P{Script=Dogr}/`,
      String.raw`new RegExp('\\p{Extended_Pictographic}')`,
      String.raw`new RegExp('\\\\p{Extended_Pictographic}', 'u')`,
    ],
    invalid: [
      { code: String.raw`/\p{Extended_Pictographic}/u`, errors: [{ ...error(), column: 1 }] },
      { code: String.raw`/\\\p{Extended_Pictographic}/u`, errors: [{ ...error(), column: 1 }] },
      {
        code: String.raw`new RegExp('\\p{Extended_Pictographic}', 'u')`,
        errors: [{ ...error({ notLiteral: true }), column: 1 }],
      },
      {
        code: String.raw`new RegExp('\\\\\\p{Extended_Pictographic}', 'u')`,
        errors: [{ ...error({ notLiteral: true }), column: 1 }],
      },
      { code: String.raw`/\p{Script=Dogr}/u`, errors: [{ ...error({ value: 'Dogr' }), column: 1 }] },
      { code: String.raw`/\p{Script=Dogra}/u`, errors: [{ ...error({ value: 'Dogra' }), column: 1 }] },
      { code: String.raw`/\p{Script=Gong}/u`, errors: [{ ...error({ value: 'Gong' }), column: 1 }] },
      { code: String.raw`/\p{Script=Gunjala_Gondi}/u`, errors: [{ ...error({ value: 'Gunjala_Gondi' }), column: 1 }] },
      {
        code: String.raw`/\p{Script=Hanifi_Rohingya}/u`,
        errors: [{ ...error({ value: 'Hanifi_Rohingya' }), column: 1 }],
      },
      { code: String.raw`/\p{Script=Maka}/u`, errors: [{ ...error({ value: 'Maka' }), column: 1 }] },
      { code: String.raw`/\p{Script=Makasar}/u`, errors: [{ ...error({ value: 'Makasar' }), column: 1 }] },
      { code: String.raw`/\p{Script=Medefaidrin}/u`, errors: [{ ...error({ value: 'Medefaidrin' }), column: 1 }] },
      { code: String.raw`/\p{Script=Medf}/u`, errors: [{ ...error({ value: 'Medf' }), column: 1 }] },
      { code: String.raw`/\p{Script=Old_Sogdian}/u`, errors: [{ ...error({ value: 'Old_Sogdian' }), column: 1 }] },
      { code: String.raw`/\p{Script=Rohg}/u`, errors: [{ ...error({ value: 'Rohg' }), column: 1 }] },
      { code: String.raw`/\p{Script=Sogd}/u`, errors: [{ ...error({ value: 'Sogd' }), column: 1 }] },
      { code: String.raw`/\p{Script=Sogdian}/u`, errors: [{ ...error({ value: 'Sogdian' }), column: 1 }] },
      { code: String.raw`/\p{Script=Sogo}/u`, errors: [{ ...error({ value: 'Sogo' }), column: 1 }] },
    ],
  });
}
