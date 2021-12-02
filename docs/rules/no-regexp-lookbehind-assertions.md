# es-roikoren/no-regexp-lookbehind-assertions
> disallow RegExp lookbehind assertions.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2018`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, and `plugin:es-roikoren/restrict-to-es2017`

This rule reports ES2018 [RegExp lookbehind assertions](https://github.com/tc39/proposal-regexp-lookbehind#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-regexp-lookbehind-assertions: error */
const r1 = /(?<=a)b/;
const r2 = /(?<!a)b/;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.7/src/rules/no-regexp-lookbehind-assertions.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.7/tests/src/rules/no-regexp-lookbehind-assertions.ts)
