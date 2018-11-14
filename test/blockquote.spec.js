const { wikitextToMarkdown, markdownToWikitext } = require('../src'); // TODO: remove
const testTexts = require('./_testTexts');

describe(`Tests on blockquote markup`, () => {
  it(`should change blockquote markup (single)`, () => {
    const wikiText = `<blockquote>Lorem ipsum dolor sit amet</blockquote>`;
    const markdownText = '> Lorem ipsum dolor sit amet';
    testTexts(wikiText, markdownText);
  });

  it(`should change blockquote markup (blockquote with many newlines)`, () => {
    const wikiText = `<blockquote>\nLorem\nipsum\ndolor\nsit\namet\n</blockquote>`;
    const markdownText = '> Lorem\n> ipsum\n> dolor\n> sit\n> amet\n';
    // expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });

  it(`should change blockquote markup (blockquote with many newlines and one empty line)`, () => {
    const wikiText = `<blockquote>\nLorem\nipsum\ndolor\nsit\n\namet\n</blockquote>`;
    const markdownText = '> Lorem\n> ipsum\n> dolor\n> sit\n> \n> amet\n';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    // testTexts(wikiText, markdownText);
  });
});
