# es-roikoren/no-math-cosh
> disallow the `Math.cosh` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Math.cosh` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-math-cosh: error */
const n = Math.cosh(value);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.3/src/rules/no-math-cosh.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.3/tests/src/rules/no-math-cosh.ts)
