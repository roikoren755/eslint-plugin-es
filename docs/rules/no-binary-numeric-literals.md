# es-roikoren/no-binary-numeric-literals
> disallow binary numeric literals.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 binary numeric literals as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-binary-numeric-literals: error */
let a = 0b1010;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.1/src/rules/no-binary-numeric-literals.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.1/tests/src/rules/no-binary-numeric-literals.ts)
