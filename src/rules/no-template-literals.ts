import type { TSESLint } from '@typescript-eslint/experimental-utils';
import type { TSESTree } from '@typescript-eslint/typescript-estree';
import { createRule } from '../util/create-rule';

/**
 * Checks whether it is string literal
 * @param  {string} s string source code
 * @returns {boolean} true: is string literal source code
 */
const isStringLiteralCode = (s: string): boolean =>
  (s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'));

/**
 * Transform template literal to string concatenation.
 * @param  {TSESTree.TemplateLiteral} node TemplateLiteral node.(not within TaggedTemplateExpression)
 * @param  {TSESLint.SourceCode} sourceCode SourceCode
 * @returns {string} After transformation
 */
const templateLiteralToStringConcat = (node: TSESTree.TemplateLiteral, sourceCode: TSESLint.SourceCode): string => {
  const ss: string[] = [];

  node.quasis.forEach((q, i) => {
    const value = q.value.cooked;

    if (value) {
      ss.push(JSON.stringify(value));
    }

    if (i < node.expressions.length) {
      const e = node.expressions[i];
      const text = sourceCode.getText(e);

      ss.push(text);
    }
  });

  if (ss.length === 0 || !isStringLiteralCode(ss[0])) {
    ss.unshift('""');
  }

  return ss.join('+');
};

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-template-literals',
  meta: {
    type: 'problem',
    docs: { description: 'disallow template literals.', recommended: false },
    fixable: 'code',
    schema: [],
    messages: { forbidden: 'ES2015 template literals are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      'TaggedTemplateExpression, :not(TaggedTemplateExpression) > TemplateLiteral'(node: TSESTree.TemplateLiteral) {
        context.report({
          node,
          messageId: 'forbidden',
          fix:
            node.type === 'TemplateLiteral'
              ? (fixer) => fixer.replaceText(node, templateLiteralToStringConcat(node, sourceCode))
              : undefined,
        });
      },
    };
  },
});
