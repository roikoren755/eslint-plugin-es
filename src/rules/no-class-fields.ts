import type { TSESTree } from '@typescript-eslint/typescript-estree';
import { ASTUtils } from '@typescript-eslint/utils';
import type { TSESLint } from '@typescript-eslint/utils';

import { createRule } from '../util/create-rule';

/**
 * Get the name and kind of the given PropertyDefinition node.
 * @param {TSESTree.PropertyDefinition} node - The PropertyDefinition node to get.
 * @param {TSESLint.SourceCode} sourceCode The source code object to get the code of computed property keys.
 * @returns {string} The name and kind of the PropertyDefinition node.
 */
const getFieldNameWithKind = (node: TSESTree.PropertyDefinition, sourceCode: TSESLint.SourceCode): string => {
  const tokens: string[] = [];

  if (node.static) {
    tokens.push('static');
  }

  if (node.key.type === 'PrivateIdentifier') {
    tokens.push('private');
  }

  tokens.push('field');

  if (node.key.type === 'PrivateIdentifier') {
    tokens.push(`#${node.key.name}`);
  } else {
    const name = ASTUtils.getPropertyName(node as unknown as TSESTree.MethodDefinition);

    if (name) {
      tokens.push(`'${name}'`);
    } else if (sourceCode) {
      const keyText = sourceCode.getText(node.key);

      if (!keyText.includes('\n')) {
        tokens.push(`[${keyText}]`);
      }
    }
  }

  return tokens.join(' ');
};

export const category = 'ES2022';
export default createRule<[], 'forbidden'>({
  name: 'no-class-fields',
  meta: {
    type: 'problem',
    docs: { description: 'disallow class fields.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2020 {{nameWithKind}} is forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition(node) {
        context.report({
          node: node.key,
          messageId: 'forbidden',
          data: { nameWithKind: getFieldNameWithKind(node, context.getSourceCode()) },
        });
      },
      'MethodDefinition:exit'(node: TSESTree.MethodDefinition) {
        if (node.key.type !== 'PrivateIdentifier') {
          return;
        }

        context.report({
          node: node.key,
          messageId: 'forbidden',
          // @ts-expect-error - The original getFunctionNameWithKind from `eslint-utils` does accept two parameters
          data: { nameWithKind: ASTUtils.getFunctionNameWithKind(node.value, context.getSourceCode()) },
        });
      },
      ':not(PropertyDefinition, MethodDefinition) > PrivateIdentifier'(node: TSESTree.PrivateIdentifier) {
        const { parent, name } = node;

        context.report({
          node,
          messageId: 'forbidden',
          data: {
            nameWithKind:
              parent?.parent?.type === 'CallExpression' && parent.parent.callee === parent
                ? `private method call #${name}()`
                : `private access #${name}`,
          },
        });
      },
    };
  },
});
