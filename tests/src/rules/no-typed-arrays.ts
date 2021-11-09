import type { TSESLint } from '@typescript-eslint/experimental-utils';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-typed-arrays';

const error = (name: string | 'DataView'): TSESLint.TestCaseError<'forbidden'> => ({
  messageId: 'forbidden',
  line: 1,
  type: AST_NODE_TYPES.Identifier,
  data: { name: name === 'DataView' ? name : `${name}Array` },
});

new RuleTester().run('no-typed-arrays', rule, {
  valid: ['Array', 'Set'],
  invalid: [
    { code: 'Int8Array', errors: [error('Int8')] },
    { code: 'Uint8Array', errors: [error('Uint8')] },
    { code: 'Uint8ClampedArray', errors: [error('Uint8Clamped')] },
    { code: 'Int16Array', errors: [error('Int16')] },
    { code: 'Uint16Array', errors: [error('Uint16')] },
    { code: 'Int32Array', errors: [error('Int32')] },
    { code: 'Uint32Array', errors: [error('Uint32')] },
    { code: 'Float32Array', errors: [error('Float32')] },
    { code: 'Float64Array', errors: [error('Float64')] },
    { code: 'DataView', errors: [error('DataView')] },
  ],
});
