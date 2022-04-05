# es-roikoren/no-class-fields
> disallow class fields.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-esnext`

This rule reports class fields as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-class-fields: error */
class A {
  a = 0;
  #b = 0;

  #c() {}
  get #d() {}
  set #d(v) {}

  static e = 0;
  static #f = 0;
  static #g() {}
  static get #h() {}
  static set #h(v) {}

  fn () {
    this.#b++;
    A.#f++;
    this.#c();
    A.#g();
  }
}
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.8/src/rules/no-class-fields.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.8/tests/src/rules/no-class-fields.ts)
