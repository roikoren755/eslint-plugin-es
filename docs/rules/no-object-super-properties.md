# es-roikoren/no-object-super-properties
> disallow `super` property accesses in object literals.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `super` property accesses in object literals as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-super-properties: error */
let a = {
  __proto__: obj,
  f1() { 
    super.a
  },
  f2() {
    super.f()
  },
};
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.6/src/rules/no-object-super-properties.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.6/tests/src/rules/no-object-super-properties.ts)
