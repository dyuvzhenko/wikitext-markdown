const testTexts = require('../_utils/testTexts');
const Converter = require('../../src');

describe(`Tests on skip default parsing rules (single rule)`, () => {
  it(`should not change ordered markup`, () => {
    const wikiText = '# Lorem ipsum dolor sit amet';
    const markdownText = '1. Lorem ipsum dolor sit amet';
    const converter = new Converter({ skip: ['orderedList'] });

    expect(converter.toMarkdown(wikiText)).toBe(wikiText);
    expect(converter.toWiki(markdownText)).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });

  it(`should not change unordered markup`, () => {
    const wikiText = '* Lorem ipsum dolor sit amet';
    const markdownText = '- Lorem ipsum dolor sit amet';
    const converter = new Converter({ skip: ['unorderedList'] });

    expect(converter.toMarkdown(wikiText)).toBe(wikiText);
    expect(converter.toWiki(markdownText)).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });

  it(`should not change headings markup`, () => {
    const wikiText = '==Lorem ipsum dolor sit amet==';
    const markdownText = '## Lorem ipsum dolor sit amet';
    const converter = new Converter({ skip: ['headings'] });

    expect(converter.toMarkdown(wikiText)).toBe(wikiText);
    expect(converter.toWiki(markdownText)).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });

  it(`should not change code markup`, () => {
    const wikiText = '<code>Lorem ipsum dolor sit amet</code>';
    const markdownText = '\`Lorem ipsum dolor sit amet\`';
    const converter = new Converter({ skip: ['code'] });

    expect(converter.toMarkdown(wikiText)).toBe(wikiText);
    expect(converter.toWiki(markdownText)).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });

  it(`should not change blockquote markup`, () => {
    const wikiText = '<blockquote>\nLorem ipsum dolor sit amet\n</blockquote>';
    const markdownText = '> Lorem ipsum dolor sit amet';
    const converter = new Converter({ skip: ['blockquote'] });

    expect(converter.toMarkdown(wikiText)).toBe(wikiText);
    expect(converter.toWiki(markdownText)).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });

  it(`should not change link markup`, () => {
    const wikiText = '[url text]';
    const markdownText = '[text](url)';
    const converter = new Converter({ skip: ['link'] });

    expect(converter.toMarkdown(wikiText)).toBe(wikiText);
    expect(converter.toWiki(markdownText)).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });

  it(`should not change bold and italic markup`, () => {
    const wikiText = `'''Lorem''' ipsum ''dolor'' sit amet`;
    const markdownText = '**Lorem** ipsum _dolor_ sit amet';
    const converter = new Converter({ skip: ['boldAndItalic', 'bold', 'italic'] });

    expect(converter.toMarkdown(wikiText)).toBe(wikiText);
    expect(converter.toWiki(markdownText)).toBe(markdownText);
    testTexts(wikiText, markdownText);
  });
});
