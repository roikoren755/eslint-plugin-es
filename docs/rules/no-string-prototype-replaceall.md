# es-roikoren/no-string-prototype-replaceall
> disallow the `String.prototype.replaceAll` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2021`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, `plugin:es-roikoren/restrict-to-es2018`, `plugin:es-roikoren/restrict-to-es2019`, and `plugin:es-roikoren/restrict-to-es2020`

This rule reports ES2021 [`String.prototype.replaceAll` method](https://github.com/tc39/proposal-string-replaceall) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-string-prototype-replaceall: [error, { aggressive: true }] */
foo.replaceAll('a', 'b');
```

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

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.9/src/rules/no-string-prototype-replaceall.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.9/tests/src/rules/no-string-prototype-replaceall.ts)
