import { createRule } from '../util/create-rule';

// https://www-archive.mozilla.org/js/language/E262-3.pdf
const keywords = new Set([
  'abstract',
  'boolean',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'double',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'final',
  'finally',
  'float',
  'for',
  'function',
  'goto',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'int',
  'interface',
  'long',
  'native',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'short',
  'static',
  'super',
  'switch',
  'synchronized',
  'this',
  'throw',
  'throws',
  'transient',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'volatile',
  'while',
  'with',
]);

export const category = 'ES5';
export default createRule<[], 'forbidden'>({
  name: 'no-keyword-properties',
  meta: {
    type: 'problem',
    docs: { description: 'disallow reserved words as property names.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES5 reserved words as property names are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      Property(node) {
        if (!node.computed && node.key.type === 'Identifier' && keywords.has(node.key.name)) {
          context.report({ node, messageId: 'forbidden' });
        }
      },
      MemberExpression(node) {
        if (!node.computed && node.property.type === 'Identifier' && keywords.has(node.property.name)) {
          context.report({ node, messageId: 'forbidden' });
        }
      },
    };
  },
});
