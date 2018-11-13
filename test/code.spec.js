const { wikitextToMarkdown, markdownToWikitext } = require('../src');

describe(`Tests on code markup`, () => {
  it(`should change code markup (first word in sentence)`, () => {
    const wikiText = `<code>Lorem</code> ipsum dolor sit amet`;
    const markdownText = '`Lorem` ipsum dolor sit amet';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change code markup (last word in sentence)`, () => {
    const wikiText = `Lorem ipsum dolor sit <code>amet</code>`;
    const markdownText = 'Lorem ipsum dolor sit `amet`';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change code markup (any word in sentence)`, () => {
    const wikiText = `Lorem ipsum <code>dolor</code> sit amet`;
    const markdownText = 'Lorem ipsum `dolor` sit amet';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change code markup (part of the word in sentence)`, () => {
    const wikiText = `Lorem ipsum dol<code>or</code> sit amet`;
    const markdownText = 'Lorem ipsum dol`or` sit amet';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change code markup (many code words in sentence)`, () => {
    const wikiText = `<code>Lorem</code> ipsum <code>dolor</code> sit <code>amet</code>`;
    const markdownText = '`Lorem` ipsum `dolor` sit `amet`';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });
});
