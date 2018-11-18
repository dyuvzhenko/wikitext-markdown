const Converter = require('../../new-src');

module.exports = (wikiText, markdownText) => {
  const converter = new Converter({ preset: 'default-with-html' });
  expect(converter.toMarkdown(wikiText)).toBe(markdownText);
  expect(converter.toWiki(markdownText)).toBe(wikiText);
}
