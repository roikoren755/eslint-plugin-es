# es-roikoren/no-generators
> disallow generator function declarations.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 generator function declarations as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-generators: error */
function* f1() {}
const f2 = function*() {};
const obj = {
  *f3() {}
};
class A {
  *f4() {}
}
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.6/src/rules/no-generators.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.6/tests/src/rules/no-generators.ts)
