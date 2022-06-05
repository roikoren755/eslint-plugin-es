# es-roikoren/no-property-shorthands
> disallow property shorthands.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2015 property shorthands as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-property-shorthands: error */
let obj = {
  a,
  b() {},
};
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v3.0.1/src/rules/no-property-shorthands.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v3.0.1/tests/src/rules/no-property-shorthands.ts)
