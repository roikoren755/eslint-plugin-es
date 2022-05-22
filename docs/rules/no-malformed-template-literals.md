# es-roikoren/no-malformed-template-literals
> disallow template literals with invalid escape sequences.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2018`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, and `plugin:es-roikoren/restrict-to-es2017`

This rule reports ES2018 [template literals with invalid escape sequences](https://github.com/tc39/proposal-template-literal-revision#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-malformed-template-literals: error */
tag`\unicode`;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.11/src/rules/no-malformed-template-literals.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.11/tests/src/rules/no-malformed-template-literals.ts)
