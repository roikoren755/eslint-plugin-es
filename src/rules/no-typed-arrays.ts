import { ASTUtils } from '@typescript-eslint/utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-typed-arrays',
  meta: {
    type: 'problem',
    docs: { description: 'disallow ES2015 typed arrays.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2015 '{{name}}' is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, {
      Int8Array: { [ASTUtils.ReferenceTracker.READ]: true },
      Uint8Array: { [ASTUtils.ReferenceTracker.READ]: true },
      Uint8ClampedArray: { [ASTUtils.ReferenceTracker.READ]: true },
      Int16Array: { [ASTUtils.ReferenceTracker.READ]: true },
      Uint16Array: { [ASTUtils.ReferenceTracker.READ]: true },
      Int32Array: { [ASTUtils.ReferenceTracker.READ]: true },
      Uint32Array: { [ASTUtils.ReferenceTracker.READ]: true },
      Float32Array: { [ASTUtils.ReferenceTracker.READ]: true },
      Float64Array: { [ASTUtils.ReferenceTracker.READ]: true },
      DataView: { [ASTUtils.ReferenceTracker.READ]: true },
    });
  },
});
