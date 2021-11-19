# es-roikoren/no-array-of
> disallow the `Array.of` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Array.of` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-array-of: error */
const array = Array.of(1, 2, 3);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.5/src/rules/no-array-of.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.5/tests/src/rules/no-array-of.ts)
