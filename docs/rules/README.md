# Available Rules

This plugin provides the following rules.

- 🔧 mark means that the `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by the rule.

## ES2021

There is a config that enables the rules in this category: `plugin:es-roikoren/no-new-in-esnext`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-roikoren/no-logical-assignment-operators](./no-logical-assignment-operators.md) | disallow logical assignment operators. | 🔧 |
| [es-roikoren/no-numeric-separators](./no-numeric-separators.md) | disallow numeric separators. | 🔧 |
| [es-roikoren/no-promise-any](./no-promise-any.md) | disallow `Promise.any` function and `AggregateError` class. |  |
| [es-roikoren/no-string-prototype-replaceall](./no-string-prototype-replaceall.md) | disallow the `String.prototype.replaceAll` method. |  |
| [es-roikoren/no-weakrefs](./no-weakrefs.md) | disallow the `WeakRef` and `FinalizationRegistry` class. |  |

## ES2020

There are multiple configs that enable all rules in this category: `plugin:es-roikoren/no-new-in-es2020`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, `plugin:es-roikoren/restrict-to-es2018`, and `plugin:es-roikoren/restrict-to-es2019`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-roikoren/no-bigint](./no-bigint.md) | disallow `bigint` syntax and built-ins. |  |
| [es-roikoren/no-dynamic-import](./no-dynamic-import.md) | disallow `import()` syntax. |  |
| [es-roikoren/no-export-ns-from](./no-export-ns-from.md) | disallow `export * as ns`. |  |
| [es-roikoren/no-global-this](./no-global-this.md) | disallow the `globalThis` variable. |  |
| [es-roikoren/no-import-meta](./no-import-meta.md) | disallow `import.meta` meta property. |  |
| [es-roikoren/no-nullish-coalescing-operators](./no-nullish-coalescing-operators.md) | disallow nullish coalescing operators. |  |
| [es-roikoren/no-optional-chaining](./no-optional-chaining.md) | disallow optional chaining. |  |
| [es-roikoren/no-promise-all-settled](./no-promise-all-settled.md) | disallow `Promise.allSettled` function. |  |
| [es-roikoren/no-string-prototype-matchall](./no-string-prototype-matchall.md) | disallow the `String.prototype.matchAll` method. |  |

## ES2019

There are multiple configs that enable all rules in this category: `plugin:es-roikoren/no-new-in-es2019`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, and `plugin:es-roikoren/restrict-to-es2018`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-roikoren/no-array-prototype-flat](./no-array-prototype-flat.md) | disallow the `Array.prototype.{flat,flatMap}` method. |  |
| [es-roikoren/no-json-superset](./no-json-superset.md) | disallow `\u2028` and `\u2029` in string literals. | 🔧 |
| [es-roikoren/no-object-fromentries](./no-object-fromentries.md) | disallow the `Object.fromEntries` method. |  |
| [es-roikoren/no-optional-catch-binding](./no-optional-catch-binding.md) | disallow optional `catch` binding. |  |
| [es-roikoren/no-regexp-unicode-property-escapes-2019](./no-regexp-unicode-property-escapes-2019.md) | disallow the new values of RegExp Unicode property escape sequences in ES2019. |  |
| [es-roikoren/no-string-prototype-trimstart-trimend](./no-string-prototype-trimstart-trimend.md) | disallow the `String.prototype.{trimStart,trimEnd}` methods. |  |
| [es-roikoren/no-symbol-prototype-description](./no-symbol-prototype-description.md) | disallow the `Symbol.prototype.description` property. |  |

## ES2018

There are multiple configs that enable all rules in this category: `plugin:es-roikoren/no-new-in-es2018`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, and `plugin:es-roikoren/restrict-to-es2017`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-roikoren/no-async-iteration](./no-async-iteration.md) | disallow async iteration. |  |
| [es-roikoren/no-malformed-template-literals](./no-malformed-template-literals.md) | disallow template literals with invalid escape sequences. |  |
| [es-roikoren/no-promise-prototype-finally](./no-promise-prototype-finally.md) | disallow the `Promise.prototype.finally` method. |  |
| [es-roikoren/no-regexp-lookbehind-assertions](./no-regexp-lookbehind-assertions.md) | disallow RegExp lookbehind assertions. |  |
| [es-roikoren/no-regexp-named-capture-groups](./no-regexp-named-capture-groups.md) | disallow RegExp named capture groups. |  |
| [es-roikoren/no-regexp-s-flag](./no-regexp-s-flag.md) | disallow RegExp `s` flag. |  |
| [es-roikoren/no-regexp-unicode-property-escapes](./no-regexp-unicode-property-escapes.md) | disallow RegExp Unicode property escape sequences. |  |
| [es-roikoren/no-rest-spread-properties](./no-rest-spread-properties.md) | disallow rest/spread properties. |  |

## ES2017

There are multiple configs that enable all rules in this category: `plugin:es-roikoren/no-new-in-es2017`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, and `plugin:es-roikoren/restrict-to-es2016`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-roikoren/no-async-functions](./no-async-functions.md) | disallow async function declarations. |  |
| [es-roikoren/no-atomics](./no-atomics.md) | disallow the `Atomics` class. |  |
| [es-roikoren/no-object-entries](./no-object-entries.md) | disallow the `Object.entries` method. |  |
| [es-roikoren/no-object-getownpropertydescriptors](./no-object-getownpropertydescriptors.md) | disallow the `Object.getOwnPropertyDescriptors` method. |  |
| [es-roikoren/no-object-values](./no-object-values.md) | disallow the `Object.values` method. |  |
| [es-roikoren/no-shared-array-buffer](./no-shared-array-buffer.md) | disallow the `SharedArrayBuffer` class. |  |
| [es-roikoren/no-string-prototype-padstart-padend](./no-string-prototype-padstart-padend.md) | disallow the `String.prototype.{padStart,padEnd}` methods. |  |
| [es-roikoren/no-trailing-function-commas](./no-trailing-function-commas.md) | disallow trailing commas in parameter/argument lists. | 🔧 |

## ES2016

There are multiple configs that enable all rules in this category: `plugin:es-roikoren/no-new-in-es2016`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, and `plugin:es-roikoren/restrict-to-es2015`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-roikoren/no-array-prototype-includes](./no-array-prototype-includes.md) | disallow the `Array.prototype.includes` method. |  |
| [es-roikoren/no-exponential-operators](./no-exponential-operators.md) | disallow exponential operators. |  |

## ES2015

There are multiple configs that enable all rules in this category: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-roikoren/no-array-from](./no-array-from.md) | disallow the `Array.from` method. |  |
| [es-roikoren/no-array-of](./no-array-of.md) | disallow the `Array.of` method. |  |
| [es-roikoren/no-array-prototype-copywithin](./no-array-prototype-copywithin.md) | disallow the `Array.prototype.copyWithin` method. |  |
| [es-roikoren/no-array-prototype-entries](./no-array-prototype-entries.md) | disallow the `Array.prototype.entries` method. |  |
| [es-roikoren/no-array-prototype-fill](./no-array-prototype-fill.md) | disallow the `Array.prototype.fill` method. |  |
| [es-roikoren/no-array-prototype-find](./no-array-prototype-find.md) | disallow the `Array.prototype.find` method. |  |
| [es-roikoren/no-array-prototype-findindex](./no-array-prototype-findindex.md) | disallow the `Array.prototype.findIndex` method. |  |
| [es-roikoren/no-array-prototype-keys](./no-array-prototype-keys.md) | disallow the `Array.prototype.keys` method. |  |
| [es-roikoren/no-array-prototype-values](./no-array-prototype-values.md) | disallow the `Array.prototype.values` method. |  |
| [es-roikoren/no-arrow-functions](./no-arrow-functions.md) | disallow arrow function expressions. | 🔧 |
| [es-roikoren/no-binary-numeric-literals](./no-binary-numeric-literals.md) | disallow binary numeric literals. |  |
| [es-roikoren/no-block-scoped-functions](./no-block-scoped-functions.md) | disallow block-scoped function declarations. |  |
| [es-roikoren/no-block-scoped-variables](./no-block-scoped-variables.md) | disallow block-scoped variable declarations. |  |
| [es-roikoren/no-classes](./no-classes.md) | disallow class declarations. |  |
| [es-roikoren/no-computed-properties](./no-computed-properties.md) | disallow computed properties. |  |
| [es-roikoren/no-default-parameters](./no-default-parameters.md) | disallow default parameters. |  |
| [es-roikoren/no-destructuring](./no-destructuring.md) | disallow destructuring. |  |
| [es-roikoren/no-for-of-loops](./no-for-of-loops.md) | disallow `for-of` statements. |  |
| [es-roikoren/no-generators](./no-generators.md) | disallow generator function declarations. |  |
| [es-roikoren/no-map](./no-map.md) | disallow the `Map` class. |  |
| [es-roikoren/no-math-acosh](./no-math-acosh.md) | disallow the `Math.acosh` method. |  |
| [es-roikoren/no-math-asinh](./no-math-asinh.md) | disallow the `Math.asinh` method. |  |
| [es-roikoren/no-math-atanh](./no-math-atanh.md) | disallow the `Math.atanh` method. |  |
| [es-roikoren/no-math-cbrt](./no-math-cbrt.md) | disallow the `Math.cbrt` method. |  |
| [es-roikoren/no-math-clz32](./no-math-clz32.md) | disallow the `Math.clz32` method. |  |
| [es-roikoren/no-math-cosh](./no-math-cosh.md) | disallow the `Math.cosh` method. |  |
| [es-roikoren/no-math-expm1](./no-math-expm1.md) | disallow the `Math.expm1` method. |  |
| [es-roikoren/no-math-fround](./no-math-fround.md) | disallow the `Math.fround` method. |  |
| [es-roikoren/no-math-hypot](./no-math-hypot.md) | disallow the `Math.hypot` method. |  |
| [es-roikoren/no-math-imul](./no-math-imul.md) | disallow the `Math.imul` method. |  |
| [es-roikoren/no-math-log10](./no-math-log10.md) | disallow the `Math.log10` method. |  |
| [es-roikoren/no-math-log1p](./no-math-log1p.md) | disallow the `Math.log1p` method. |  |
| [es-roikoren/no-math-log2](./no-math-log2.md) | disallow the `Math.log2` method. |  |
| [es-roikoren/no-math-sign](./no-math-sign.md) | disallow the `Math.sign` method. |  |
| [es-roikoren/no-math-sinh](./no-math-sinh.md) | disallow the `Math.sinh` method. |  |
| [es-roikoren/no-math-tanh](./no-math-tanh.md) | disallow the `Math.tanh` method. |  |
| [es-roikoren/no-math-trunc](./no-math-trunc.md) | disallow the `Math.trunc` method. |  |
| [es-roikoren/no-modules](./no-modules.md) | disallow modules. |  |
| [es-roikoren/no-new-target](./no-new-target.md) | disallow `new.target` meta property. |  |
| [es-roikoren/no-number-epsilon](./no-number-epsilon.md) | disallow the `Number.EPSILON` property. |  |
| [es-roikoren/no-number-isfinite](./no-number-isfinite.md) | disallow the `Number.isFinite` property. |  |
| [es-roikoren/no-number-isinteger](./no-number-isinteger.md) | disallow the `Number.isInteger` property. |  |
| [es-roikoren/no-number-isnan](./no-number-isnan.md) | disallow the `Number.isNaN` property. |  |
| [es-roikoren/no-number-issafeinteger](./no-number-issafeinteger.md) | disallow the `Number.isSafeInteger` property. |  |
| [es-roikoren/no-number-maxsafeinteger](./no-number-maxsafeinteger.md) | disallow the `Number.MAX_SAFE_INTEGER` property. |  |
| [es-roikoren/no-number-minsafeinteger](./no-number-minsafeinteger.md) | disallow the `Number.MIN_SAFE_INTEGER` property. |  |
| [es-roikoren/no-number-parsefloat](./no-number-parsefloat.md) | disallow the `Number.parseFloat` property. |  |
| [es-roikoren/no-number-parseint](./no-number-parseint.md) | disallow the `Number.parseInt` property. |  |
| [es-roikoren/no-object-assign](./no-object-assign.md) | disallow the `Object.assign` method. |  |
| [es-roikoren/no-object-getownpropertysymbols](./no-object-getownpropertysymbols.md) | disallow the `Object.getOwnPropertySymbols` method. |  |
| [es-roikoren/no-object-is](./no-object-is.md) | disallow the `Object.is` method. |  |
| [es-roikoren/no-object-setprototypeof](./no-object-setprototypeof.md) | disallow the `Object.setPrototypeOf` method. |  |
| [es-roikoren/no-object-super-properties](./no-object-super-properties.md) | disallow `super` property accesses in object literals. |  |
| [es-roikoren/no-octal-numeric-literals](./no-octal-numeric-literals.md) | disallow octal numeric literals. |  |
| [es-roikoren/no-promise](./no-promise.md) | disallow the `Promise` class. |  |
| [es-roikoren/no-property-shorthands](./no-property-shorthands.md) | disallow property shorthands. | 🔧 |
| [es-roikoren/no-proxy](./no-proxy.md) | disallow the `Proxy` class. |  |
| [es-roikoren/no-reflect](./no-reflect.md) | disallow the `Reflect` class. |  |
| [es-roikoren/no-regexp-prototype-flags](./no-regexp-prototype-flags.md) | disallow the `RegExp.prototype.flags` property. |  |
| [es-roikoren/no-regexp-u-flag](./no-regexp-u-flag.md) | disallow RegExp `u` flag. |  |
| [es-roikoren/no-regexp-y-flag](./no-regexp-y-flag.md) | disallow RegExp `y` flag. |  |
| [es-roikoren/no-rest-parameters](./no-rest-parameters.md) | disallow rest parameters. |  |
| [es-roikoren/no-set](./no-set.md) | disallow the `Set` class. |  |
| [es-roikoren/no-spread-elements](./no-spread-elements.md) | disallow spread elements. |  |
| [es-roikoren/no-string-fromcodepoint](./no-string-fromcodepoint.md) | disallow the `String.fromCodePoint` method. |  |
| [es-roikoren/no-string-prototype-codepointat](./no-string-prototype-codepointat.md) | disallow the `String.prototype.codePointAt` method. |  |
| [es-roikoren/no-string-prototype-endswith](./no-string-prototype-endswith.md) | disallow the `String.prototype.endsWith` method. |  |
| [es-roikoren/no-string-prototype-includes](./no-string-prototype-includes.md) | disallow the `String.prototype.includes` method. |  |
| [es-roikoren/no-string-prototype-normalize](./no-string-prototype-normalize.md) | disallow the `String.prototype.normalize` method. |  |
| [es-roikoren/no-string-prototype-repeat](./no-string-prototype-repeat.md) | disallow the `String.prototype.repeat` method. |  |
| [es-roikoren/no-string-prototype-startswith](./no-string-prototype-startswith.md) | disallow the `String.prototype.startsWith` method. |  |
| [es-roikoren/no-string-raw](./no-string-raw.md) | disallow the `String.raw` method. |  |
| [es-roikoren/no-subclassing-builtins](./no-subclassing-builtins.md) | disallow the subclassing of the built-in classes. |  |
| [es-roikoren/no-symbol](./no-symbol.md) | disallow the `Symbol` class. |  |
| [es-roikoren/no-template-literals](./no-template-literals.md) | disallow template literals. | 🔧 |
| [es-roikoren/no-typed-arrays](./no-typed-arrays.md) | disallow ES2015 typed arrays. |  |
| [es-roikoren/no-unicode-codepoint-escapes](./no-unicode-codepoint-escapes.md) | disallow Unicode code point escape sequences. | 🔧 |
| [es-roikoren/no-weak-map](./no-weak-map.md) | disallow the `WeakMap` class. |  |
| [es-roikoren/no-weak-set](./no-weak-set.md) | disallow the `WeakSet` class. |  |

## ES5

There are multiple configs that enable all rules in this category: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-roikoren/no-accessor-properties](./no-accessor-properties.md) | disallow accessor properties. |  |
| [es-roikoren/no-array-isarray](./no-array-isarray.md) | disallow the `Array.isArray` method. |  |
| [es-roikoren/no-array-prototype-every](./no-array-prototype-every.md) | disallow the `Array.prototype.every` method. |  |
| [es-roikoren/no-array-prototype-filter](./no-array-prototype-filter.md) | disallow the `Array.prototype.filter` method. |  |
| [es-roikoren/no-array-prototype-foreach](./no-array-prototype-foreach.md) | disallow the `Array.prototype.forEach` method. |  |
| [es-roikoren/no-array-prototype-indexof](./no-array-prototype-indexof.md) | disallow the `Array.prototype.indexOf` method. |  |
| [es-roikoren/no-array-prototype-lastindexof](./no-array-prototype-lastindexof.md) | disallow the `Array.prototype.lastIndexOf` method. |  |
| [es-roikoren/no-array-prototype-map](./no-array-prototype-map.md) | disallow the `Array.prototype.map` method. |  |
| [es-roikoren/no-array-prototype-reduce](./no-array-prototype-reduce.md) | disallow the `Array.prototype.reduce` method. |  |
| [es-roikoren/no-array-prototype-reduceright](./no-array-prototype-reduceright.md) | disallow the `Array.prototype.reduceRight` method. |  |
| [es-roikoren/no-array-prototype-some](./no-array-prototype-some.md) | disallow the `Array.prototype.some` method. |  |
| [es-roikoren/no-date-now](./no-date-now.md) | disallow the `Date.now` method. |  |
| [es-roikoren/no-json](./no-json.md) | disallow the `JSON` class. |  |
| [es-roikoren/no-keyword-properties](./no-keyword-properties.md) | disallow reserved words as property names. |  |
| [es-roikoren/no-object-create](./no-object-create.md) | disallow the `Object.create` method |  |
| [es-roikoren/no-object-defineproperties](./no-object-defineproperties.md) | disallow the `Object.defineProperties` method. |  |
| [es-roikoren/no-object-defineproperty](./no-object-defineproperty.md) | disallow the `Object.defineProperty` method. |  |
| [es-roikoren/no-object-freeze](./no-object-freeze.md) | disallow the `Object.freeze` method. |  |
| [es-roikoren/no-object-getownpropertydescriptor](./no-object-getownpropertydescriptor.md) | disallow the `Object.getOwnPropertyDescriptor` method. |  |
| [es-roikoren/no-object-getownpropertynames](./no-object-getownpropertynames.md) | disallow the `Object.getOwnPropertyNames` method. |  |
| [es-roikoren/no-object-getprototypeof](./no-object-getprototypeof.md) | disallow the `Object.getPrototypeOf` method. |  |
| [es-roikoren/no-object-isextensible](./no-object-isextensible.md) | disallow the `Object.isExtensible` method. |  |
| [es-roikoren/no-object-isfrozen](./no-object-isfrozen.md) | disallow the `Object.isFrozen` method. |  |
| [es-roikoren/no-object-issealed](./no-object-issealed.md) | disallow the `Object.isSealed` method. |  |
| [es-roikoren/no-object-keys](./no-object-keys.md) | disallow the `Object.keys` method. |  |
| [es-roikoren/no-object-preventextensions](./no-object-preventextensions.md) | disallow the `Object.preventExtensions` method. |  |
| [es-roikoren/no-object-seal](./no-object-seal.md) | disallow the `Object.seal` method. |  |
| [es-roikoren/no-string-prototype-trim](./no-string-prototype-trim.md) | disallow the `String.prototype.trim` method. |  |
| [es-roikoren/no-trailing-commas](./no-trailing-commas.md) | disallow trailing commas in array/object literals. |  |

