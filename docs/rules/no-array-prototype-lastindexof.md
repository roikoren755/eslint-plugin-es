# es-roikoren/no-array-prototype-lastindexof
> disallow the `Array.prototype.lastIndexOf` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Array.prototype.lastIndexOf` method as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-array-prototype-lastindexof: [error, { aggressive: true }] */
foo.lastIndexOf(0);
```

## 🔧 Options

This rule has an option.

```yml
rules:
  es-roikoren/no-array-prototype-lastindexof: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings.es.aggressive` setting.

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0-alpha-20211010133854/src/rules/no-array-prototype-lastindexof.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0-alpha-20211010133854/tests/src/rules/no-array-prototype-lastindexof.ts)
