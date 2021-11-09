/* eslint-disable max-lines */
import { ASTUtils } from '@typescript-eslint/experimental-utils';
import type { JSONSchema, TSESLint, TSESTree } from '@typescript-eslint/experimental-utils';
import type * as TypeScript from 'typescript';

import { optionalRequire } from './optional-require';

type TS = typeof TypeScript;

const ts = optionalRequire<TS>(require, 'typescript');

export interface IAggressive {
  aggressive?: boolean;
}

/**
 * Get `aggressive` option value.
 * @param {RuleContext} context The rule context.
 * @returns {boolean} The gotten `aggressive` option value.
 */
const getAggressiveOption = (context: TSESLint.RuleContext<string, [options: IAggressive]>): boolean => {
  const [options] = context.options;
  const globalOptions = context.settings.es;

  if (options && typeof options.aggressive === 'boolean') {
    return options.aggressive;
  }

  if (globalOptions && typeof (globalOptions as Record<string, unknown>).aggressive === 'boolean') {
    return (globalOptions as IAggressive).aggressive as boolean;
  }

  return false;
};

/**
 * Check if a given type is an object type or not.
 * @param {TypeScript.Type} type The type to check.
 * @returns {type is TypeScript.ObjectType} `true` if the type is an object type.
 */
const isObject = (type: TypeScript.Type): type is TypeScript.ObjectType =>
  // eslint-disable-next-line no-bitwise
  (type.flags & (ts as TS).TypeFlags.Object) !== 0;

/**
 * Check if a given type is an anonymous object type or not.
 * @param {TypeScript.Type} type The type to check.
 * @returns {type is TypeScript.ObjectType} `true` if the type is an anonymous object type.
 */
const isAnonymousObject = (type: TypeScript.Type): type is TypeScript.ObjectType =>
  // eslint-disable-next-line no-bitwise
  isObject(type) && (type.objectFlags & (ts as TS).ObjectFlags.Anonymous) !== 0;

/**
 * Check if a given type is `any` or not.
 * @param {TypeScript.Type} type The type to check.
 * @returns {boolean} `true` if the type is `any`.
 */
const isAny = (type: TypeScript.Type): boolean => (type.flags & (ts as TS).TypeFlags.Any) !== 0; // eslint-disable-line no-bitwise

/**
 * Check if a given type is an array-like type or not.
 * @param {TypeScript.Type} type The type to check.
 * @returns {type is TypeScript.ObjectType} `true` if the type is an array-like type.
 */
const isArrayLikeObject = (type: TypeScript.Type): type is TypeScript.ObjectType =>
  isObject(type) &&
  // eslint-disable-next-line no-bitwise
  (type.objectFlags &
    // eslint-disable-next-line no-bitwise
    ((ts as TS).ObjectFlags.ArrayLiteral | (ts as TS).ObjectFlags.EvolvingArray | (ts as TS).ObjectFlags.Tuple)) !==
    0;

/**
 * Check if a given type is an interface type or not.
 * @param {TypeScript.Type} type The type to check.
 * @returns {type is TypeScript.InterfaceType} `true` if the type is an interface type.
 */
const isClassOrInterface = (type: TypeScript.Type): type is TypeScript.InterfaceType =>
  // eslint-disable-next-line no-bitwise
  isObject(type) && (type.objectFlags & (ts as TS).ObjectFlags.ClassOrInterface) !== 0;

/**
 * Check if a given type is a reference type or not.
 * @param {TypeScript.Type} type The type to check.
 * @returns {type is TypeScript.TypeReference} `true` if the type is a reference type.
 */
const isReferenceObject = (type: TypeScript.Type): type is TypeScript.TypeReference =>
  // eslint-disable-next-line no-bitwise
  isObject(type) && (type.objectFlags & (ts as TS).ObjectFlags.Reference) !== 0;

/**
 * Check if a given type is a string-like type or not.
 * @param {TypeScript.Type} type The type to check.
 * @returns {boolean} `true` if the type is a string-like type.
 */
