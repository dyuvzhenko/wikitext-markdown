const { wikitextToMarkdown, markdownToWikitext } = require('../src');
const testTexts = require('./utils/testTexts');

describe(`Tests on skip default parsing rules`, () => {
  it(`should not change ordered markup`, () => {
    const wikiText = '# Lorem ipsum dolor sit amet';
    const markdownText = '1. Lorem ipsum dolor sit amet';
    expect(wikitextToMarkdown(wikiText, { skipOrderedList: true })).toBe(wikiText);
    expect(markdownToWikitext(markdownText, { skipOrderedList: true })).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });

  it(`should not change unordered markup`, () => {
    const wikiText = '* Lorem ipsum dolor sit amet';
    const markdownText = '- Lorem ipsum dolor sit amet';
    expect(wikitextToMarkdown(wikiText, { skipUnorderedList: true })).toBe(wikiText);
    expect(markdownToWikitext(markdownText, { skipUnorderedList: true })).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });

  it(`should not change headings markup`, () => {
    const wikiText = '==Lorem ipsum dolor sit amet==';
    const markdownText = '## Lorem ipsum dolor sit amet';
    expect(wikitextToMarkdown(wikiText, { skipHeadings: true })).toBe(wikiText);
    expect(markdownToWikitext(markdownText, { skipHeadings: true })).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });

  it(`should not change code markup`, () => {
    const wikiText = '<code>Lorem ipsum dolor sit amet</code>';
    const markdownText = '\`Lorem ipsum dolor sit amet\`';
    expect(wikitextToMarkdown(wikiText, { skipCode: true })).toBe(wikiText);
    expect(markdownToWikitext(markdownText, { skipCode: true })).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });

  it(`should not change blockquote markup`, () => {
    const wikiText = '<blockquote>\nLorem ipsum dolor sit amet\n</blockquote>';
    const markdownText = '> Lorem ipsum dolor sit amet';
    expect(wikitextToMarkdown(wikiText, { skipBlockquote: true })).toBe(wikiText);
    expect(markdownToWikitext(markdownText, { skipBlockquote: true })).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });

  it(`should not change link markup`, () => {
    const wikiText = '[url text]';
    const markdownText = '[text](url)';
    expect(wikitextToMarkdown(wikiText, { skipLink: true })).toBe(wikiText);
    expect(markdownToWikitext(markdownText, { skipLink: true })).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });

  it(`should not change bold and italic markup`, () => {
    const wikiText = `'''Lorem''' ipsum ''dolor'' sit amet`;
    const markdownText = '**Lorem** ipsum _dolor_ sit amet';
    expect(wikitextToMarkdown(wikiText, { skipBoldAndItalic: true })).toBe(wikiText);
    expect(markdownToWikitext(markdownText, { skipBoldAndItalic: true })).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });
});
