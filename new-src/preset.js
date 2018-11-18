const defaultParseToMarkdown = require('./parse-rules/default/wikitext-to-markdown');
const defaultParseToWiki = require('./parse-rules/default/markdown-to-wikitext');

const htmlParseToMarkdown = require('./parse-rules/html/wikitext-to-markdown');
const htmlParseToWiki = require('./parse-rules/html/markdown-to-wikitext');

function getRulesForParseWikitextToMarkdown(preset) {
  return preset === 'default' ? defaultParseToMarkdown :
    preset === 'default-with-html' ? [...defaultParseToMarkdown, ...htmlParseToMarkdown] :
      [] /* no rules for wrong preset name */
}

function getRulesForParseMarkdownToWikitext(preset) {
  return preset === 'default' ? defaultParseToWiki :
    preset === 'default-with-html' ? [...defaultParseToWiki, ...htmlParseToWiki] :
      [] /* no rules for wrong preset name */
}

module.exports = {
  getRulesForParseWikitextToMarkdown,
  getRulesForParseMarkdownToWikitext
}
