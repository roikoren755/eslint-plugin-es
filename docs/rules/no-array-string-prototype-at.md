# es-roikoren/no-array-string-prototype-at
> disallow the `{Array,String,TypedArray}.prototype.at()` methods.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-esnext`

This rule reports ES2022 [`{Array,String,TypedArray}.prototype.at` methods](https://github.com/tc39/proposal-relative-indexing-method) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-array-string-prototype-at: [error, { aggressive: true }] */
foo.at(-1);
'str'.at(-1);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.1/src/rules/no-array-string-prototype-at.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.1/tests/src/rules/no-array-string-prototype-at.ts)
