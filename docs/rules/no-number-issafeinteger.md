# es-roikoren/no-number-issafeinteger
> disallow the `Number.isSafeInteger` property.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Number.isSafeInteger` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-number-issafeinteger: error */
const b = Number.isSafeInteger(value);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0-alpha-20211010133854/src/rules/no-number-issafeinteger.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0-alpha-20211010133854/tests/src/rules/no-number-issafeinteger.ts)
