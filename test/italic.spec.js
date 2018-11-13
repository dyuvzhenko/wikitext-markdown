const { wikitextToMarkdown, markdownToWikitext } = require('../src');

describe(`Tests on italic markup`, () => {
  it(`should change italic markup (first word in sentence)`, () => {
    const wikiText = `''Lorem'' ipsum dolor sit amet`;
    const markdownText = '_Lorem_ ipsum dolor sit amet';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change italic markup (last word in sentence)`, () => {
    const wikiText = `Lorem ipsum dolor sit ''amet''`;
    const markdownText = 'Lorem ipsum dolor sit _amet_';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change italic markup (any word in sentence)`, () => {
    const wikiText = `Lorem ipsum ''dolor'' sit amet`;
    const markdownText = 'Lorem ipsum _dolor_ sit amet';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change italic markup (part of the word in sentence)`, () => {
    const wikiText = `Lorem ipsum dol''or'' sit amet`;
    const markdownText = 'Lorem ipsum dol_or_ sit amet';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change italic markup (many italic words in sentence)`, () => {
    const wikiText = `''Lorem'' ipsum ''dolor'' sit ''amet''`;
    const markdownText = '_Lorem_ ipsum _dolor_ sit _amet_';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });
});
