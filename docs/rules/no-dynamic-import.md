# es-roikoren/no-dynamic-import
> disallow `import()` syntax.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2020`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, `plugin:es-roikoren/restrict-to-es2018`, and `plugin:es-roikoren/restrict-to-es2019`

This rule reports ES2020 [`import()` syntax](https://github.com/tc39/proposal-dynamic-import) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-dynamic-import: error */
async function f() {
  const a = await import('source');
}
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.7/src/rules/no-dynamic-import.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.7/tests/src/rules/no-dynamic-import.ts)
