# es-roikoren/no-weakrefs
> disallow the `WeakRef` and `FinalizationRegistry` class.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-esnext`

This rule reports ES2021 [WeakRefs](https://github.com/tc39/proposal-weakrefs) as errors.
This proposal includes the following two:

- `WeakRef` class
- `FinalizationRegistry` class

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-roikoren/no-weakrefs: error */
let ref = new WeakRef()
let finalizationGroup = new FinalizationRegistry(() =&gt; {})
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.1/src/rules/no-weakrefs.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.1/tests/src/rules/no-weakrefs.ts)
