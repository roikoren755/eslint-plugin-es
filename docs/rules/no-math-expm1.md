# es-roikoren/no-math-expm1
> disallow the `Math.expm1` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Math.expm1` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-math-expm1: error */
const n = Math.expm1(value);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.5/src/rules/no-math-expm1.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.5/tests/src/rules/no-math-expm1.ts)
