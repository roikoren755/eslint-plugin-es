# es-roikoren/no-math-cbrt
> disallow the `Math.cbrt` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Math.cbrt` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-math-cbrt: error */
const n = Math.cbrt(value);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.4/src/rules/no-math-cbrt.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.4/tests/src/rules/no-math-cbrt.ts)
