const { wikitextToMarkdown, markdownToWikitext } = require('../src');

describe(`Heading tests (wiki to markdown)`, () => {
  it(`should change bold markup (first word in sentence)`, () => {
    const wikiText = `''Lorem'' ipsum dolor sit amet`;
    const markdownText = '_Lorem_ ipsum dolor sit amet';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change bold markup (last word in sentence)`, () => {
    const wikiText = `Lorem ipsum dolor sit ''amet''`;
    const markdownText = 'Lorem ipsum dolor sit _amet_';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change bold markup (any word in sentence)`, () => {
    const wikiText = `Lorem ipsum ''dolor'' sit amet`;
    const markdownText = 'Lorem ipsum _dolor_ sit amet';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change bold markup (part of the word in sentence)`, () => {
    const wikiText = `Lorem ipsum dol''or'' sit amet`;
    const markdownText = 'Lorem ipsum dol_or_ sit amet';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change bold markup (many bold words in sentence)`, () => {
    const wikiText = `''Lorem'' ipsum ''dolor'' sit ''amet''`;
    const markdownText = '_Lorem_ ipsum _dolor_ sit _amet_';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });
});
