# es-roikoren/no-exponential-operators
> disallow exponential operators.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2016`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, and `plugin:es-roikoren/restrict-to-es2015`

This rule reports ES2016 [exponential operators](https://github.com/rwaldron/exponentiation-operator#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-exponential-operators: error */
let a = b ** 2;
a **= b;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.7/src/rules/no-exponential-operators.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.7/tests/src/rules/no-exponential-operators.ts)
