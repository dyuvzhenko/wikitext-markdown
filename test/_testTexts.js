const { wikitextToMarkdown, markdownToWikitext } = require('../src');

module.exports = (wikiText, markdownText) => {
  expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
  expect(markdownToWikitext(markdownText)).toBe(wikiText);
}
