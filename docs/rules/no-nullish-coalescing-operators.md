# es-roikoren/no-nullish-coalescing-operators
> disallow nullish coalescing operators.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2020`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, `plugin:es-roikoren/restrict-to-es2018`, and `plugin:es-roikoren/restrict-to-es2019`

This rule reports ES2020 [Nullish Coalescing operators](https://github.com/tc39/proposal-nullish-coalescing) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-nullish-coalescing-operators: error */
var x = a ?? b;
```

👌 Examples of **correct** code for this rule:

<eslint-playground type="good" code="/*eslint es-roikoren/no-nullish-coalescing-operators: error */
var x = a || b
var x = a != null ? a : b
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.6/src/rules/no-nullish-coalescing-operators.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.6/tests/src/rules/no-nullish-coalescing-operators.ts)
