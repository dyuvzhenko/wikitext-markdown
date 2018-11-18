const Converter = require('../../src');

module.exports = (wikiText, markdownText) => {
  const converter = new Converter();
  expect(converter.toMarkdown(wikiText)).toBe(markdownText);
  expect(converter.toWiki(markdownText)).toBe(wikiText);
}
