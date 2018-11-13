const { wikitextToMarkdown, markdownToWikitext } = require('../src');

describe(`Tests on link markup`, () => {
  it(`should change link markup (simple case)`, () => {
    const wikiText = `[url text]`;
    const markdownText = '[text](url)';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change link markup (link in middle of text)`, () => {
    const wikiText = `Lorem ipsum [url text] dolor sit amet`;
    const markdownText = 'Lorem ipsum [text](url) dolor sit amet';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change link markup (text with many words)`, () => {
    const wikiText = `[url text with many words]`;
    const markdownText = '[text with many words](url)';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change link markup (link in middle of text with many words in text of link)`, () => {
    const wikiText = `Lorem ipsum [url text with many words] dolor sit amet`;
    const markdownText = 'Lorem ipsum [text with many words](url) dolor sit amet';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change link markup (two links)`, () => {
    const wikiText = `[url1 text1] and [url2 text2]`;
    const markdownText = '[text1](url1) and [text2](url2)';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change link markup (two links and more)`, () => {
    const wikiText = `[url1 text1] and [url2 text2] and [url3 text3] and [url4 text4]`;
    const markdownText = '[text1](url1) and [text2](url2) and [text3](url3) and [text4](url4)';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });

  it(`should change link markup (two links with text that contains many words)`, () => {
    const wikiText = `[url1 text with many words 1] and [url2 text with many words 2]`;
    const markdownText = '[text with many words 1](url1) and [text with many words 2](url2)';
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });
});
