# es-roikoren/no-regexp-d-flag
> disallow RegExp `d` flag.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-esnext`

This rule reports ES2022 [RegExp `d` flag](https://github.com/tc39/proposal-regexp-match-indices#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-regexp-d-flag: error */
const r1 = /./d;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.3/src/rules/no-regexp-d-flag.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.3/tests/src/rules/no-regexp-d-flag.ts)
