# es-roikoren/no-number-maxsafeinteger
> disallow the `Number.MAX_SAFE_INTEGER` property.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Number.MAX_SAFE_INTEGER` property as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-number-maxsafeinteger: error */
const b = Number.MAX_SAFE_INTEGER;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.1/src/rules/no-number-maxsafeinteger.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.1/tests/src/rules/no-number-maxsafeinteger.ts)
