# es-roikoren/no-unicode-codepoint-escapes
> disallow Unicode code point escape sequences.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2015 Unicode code point escape sequences as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-unicode-codepoint-escapes: error */
const a\u{31} = `foo`;
const a2 = 'a\u{62}b';
```

👌 Examples of **correct** code for this rule:

<eslint-playground type="good" code="/*eslint es-roikoren/no-unicode-codepoint-escapes: error */
const a\u0031 = `foo`
const a2 = 'a\u0062b'
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.4/src/rules/no-unicode-codepoint-escapes.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.4/tests/src/rules/no-unicode-codepoint-escapes.ts)
