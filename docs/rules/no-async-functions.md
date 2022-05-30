# es-roikoren/no-async-functions
> disallow async function declarations.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2017`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, and `plugin:es-roikoren/restrict-to-es2016`

This rule reports ES2017 [async functions](https://github.com/tc39/ecmascript-asyncawait) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-async-functions: error */
async function f1() {}
let f2 = async function() {};
let f3 = async () => {};
let obj = { async f4() {} };
class A { async f5() {} }
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v3.0.0/src/rules/no-async-functions.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v3.0.0/tests/src/rules/no-async-functions.ts)
