# es-roikoren/no-weakrefs
> disallow the `WeakRef` and `FinalizationRegistry` class.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2021`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, `plugin:es-roikoren/restrict-to-es2018`, `plugin:es-roikoren/restrict-to-es2019`, and `plugin:es-roikoren/restrict-to-es2020`

This rule reports ES2021 [WeakRefs](https://github.com/tc39/proposal-weakrefs) as errors.
This proposal includes the following two:

- `WeakRef` class
- `FinalizationRegistry` class

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-weakrefs: error */
let ref = new WeakRef();
let finalizationGroup = new FinalizationRegistry(() => {});
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.5/src/rules/no-weakrefs.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.5/tests/src/rules/no-weakrefs.ts)
