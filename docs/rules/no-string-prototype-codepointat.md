# es-roikoren/no-string-prototype-codepointat
> disallow the `String.prototype.codePointAt` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `String.prototype.codePointAt` method as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-string-prototype-codepointat: [error, { aggressive: true }] */
foo.codePointAt(0);
```

## 🔧 Options

This rule has an option.

```yml
rules:
  es-roikoren/no-string-prototype-codepointat: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings.es.aggressive` setting.

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.0/src/rules/no-string-prototype-codepointat.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.0/tests/src/rules/no-string-prototype-codepointat.ts)
