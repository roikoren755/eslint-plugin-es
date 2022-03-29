# es-roikoren/no-computed-properties
> disallow computed properties.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 computed properties as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-computed-properties: error */
const obj = {
  [a]: 1,
  [b]() {},
  get [c]() {},
  set [c](value) {},
};
class A {
  [a]() {}
}
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.5/src/rules/no-computed-properties.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.5/tests/src/rules/no-computed-properties.ts)
