const Converter = require('../../../src');

const MAX_LEVEL_HEADING = 6;

describe('Tests on heading markup (wiki to markdown)', () => {
  const converter = new Converter();

  it('should change heading (without one space after and before heading text)', () => {
    for (let i = 1; i <= MAX_LEVEL_HEADING; i++) {
      const wikiText = '='.repeat(i) + `Heading ${i}` + '='.repeat(i); // `===Heading 3===`
      const markdownText = '#'.repeat(i) + ' ' + `Heading ${i}`; // `### Heading 3`
      expect(converter.toMarkdown(wikiText)).toBe(markdownText);
    }
  });

  it('should change heading (with many words)', () => {
    for (let i = 1; i <= MAX_LEVEL_HEADING; i++) {
      const wikiText = '='.repeat(i) + `Heading with many words ${i}` + '='.repeat(i); // `===Heading with many words 3===`
      const markdownText = '#'.repeat(i) + ' ' + `Heading with many words ${i}`; // `### Heading with many words 3`
      expect(converter.toMarkdown(wikiText)).toBe(markdownText);
    }
  });

  it('should change heading (with one space after and before heading text)', () => {
    for (let i = 1; i <= MAX_LEVEL_HEADING; i++) {
      const wikiText = '='.repeat(i) + ' ' + `Heading ${i}` + ' ' + '='.repeat(i); // `=== Heading 3 ===`
      const markdownText = '#'.repeat(i) + ' ' + `Heading ${i}`; // `### Heading 3`
      expect(converter.toMarkdown(wikiText)).toBe(markdownText);
    }
  });

  it('should change heading (with one space before heading text)', () => {
    for (let i = 1; i <= MAX_LEVEL_HEADING; i++) {
      const wikiText = '='.repeat(i) + ' ' + `Heading ${i}` + '='.repeat(i); // `=== Heading 3===`
      const markdownText = '#'.repeat(i) + ' ' + `Heading ${i}`; // `### Heading 3`
      expect(converter.toMarkdown(wikiText)).toBe(markdownText);
    }
  });

  it('should change heading (with one space after heading text)', () => {
    for (let i = 1; i <= MAX_LEVEL_HEADING; i++) {
      const wikiText = '='.repeat(i) + `Heading ${i}` + ' ' + '='.repeat(i); // `===Heading 3 ===`
      const markdownText = '#'.repeat(i) + ' ' + `Heading ${i}`; // `### Heading 3`
      expect(converter.toMarkdown(wikiText)).toBe(markdownText);
    }
  });

  it('should change heading (many spaces after markup)', () => {
    for (let i = 1; i <= MAX_LEVEL_HEADING; i++) {
      const wikiText = '='.repeat(i) + `Heading ${i}` + '='.repeat(i) + '       '; // `===Heading 3===       `
      const markdownText = '#'.repeat(i) + ' ' + `Heading ${i}`; // ### Heading 3
      expect(converter.toMarkdown(wikiText)).toBe(markdownText);
    }
  });

  it('should not change heading (symbol after markup)', () => {
    for (let i = 1; i <= MAX_LEVEL_HEADING; i++) {
      const wikiText = '='.repeat(i) + `Heading ${i}` + '='.repeat(i) + 'symbol'; // `===Heading 3===symbol`
      const markdownText = wikiText; // `===Heading 3===symbol`
      expect(converter.toMarkdown(wikiText)).toBe(markdownText);
    }
  });

  it('should not change heading (symbol before markup)', () => {
    for (let i = 1; i <= MAX_LEVEL_HEADING; i++) {
      const wikiText = 'symbol' + '='.repeat(i) + `Heading ${i}` + '='.repeat(i); // `symbol===Heading 3===`
      const markdownText = wikiText; // `symbol===Heading 3===`
      expect(converter.toMarkdown(wikiText)).toBe(markdownText);
    }
  });
});

describe('Tests on heading markup (markdown to wiki)', () => {
  const converter = new Converter();

  it('should change heading', () => {
    for (let i = 1; i <= MAX_LEVEL_HEADING; i++) {
      const markdownText = '#'.repeat(i) + ' ' + `Heading ${i}`; // `### Heading 3`
      const wikiText = '='.repeat(i) + `Heading ${i}` + '='.repeat(i); // `===Heading 3===`
      expect(converter.toWiki(markdownText)).toBe(wikiText);
    }
  });

  it('should change heading (with many words)', () => {
    for (let i = 1; i <= MAX_LEVEL_HEADING; i++) {
      const markdownText = '#'.repeat(i) + ' ' + `Heading with many words ${i}`; // `### Heading with many words 3`
      const wikiText = '='.repeat(i) + `Heading with many words ${i}` + '='.repeat(i); // `===Heading with many words 3===`
      expect(converter.toWiki(markdownText)).toBe(wikiText);
    }
  });

  it('should not change heading (no space after markup)', () => {
    for (let i = 1; i <= MAX_LEVEL_HEADING; i++) {
      const markdownText = '#'.repeat(i) + `Heading ${i}`; // `###Heading`
      const wikiText = markdownText; // `###Heading`
      expect(converter.toWiki(markdownText)).toBe(wikiText);
    }
  });

  it('should not change heading (symbol before markup)', () => {
    for (let i = 1; i <= MAX_LEVEL_HEADING; i++) {
      const markdownText = 'symbol' + '#'.repeat(i) + ` Heading ${i}`; // `symbol### Heading`
      const wikiText = markdownText; // `symbol### Heading`
      expect(converter.toWiki(markdownText)).toBe(wikiText);
    }
  });
});
