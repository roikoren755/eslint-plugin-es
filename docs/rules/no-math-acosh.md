# es-roikoren/no-math-acosh
> disallow the `Math.acosh` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Math.acosh` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-math-acosh: error */
const n = Math.acosh(value);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.2/src/rules/no-math-acosh.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.2/tests/src/rules/no-math-acosh.ts)