const isStringLike = (type: TypeScript.Type): boolean => (type.flags & (ts as TS).TypeFlags.StringLike) !== 0; // eslint-disable-line no-bitwise

/**
 * Check if a given type is a type parameter type or not.
 * @param {TypeScript.Type} type The type to check.
 * @returns {boolean} `true` if the type is a type parameter type.
 */
const isTypeParameter = (type: TypeScript.Type): boolean => (type.flags & (ts as TS).TypeFlags.TypeParameter) !== 0; // eslint-disable-line no-bitwise

/**
 * Check if a given type is a union-or-intersection type or not.
 * @param {TypeScript.Type} type The type to check.
 * @returns {type is TypeScript.UnionOrIntersectionType} `true` if the type is a union-or-intersection type.
 */
const isUnionOrIntersection = (type: TypeScript.Type): type is TypeScript.UnionOrIntersectionType =>
  // eslint-disable-next-line no-bitwise
  (type.flags & (ts as TS).TypeFlags.UnionOrIntersection) !== 0;

/**
 * Check if a given type is `unknown` or not.
 * @param {TypeScript.Type} type The type to check.
 * @returns {boolean} `true` if the type is `unknown`.
 */
const isUnknown = (type: TypeScript.Type): boolean => (type.flags & (ts as TS).TypeFlags.Unknown) !== 0; // eslint-disable-line no-bitwise

/**
 * Define handlers to disallow prototype methods.
 * @param {TSESLint.RuleContext<'forbidden', readonly []>} context The rule context.
 * @param {Record<string, readonly string[]>} nameMap The method names to disallow. The key is class names and that value is method names.
 * @returns {TSESLint.RuleFunction} The defined handlers.
 */
