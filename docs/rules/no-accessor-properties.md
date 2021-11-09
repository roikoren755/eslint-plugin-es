# es-roikoren/no-accessor-properties
> disallow accessor properties.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 accessor properties as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-roikoren/no-accessor-properties: error */
var a = {
    get a() {},
    set a(value) {}
}
class A {
    get a() {}
    set a(value) {}
}
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0/src/rules/no-accessor-properties.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0/tests/src/rules/no-accessor-properties.ts)
