# es-roikoren/no-trailing-commas
> disallow trailing commas in array/object literals.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 trailing commas in array/object literals as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-trailing-commas: error */
var a = [1, 2,];
var b = { x: 1, y: 2, };
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.8/src/rules/no-trailing-commas.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.8/tests/src/rules/no-trailing-commas.ts)
