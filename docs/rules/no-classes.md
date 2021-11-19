# es-roikoren/no-classes
> disallow class declarations.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 class declarations as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-classes: error */
class A {}
const B = class {};
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.5/src/rules/no-classes.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.5/tests/src/rules/no-classes.ts)
