# es-roikoren/no-block-scoped-variables
> disallow block-scoped variable declarations.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 block-scoped variable declarations as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-block-scoped-variables: error */
let a = 1;
const b = 2;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.4/src/rules/no-block-scoped-variables.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.4/tests/src/rules/no-block-scoped-variables.ts)
