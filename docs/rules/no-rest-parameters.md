# es-roikoren/no-rest-parameters
> disallow rest parameters.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 rest parameters as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-rest-parameters: error */
function f1(...args) {}
let f2 = function(...args) {};
let f3 = (...args) => {};
let obj = { f4(...args) {} };
class A { f5(...args) {} }
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0-alpha-20211010133854/src/rules/no-rest-parameters.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0-alpha-20211010133854/tests/src/rules/no-rest-parameters.ts)
