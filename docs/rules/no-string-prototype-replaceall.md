# es-roikoren/no-string-prototype-replaceall
> disallow the `String.prototype.replaceAll` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-esnext`

This rule reports ES2021 [`String.prototype.replaceAll` method](https://github.com/tc39/proposal-string-replaceall) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-roikoren/no-string-prototype-replaceall: [error, { aggressive: true }] */
foo.replaceAll(&quot;a&quot;, &quot;b&quot;)
" />

## 🔧 Options

This rule has an option.

```yml
rules:
  es-roikoren/no-string-prototype-replaceall: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings.es.aggressive` setting.

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.1/src/rules/no-string-prototype-replaceall.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.1/tests/src/rules/no-string-prototype-replaceall.ts)
