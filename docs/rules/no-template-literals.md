# es-roikoren/no-template-literals
> disallow template literals.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2015 template literals as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-template-literals: error */
const a1 = `foo`;
const a2 = `foo${bar}baz`;
const a3 = tag`foo`;
```

👌 Examples of **correct** code for this rule:

<eslint-playground type="good" code="/*eslint es-roikoren/no-template-literals: error */
const a1 = 'foo'
const a2 = 'foo'+bar+'baz'
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.6/src/rules/no-template-literals.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.6/tests/src/rules/no-template-literals.ts)
