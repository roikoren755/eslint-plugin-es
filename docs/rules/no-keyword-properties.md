# es-roikoren/no-keyword-properties
> disallow reserved words as property names.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 reserved words as property names as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-roikoren/no-keyword-properties: error */
var a = { if: 1, class: 2 }
a.if = 2
a.class = 3
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0/src/rules/no-keyword-properties.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0/tests/src/rules/no-keyword-properties.ts)
