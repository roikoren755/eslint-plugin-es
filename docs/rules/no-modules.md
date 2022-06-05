# es-roikoren/no-modules
> disallow modules.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 modules as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-modules: error */
import x1 from 'x1';
import { x2 } from 'x2';
import * as x3 from 'x3';
export default function() {};
export { x1 } from 'x4';
export { x2 };
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v3.0.1/src/rules/no-modules.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v3.0.1/tests/src/rules/no-modules.ts)
