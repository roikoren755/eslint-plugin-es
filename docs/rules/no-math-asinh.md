# es-roikoren/no-math-asinh
> disallow the `Math.asinh` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Math.asinh` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-math-asinh: error */
const n = Math.asinh(value);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.4/src/rules/no-math-asinh.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.4/tests/src/rules/no-math-asinh.ts)
