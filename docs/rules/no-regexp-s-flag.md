# es-roikoren/no-regexp-s-flag
> disallow RegExp `s` flag.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2018`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, and `plugin:es-roikoren/restrict-to-es2017`

This rule reports ES2018 [RegExp `s` flag](https://github.com/tc39/proposal-regexp-dotall-flag#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-regexp-s-flag: error */
const r1 = /./s;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.0/src/rules/no-regexp-s-flag.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.0/tests/src/rules/no-regexp-s-flag.ts)
