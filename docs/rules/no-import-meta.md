# es-roikoren/no-import-meta
> disallow `import.meta` meta property.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2020`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, `plugin:es-roikoren/restrict-to-es2018`, and `plugin:es-roikoren/restrict-to-es2019`

This rule reports ES2020 [import.meta](https://github.com/tc39/proposal-import-meta) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-import-meta: error */
import.meta;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0-alpha-20211010133854/src/rules/no-import-meta.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0-alpha-20211010133854/tests/src/rules/no-import-meta.ts)
