# es-roikoren/no-object-keys
> disallow the `Object.keys` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Object.keys` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-roikoren/no-object-keys: error */
const keys = Object.keys(obj)
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0/src/rules/no-object-keys.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0/tests/src/rules/no-object-keys.ts)
