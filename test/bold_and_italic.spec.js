const { wikitextToMarkdown, markdownToWikitext } = require('../src');

describe(`Tests on bold and italic markup`, () => {
  it(`should change bold and italic markup (first word in sentence)`, () => {
    const wikiText = `'''''Lorem''''' ipsum dolor sit amet`;
    const markdownText = '***Lorem*** ipsum dolor sit amet';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change bold and italic markup (last word in sentence)`, () => {
    const wikiText = `Lorem ipsum dolor sit '''''amet'''''`;
    const markdownText = 'Lorem ipsum dolor sit ***amet***';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change bold and italic markup (any word in sentence)`, () => {
    const wikiText = `Lorem ipsum '''''dolor''''' sit amet`;
    const markdownText = 'Lorem ipsum ***dolor*** sit amet';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change bold and italic markup (part of the word in sentence)`, () => {
    const wikiText = `Lorem ipsum dol'''''or''''' sit amet`;
    const markdownText = 'Lorem ipsum dol***or*** sit amet';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change bold and italic markup (many words in sentence)`, () => {
    const wikiText = `'''''Lorem''''' ipsum '''''dolor''''' sit '''''amet'''''`;
    const markdownText = '***Lorem*** ipsum ***dolor*** sit ***amet***';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });
});
