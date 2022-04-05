# es-roikoren/no-math-fround
> disallow the `Math.fround` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Math.fround` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-math-fround: error */
const n = Math.fround(value);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.8/src/rules/no-math-fround.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.8/tests/src/rules/no-math-fround.ts)
