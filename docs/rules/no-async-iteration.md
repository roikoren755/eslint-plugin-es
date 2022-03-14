# es-roikoren/no-async-iteration
> disallow async iteration.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2018`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, and `plugin:es-roikoren/restrict-to-es2017`

This rule reports ES2018 [async iteration](https://github.com/tc39/proposal-async-iteration#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-async-iteration: error */
async function* f1() {}
let f2 = async function*() {};
let obj = { async* f4() {} };
class A { async* f5() {} }

async function wrap() {
  for await (const x of xs) {}
}
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.3/src/rules/no-async-iteration.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.3/tests/src/rules/no-async-iteration.ts)
