# es-roikoren/no-octal-numeric-literals
> disallow octal numeric literals.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 octal numeric literals as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-octal-numeric-literals: error */
let a = 0o123;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v3.0.1/src/rules/no-octal-numeric-literals.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v3.0.1/tests/src/rules/no-octal-numeric-literals.ts)
