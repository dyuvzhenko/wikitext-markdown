const { wikitextToMarkdown, markdownToWikitext } = require('../src');

const wikiText = `
=Heading=

Some <i>italic</i> and <b>bold</b> words.
And link: [url text].

<blockquote>Text in blockquote</blockquote>

Ordered list:
# first num
# second num
# third num

unordered list:
* first point
* second point
* third point
`;
const markdownText = `
# Heading

Some _italic_ and **bold** words.
And link: [text](url).

> Text in blockquote

Ordered list:
1. first num
1. second num
1. third num

unordered list:
- first point
- second point
- third point
`;

describe('Common tests', () => {
  it('should correctly translate two texts (markdown to wiki)', () => {
    expect(wikitextToMarkdown(wikiText)).toBe(markdownText);
  });

  it('should correctly translate two texts (wiki to markdown)', () => {
    expect(markdownToWikitext(markdownText)).toBe(wikiText);
  });
});
