import { readFileSync, readdirSync, writeFileSync } from 'fs';
import path from 'path';
import type { ICategory, IRule } from './rules';
import { categories } from './rules';

const collator = new Intl.Collator('en', { numeric: true });

const extractCategoryId = (filePath: string): string => {
  const basename = path.basename(filePath, '.ts');
  const match = /no-new-in-(es(?:\d+|next))/u.exec(basename);

  return match?.[1].toUpperCase() ?? '';
};

/**
 * Format a list.
 * @param {string[]} xs The list value to format.
 */
export const formatList = (xs: string[]): string => {
  switch (xs.length) {
    case 0:
      return '';
    case 1:
      return xs[0];
    case 2:
      return `${xs[0]} and ${xs[1]}`;
    default: {
      const ys = xs.slice(0, -1);
      const last = xs[xs.length - 1];

      return `${ys.join(', ')}, and ${last}`;
    }
  }
};

interface IConfig {
  id: string;
  categoryIds: string[];
  kind: 'not-new-in' | 'restrict-to';
  es: string;
}

// Analyze configs
const configRoot = path.resolve(__dirname, '../src/configs/');
const configs = readdirSync(configRoot).map<IConfig>((filename) => {
  const id = `plugin:es-roikoren/${path.basename(filename, '.ts')}`;
  const configFile = path.join(configRoot, filename);
  const kind = filename.startsWith('no-new-in-') ? 'not-new-in' : 'restrict-to';
  const categoryId = extractCategoryId(configFile);
  const categoryIds = [
    ...(kind === 'not-new-in' ? [categoryId] : []),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    ...((require(configFile) as { default: { extends?: string[] } }).default.extends ?? []).map((filePath) =>
      extractCategoryId(filePath),
    ),
  ].filter(Boolean);

  return { id, categoryIds, kind, es: categoryId.slice(2) || id.slice(id.lastIndexOf('es') + 2) };
});

/**
 * Create markdown text for a rule.
 * @param {IRule} rule The rule information to convert.
 */
const toTableRow = ({ ruleId, description, fixable }: IRule): string => {
  const title = `[es-roikoren/${ruleId}](./${ruleId}.md)`;
  const icons = fixable ? '🔧' : '';

  return `| ${title} | ${description} | ${icons} |`;
};

/**
 * Create markdown text for a category.
 * @param {ICategory} category The category information to convert.
 */
const toTable = ({ rules }: ICategory): string => {
  if (rules.length === 0) {
    return '⚠️ No rules yet. It will be added in the future.';
  }

  return `| Rule ID | Description |    |
|:--------|:------------|:--:|
${rules.map((rule) => toTableRow(rule)).join('\n')}`;
};

/**
 * Create markdown text for a category.
 * @param {string} categoryId The category ID to convert.
 */
const toSection = (categoryId: string): string => {
  const configIds = formatList(
    configs
      .filter((c) => c.categoryIds.includes(categoryId))
      .map((c) => `\`${c.id}\``)
      .sort(collator.compare.bind(collator)),
  );
  const comment = configIds
    ? `There are multiple configs that enable all rules in this category: ${configIds}`
    : 'There is a config that enables the rules in this category: `plugin:es-roikoren/no-new-in-esnext`';

  return `## ${categoryId}

${comment}

${toTable(categories[categoryId])}
`;
};

// Convert categories to rules/README sections
const ruleSectionContent = Object.keys(categories)
  .map((category) => toSection(category))
  .join('\n');

// Write rules/README.md
writeFileSync(
  'docs/rules/README.md',
  `# Available Rules

This plugin provides the following rules.

- 🔧 mark means that the \`--fix\` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by the rule.

${ruleSectionContent}
`,
);

const compareConfigId = (a: IConfig, b: IConfig): number => {
  if (a.kind !== b.kind) {
    if (a.kind === 'restrict-to') {
      return -1;
    }

    return 1;
  }

  if (a.es === b.es) {
    return 0;
  }

  if (a.es === 'NEXT') {
    return 1;
  }

  if (b.es === 'NEXT') {
    return -1;
  }

  return Number(b.es) - Number(a.es);
};

/**
 * Create markdown table row for a config.
 * @param {IConfig} config The config to convert.
 * @return string The table row for the config.
 */
const toPresetConfigTableRow = (config: IConfig): string => {
  let description = `disallow the new stuff in ES${config.es}.`;

  if (config.kind === 'restrict-to') {
    description = `disallow new stuff that ES${config.es} doesn't include.`;
  } else if (config.es === 'NEXT') {
    description =
      'disallow the new stuff to be planned for the next yearly ECMAScript snapshot.<br>⚠️ This config will be changed in the minor versions of this plugin.';
  }

  return `| \`${config.id}\` | ${description} |`;
};

// Convert categories to README presets table
const presetsTableContent = `| Config ID | Description |
|:----------|:------------|
${configs
  .sort(compareConfigId)
  .map((config) => toPresetConfigTableRow(config))
  .join('\n')}`;

// Write README.md
writeFileSync(
  'docs/README.md',
  readFileSync('docs/README.md', 'utf-8').replace(
    /<!--\s*PRESETS_TABLE_START\s*-->[\s\S]*?<!--\s*PRESETS_TABLE_END\s*-->/u,
    `<!-- PRESETS_TABLE_START -->
${presetsTableContent}
<!-- PRESETS_TABLE_END -->`,
  ),
);
