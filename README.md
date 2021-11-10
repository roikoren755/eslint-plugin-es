# eslint-plugin-es-roikoren

[![Test Status](https://github.com/roikoren755/eslint-plugin-es/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/roikoren755/eslint-plugin-es/actions/workflows/ci.yml?query=branch%3Amain)
[![codecov](https://codecov.io/gh/roikoren755/eslint-plugin-es/branch/main/graph/badge.svg?token=RF5L5KQQN6)](https://codecov.io/gh/roikoren755/eslint-plugin-es)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=roikoren755_eslint-plugin-es&metric=bugs)](https://sonarcloud.io/dashboard?id=roikoren755_eslint-plugin-es)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=roikoren755_eslint-plugin-es&metric=code_smells)](https://sonarcloud.io/dashboard?id=roikoren755_eslint-plugin-es)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=roikoren755_eslint-plugin-es&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=roikoren755_eslint-plugin-es)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=roikoren755_eslint-plugin-es&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=roikoren755_eslint-plugin-es)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=roikoren755_eslint-plugin-es&metric=security_rating)](https://sonarcloud.io/dashboard?id=roikoren755_eslint-plugin-es)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=roikoren755_eslint-plugin-es&metric=sqale_index)](https://sonarcloud.io/dashboard?id=roikoren755_eslint-plugin-es)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=roikoren755_eslint-plugin-es&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=roikoren755_eslint-plugin-es)

[![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/roikoren755/eslint-plugin-es)](https://app.snyk.io/org/roikoren755/project/fe8ed5b1-7498-4f48-abdc-132b863963e4)

[![npm](https://img.shields.io/npm/v/eslint-plugin-es-roikoren)](https://www.npmjs.com/package/eslint-plugin-es-roikoren)
[![NPM](https://img.shields.io/npm/l/eslint-plugin-es-roikoren)](https://www.npmjs.com/package/eslint-plugin-es-roikoren)
[![npm](https://img.shields.io/npm/dm/eslint-plugin-es-roikoren)](https://www.npmjs.com/package/eslint-plugin-es-roikoren)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/eslint-plugin-es-roikoren)](https://www.npmjs.com/package/eslint-plugin-es-roikoren)

[![GitHub issues](https://img.shields.io/github/issues-raw/roikoren755/eslint-plugin-es)](https://www.github.com/roikoren755/eslint-plugin-es)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/roikoren755/eslint-plugin-es)](https://www.github.com/roikoren755/eslint-plugin-es)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/roikoren755/eslint-plugin-es)](https://www.github.com/roikoren755/eslint-plugin-es)
[![Lines of code](https://img.shields.io/tokei/lines/github/roikoren755/eslint-plugin-es)](https://www.github.com/roikoren755/eslint-plugin-es)
[![GitHub top language](https://img.shields.io/github/languages/top/roikoren755/eslint-plugin-es)](https://www.github.com/roikoren755/eslint-plugin-es)

A re-implementation of `eslint-plugin-es` in TypeScript.

## Disclaimer
First off, I would like to deeply thank [@mistycatea](https://github.com/mysticatea) and everyone else involved in the original `eslin-plugin-es`. None of this would have been possible without them, and all credit should go to them.

This package is an attempt to migrate `eslint-config-es` to be written in TypeScript, and to use the great [`@typescript-eslint`](https://github.com/typescript-eslint) repository for plugin development.

Below is taken verbatim from [`eslint-plugin-es`](https://github.com/mysticatea/eslint-plugin-es), and will be updated as needed.

## 🏁 Goal

[Espree](https://github.com/eslint/espree#readme), the default parser of [ESLint](https://eslint.org/), has supported `ecmaVersion` option.
However, the error messages of new syntax are not readable (e.g., "unexpected token" or something like).

When we use this plugin along with the latest `ecmaVersion` option value, it tells us the readable error message for the new syntax, such as "ES2020 BigInt is forbidden."
Plus, this plugin lets us disable each syntactic feature individually.

## 💿 Installation

Use [npm](https://www.npmjs.com/) or a compatible tool.

```console
npm install --save-dev eslint eslint-plugin-es-roikoren

yarn add -D eslint eslint-plugin-es-roikoren
```

**IMPORTANT**

If you installed `eslint` globally, you should install this plugin in the same way.

::: tip Requirements
- Node.js `12.22.0` or newer.
- ESLint `5.16.0` or newer.
  :::

## 📖 Usage

Configure your `.eslintrc.*` file.

For example, to enable only Rest/Spread Properties in ES2018, as similar to legacy `experimentalObjectRestSpread` option:

```json
{
  "plugins": ["es-roikoren"],
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "es-roikoren/no-async-iteration": "error",
    "es-roikoren/no-malformed-template-literals": "error",
    "es-roikoren/no-regexp-lookbehind-assertions": "error",
    "es-roikoren/no-regexp-named-capture-groups": "error",
    "es-roikoren/no-regexp-s-flag": "error",
    "es-roikoren/no-regexp-unicode-property-escapes": "error"
  }
}
```

### Presets

This plugin provides the following configs.

| Config ID | Description |
|:----------|:------------|
| `plugin:es-roikoren/restrict-to-es2019` | disallow new stuff that ES2019 doesn't include.
| `plugin:es-roikoren/restrict-to-es2018` | disallow new stuff that ES2018 doesn't include.
| `plugin:es-roikoren/restrict-to-es2017` | disallow new stuff that ES2017 doesn't include.
| `plugin:es-roikoren/restrict-to-es2016` | disallow new stuff that ES2016 doesn't include.
| `plugin:es-roikoren/restrict-to-es2015` | disallow new stuff that ES2015 doesn't include.
| `plugin:es-roikoren/restrict-to-es5` | disallow new stuff that ES5 doesn't include.
| `plugin:es-roikoren/restrict-to-es3` | disallow new stuff that ES3 doesn't include.
| `plugin:es-roikoren/no-new-in-es2020` | disallow the new stuff in ES2020.
| `plugin:es-roikoren/no-new-in-es2019` | disallow the new stuff in ES2019.
| `plugin:es-roikoren/no-new-in-es2018` | disallow the new stuff in ES2018.
| `plugin:es-roikoren/no-new-in-es2017` | disallow the new stuff in ES2017.
| `plugin:es-roikoren/no-new-in-es2016` | disallow the new stuff in ES2016.
| `plugin:es-roikoren/no-new-in-es2015` | disallow the new stuff in ES2015.
| `plugin:es-roikoren/no-new-in-es5` | disallow the new stuff in ES5.
| `plugin:es-roikoren/no-new-in-esnext` | disallow the new stuff to be planned for the next yearly ECMAScript snapshot.<br>⚠️ This config will be changed in the minor versions of this plugin.

For example:

```json
{
  "parserOptions": {
    "ecmaVersion": 2021
  },
  "extends": [
    "eslint:recommended",
    "plugin:es-roikoren/restrict-to-es2018"
  ],
  "rules": {
    "es-roikoren/no-rest-spread-properties": "off"
  }
}
```

### The `aggressive` mode

This plugin never reports prototype methods by default. Because it's hard to know the type of objects, it will cause false positives.

If you configured the `aggressive` mode, this plugin reports prototype methods even if the rules couldn't know the type of objects.
For example:

`settings.es.aggressive = true` means the aggressive mode.
```json
{
  "plugins": ["es-roikoren"],
  "rules": {
    "es-roikoren/no-string-prototype-codepointat": "error"
  },

  "settings": {
    "es": { "aggressive": true }
  }
}
```

If using this plugin and TypeScript, this plugin reports prototype methods by default because we can easily know types.
For example:

```json
{
  "plugins": ["es-roikoren"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json"
  },
  "rules": {
    "es-roikoren/no-string-prototype-codepointat": "error"
  }
}
```

If you configured the `aggressive` mode, this plugin reports prototype methods on `any` types as well.
```json
{
  "plugins": ["es-roikoren"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json"
  },
  "rules": {
    "es-roikoren/no-string-prototype-codepointat": "error"
  },
  "settings": {
    "es": { "aggressive": true }
  }
}
```
