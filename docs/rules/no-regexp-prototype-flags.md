# es-roikoren/no-regexp-prototype-flags
> disallow the `RegExp.prototype.flags` property.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `RegExp.prototype.flags` property as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-regexp-prototype-flags: [error, { aggressive: true }] */
/foo/u.flags;
new RegExp(pattern, flags).flags;
```

## 🔧 Options

This rule has an option.

```yml
rules:
  es-roikoren/no-regexp-prototype-flags: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings.es.aggressive` setting.

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.7/src/rules/no-regexp-prototype-flags.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.7/tests/src/rules/no-regexp-prototype-flags.ts)
