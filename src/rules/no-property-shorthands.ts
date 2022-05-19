import type { TSESTree } from '@typescript-eslint/typescript-estree';
import { ASTUtils } from '@typescript-eslint/utils';
import type { TSESLint } from '@typescript-eslint/utils';

import { createRule } from '../util/create-rule';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-property-shorthands',
  meta: {
    type: 'problem',
    docs: { description: 'disallow property shorthands.', recommended: false },
    fixable: 'code',
    schema: [],
    messages: { forbidden: 'ES2015 property shorthands are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();

    /**
     * Fixes a FunctionExpression node by making it into a longform property.
     * @param {TSESLint.RuleFixer} fixer The fixer object
     * @param {TSESTree.PropertyNonComputedName} node A `Property` node that has a `FunctionExpression` as its value
     * @returns {TSESLint.RuleFix} A fix for this node
     */
    const makeFunctionLongform = (fixer: TSESLint.RuleFixer, node: TSESTree.Property): TSESLint.RuleFix => {
      const firstKeyToken = node.computed
        ? sourceCode.getTokenBefore(node.key, ASTUtils.isOpeningBracketToken)
        : sourceCode.getFirstToken(node.key);
      const lastKeyToken = node.computed
        ? sourceCode.getTokenAfter(node.key, ASTUtils.isClosingBracketToken)
        : sourceCode.getLastToken(node.key);
      const keyText = sourceCode.text.slice(firstKeyToken?.range[0], lastKeyToken?.range[1]);
      let functionHeader = 'function';

      if ('async' in node.value && node.value.async) {
        functionHeader = `async ${functionHeader}`;
      }

      if ('generator' in node.value && node.value.generator) {
        functionHeader = `${functionHeader}*`;
      }

      return fixer.replaceTextRange(
        [node.range[0], (lastKeyToken as TSESTree.Token).range[1]],
        `${keyText}: ${functionHeader}`,
      );
    };

    return {
      'ObjectExpression > :matches(Property[method=true], Property[shorthand=true])'(node: TSESTree.Property) {
        if (node.method || 'name' in node.key) {
          context.report({
            node,
            messageId: 'forbidden',
            fix: node.method
              ? (fixer) => makeFunctionLongform(fixer, node)
              : (fixer) => fixer.insertTextAfter(node.key, `: ${'name' in node.key ? node.key.name : ''}`),
          });
        }
      },
    };
  },
});
