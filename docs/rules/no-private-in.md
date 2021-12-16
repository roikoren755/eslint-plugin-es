# es-roikoren/no-private-in
> disallow `#x in obj`.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-esnext`

This rule reports ES2022 private in (`#x in obj`) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-private-in: error */
class A {
  #x;
  fn() {
    var hasX = #x in obj;
  }
}
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.0/src/rules/no-private-in.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.0/tests/src/rules/no-private-in.ts)