export const definePrototypeMethodHandler = (
  context: TSESLint.RuleContext<'forbidden', [options: IAggressive]>,
  nameMap: Record<string, readonly string[]>,
): TSESLint.RuleListener => {
  const aggressive = getAggressiveOption(context);

  const tsNodeMap = context.parserServices?.esTreeNodeToTSNodeMap;
  const checker = context.parserServices?.program?.getTypeChecker();

  const isTS = Boolean(ts && tsNodeMap && checker);
  const hasFullType = isTS && context.parserServices?.hasFullTypeInformation !== false;

  /**
   * Get the constraint type of a given type parameter type if exists.
   *
   * `type.getConstraint()` method doesn't return the constraint type of the
   * type parameter for some reason. So this gets the constraint type via AST.
   *
   * @param {TypeScript.TypeParameter} type The type parameter type to get.
   * @returns {TypeScript.Type | undefined} The constraint type.
   */
  const getConstraintType = (type: TypeScript.TypeParameter): TypeScript.Type | undefined => {
    const { symbol } = type;
    const declarations = symbol?.declarations;
    const declaration = declarations?.[0];

    if (
      ts?.isTypeParameterDeclaration(declaration as TypeScript.Declaration) &&
      (declaration as TypeScript.TypeParameterDeclaration).constraint
    ) {
      return checker?.getTypeFromTypeNode(
        (declaration as TypeScript.TypeParameterDeclaration).constraint as TypeScript.TypeNode,
      );
    }

    // eslint-disable-next-line consistent-return
    return undefined;
  };

  /**
   * Check if the name of the given type is expected or not.
   * @param {TypeScript.Type} type The type to check.
   * @param {string} className The expected type name.
   * @returns {boolean} `true` if should disallow it.
   */
  const typeEquals = (type: TypeScript.Type, className: string): boolean => {
    if (isAny(type) || isUnknown(type)) {
      return aggressive;
    }

    if (isAnonymousObject(type)) {
      // In non full-type mode, array types (e.g. `any[]`) become anonymous object type.
      return hasFullType ? false : aggressive;
    }

    if (isStringLike(type)) {
      return className === 'String';
    }

    if (isArrayLikeObject(type)) {
      return className === 'Array';
    }

    if (isReferenceObject(type) && type.target !== type) {
      return typeEquals(type.target, className);
    }

    if (isTypeParameter(type)) {
      const constraintType = getConstraintType(type);

      if (constraintType) {
        return typeEquals(constraintType, className);
      }

      return hasFullType ? false : aggressive;
    }

    if (isUnionOrIntersection(type)) {
      return type.types.some((t) => typeEquals(t, className));
    }

    if (isClassOrInterface(type)) {
      const name = type.symbol.escapedName;

      return name === className || name === `Readonly${className}`;
    }

    return checker?.typeToString(type) === className;
  };

  /**
   * Check if the type of the given node by the declaration of `node.property`.
   * @param {MemberExpression} memberAccessNode The MemberExpression node.
   * @param {string} className The class name to disallow.
   * @returns {boolean} `true` if should disallow it.
   */
  const checkByPropertyDeclaration = (memberAccessNode: TSESTree.MemberExpression, className: string): boolean => {
    const tsNode = tsNodeMap?.get(memberAccessNode.property);
    const symbol = tsNode && checker?.getSymbolAtLocation(tsNode);
    const declarations = symbol?.declarations;

    if (declarations) {
      for (const declaration of declarations) {
        const type = checker?.getTypeAtLocation(declaration.parent);

        if (type && typeEquals(type, className)) {
          return true;
        }
      }
    }

    return false;
  };

  /**
   * Check if the type of the given node by the type of `node.object`.
   * @param {MemberExpression} memberAccessNode The MemberExpression node.
   * @param {string} className The class name to disallow.
   * @returns {boolean} `true` if should disallow it.
   */
  const checkByObjectExpressionType = (memberAccessNode: TSESTree.MemberExpression, className: string): boolean => {
    const tsNode = tsNodeMap?.get(memberAccessNode.object);
    const type = checker?.getTypeAtLocation(tsNode as TypeScript.Node);

    return typeEquals(type as TypeScript.Type, className);
  };

  /**
   * Check if the type of the given node is one of given class or not.
   * @param {MemberExpression} memberAccessNode The MemberExpression node.
   * @param {string} className The class name to disallow.
   * @returns {boolean} `true` if should disallow it.
   */
  const checkObjectType = (memberAccessNode: TSESTree.MemberExpression, className: string): boolean => {
    // If it's obvious, shortcut.
    if (memberAccessNode.object.type === 'ArrayExpression') {
      return className === 'Array';
    }

    if (memberAccessNode.object.type === 'Literal' && (memberAccessNode.object as TSESTree.RegExpLiteral).regex) {
      return className === 'RegExp';
    }

    if (
      (memberAccessNode.object.type === 'Literal' && typeof memberAccessNode.object.value === 'string') ||
      memberAccessNode.object.type === 'TemplateLiteral'
    ) {
      return className === 'String';
    }

    // Test object type.
    return isTS
      ? checkByPropertyDeclaration(memberAccessNode, className) ||
          checkByObjectExpressionType(memberAccessNode, className)
      : aggressive;
  };

  // For performance
  const nameMapEntries = Object.entries(nameMap);

  if (nameMapEntries.length === 1) {
    const [[className, methodNames]] = nameMapEntries;

    return {
      MemberExpression(node) {
        const propertyName = ASTUtils.getPropertyName(node, context.getScope());

        if (methodNames.includes(propertyName as string) && checkObjectType(node, className)) {
          context.report({
            node,
            messageId: 'forbidden',
            data: { name: `${className}.prototype.${propertyName as string}` },
          });
        }
      },
    };
  }

  return {
    MemberExpression(node) {
      const propertyName = ASTUtils.getPropertyName(node, context.getScope());

      for (const [className, methodNames] of nameMapEntries) {
        if (methodNames.includes(propertyName as string) && checkObjectType(node, className)) {
          context.report({
            node,
            messageId: 'forbidden',
            data: { name: `${className}.prototype.${propertyName as string}` },
          });

          return;
        }
      }
    },
  };
};

export const schema: JSONSchema.JSONSchema4 = [
  { type: 'object', properties: { aggressive: { type: 'boolean' } }, additionalProperties: false },
];
