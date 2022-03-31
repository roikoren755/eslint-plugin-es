# es-roikoren/no-class-static-block
> disallow class static block.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-esnext`

This rule reports ES2022 class static blocks as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-class-static-block: error */
class A {
  static {
    // ...
  }
}
const B = class {
  static {
    // ...
  }
};
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.6/src/rules/no-class-static-block.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.6/tests/src/rules/no-class-static-block.ts)
