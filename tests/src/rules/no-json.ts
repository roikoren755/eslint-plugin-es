import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-json';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.Identifier,
  data: { name: 'JSON' },
};

new RuleTester().run('no-json', rule, {
  valid: ['let JSON = 0; JSON'],
  invalid: [
    { code: 'JSON', errors: [error] },
    { code: 'JSON.parse', errors: [error] },
    { code: 'JSON.stringify', errors: [error] },
  ],
});
