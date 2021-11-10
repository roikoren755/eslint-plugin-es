# es-roikoren/no-optional-chaining
> disallow optional chaining.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2020`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, `plugin:es-roikoren/restrict-to-es2018`, and `plugin:es-roikoren/restrict-to-es2019`

This rule reports ES2020 [Optional Chaining](https://github.com/tc39/proposal-optional-chaining) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-optional-chaining: error */
var x = a?.b;
var x = a?.[b];
foo?.();
```

👌 Examples of **correct** code for this rule:

<eslint-playground type="good" code="/*eslint es-roikoren/no-optional-chaining: error */
var x = a != null ? a.b : undefined
var x = a && a.b
var x = a != null ? a[b] : undefined
var x = a && a[b]
foo && foo()
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.3/src/rules/no-optional-chaining.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.3/tests/src/rules/no-optional-chaining.ts)
