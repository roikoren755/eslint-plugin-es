# es-roikoren/no-for-of-loops
> disallow `for-of` statements.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `for-of` statements as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-for-of-loops: error */
for (var a of b) {}
for (let a of b) {}
for (a of b) {}
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.5/src/rules/no-for-of-loops.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.5/tests/src/rules/no-for-of-loops.ts)
