const defaultParseToMarkdown = require('./parse-rules/default/wikitext-to-markdown');
const defaultParseToWiki = require('./parse-rules/default/markdown-to-wikitext');

const htmlParseToMarkdown = require('./parse-rules/html/wikitext-to-markdown');
const htmlParseToWiki = require('./parse-rules/html/markdown-to-wikitext');

const presets = ['default', 'default-with-html'];

function checkPresetName(preset) {
  if (presets.indexOf(preset) === -1) {
    console.warn(`Invalid preset name ${preset}. Fallback to default`);
  }
}

function getRulesForParseWikitextToMarkdown(preset) {
  checkPresetName(preset);
  switch (preset) {
    case 'default-with-html':
      return [...defaultParseToMarkdown, ...htmlParseToMarkdown];
    default:
      return defaultParseToMarkdown;
  }
}

function getRulesForParseMarkdownToWikitext(preset) {
  checkPresetName(preset);
  switch (preset) {
    case 'default-with-html':
      return [...defaultParseToWiki, ...htmlParseToWiki];
    default:
      return defaultParseToWiki;
  }
}

module.exports = {
  getRulesForParseWikitextToMarkdown,
  getRulesForParseMarkdownToWikitext
}
