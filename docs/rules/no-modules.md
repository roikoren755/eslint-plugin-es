# es-roikoren/no-modules
> disallow modules.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 modules as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-roikoren/no-modules: error */
import x1 from &quot;x1&quot;
import {x2} from &quot;x2&quot;
import * as x3 from &quot;x3&quot;
export default function() {}
export { x1 } from &quot;x4&quot;
export { x2 }
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.1/src/rules/no-modules.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.1/tests/src/rules/no-modules.ts)
