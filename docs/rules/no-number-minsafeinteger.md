# es-roikoren/no-number-minsafeinteger
> disallow the `Number.MIN_SAFE_INTEGER` property.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Number.MIN_SAFE_INTEGER` property as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-number-minsafeinteger: error */
const b = Number.MIN_SAFE_INTEGER;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0-alpha-20211010133854/src/rules/no-number-minsafeinteger.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0-alpha-20211010133854/tests/src/rules/no-number-minsafeinteger.ts)
