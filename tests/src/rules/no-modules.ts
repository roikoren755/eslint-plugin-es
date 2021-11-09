import type { TSESLint } from '@typescript-eslint/experimental-utils';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-modules';

const baseError = { messageId: 'forbidden' as const, line: 1, column: 1, data: {} };
const importError = { ...baseError, type: AST_NODE_TYPES.ImportDeclaration };
const exportNamedError = { ...baseError, type: AST_NODE_TYPES.ExportNamedDeclaration };
const exportDefaultError = { ...baseError, type: AST_NODE_TYPES.ExportDefaultDeclaration };

new RuleTester({
  parserOptions: { sourceType: 'module' },
} as TSESLint.RuleTesterConfig).run('no-modules', rule, {
  valid: ['module.exports = {}', "require('x')"],
  invalid: [
    { code: "import x from 'x'", errors: [importError] },
    { code: "import * as x from 'x'", errors: [importError] },
    { code: "import x, {y, z} from 'x'", errors: [importError] },
    { code: "export {x} from 'x'", errors: [exportNamedError] },
    { code: 'const x = 0; export {x}', errors: [{ ...exportNamedError, column: 14 }] },
    { code: 'export const a = 0', errors: [exportNamedError] },
    { code: 'export function f() {}', errors: [exportNamedError] },
    { code: 'export class A {}', errors: [exportNamedError] },
    { code: 'export default 0', errors: [exportDefaultError] },
    { code: 'export default function() {}', errors: [exportDefaultError] },
  ],
});
