# es-roikoren/no-regexp-unicode-property-escapes
> disallow RegExp Unicode property escape sequences.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2018`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, and `plugin:es-roikoren/restrict-to-es2017`

This rule reports ES2018 [RegExp Unicode property escape sequences](https://github.com/tc39/proposal-regexp-unicode-property-escapes#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-regexp-unicode-property-escapes: error */
const r1 = /\p{Script=Hiragana}+/u;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.7/src/rules/no-regexp-unicode-property-escapes.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.7/tests/src/rules/no-regexp-unicode-property-escapes.ts)
