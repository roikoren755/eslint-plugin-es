# es-roikoren/no-top-level-await
> disallow top-level `await`.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-esnext`

This rule reports ES2022 [Top-level `await`](https://github.com/tc39/proposal-top-level-await) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-top-level-await: error */
await expr;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.7/src/rules/no-top-level-await.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.7/tests/src/rules/no-top-level-await.ts)
